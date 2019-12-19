"""
Author: Arvind Iyer
Email: ayalurarvind@gmail.com
Desc: Controller containing functions to fetch data
Version: 0.0.1
"""

from api.model.model import alteration_data, tumor_motif , data, map_data, alteration_cancer,alteration_screening
import numpy as np

gene_alteration_map = map_data


def get_gene_alteration_data(gene):
    
    """
    Function to get the alteration data for a searched gene
    :param gene:
    :return: a pandas data-frame with the alteration data.

    """
    sfe_list = []
    for key, value in gene_alteration_map.items():
        for item in value:
            if item == gene:
                if key in sfe_list:
                    pass
                else:
                    sfe_list.append(key)
            else:
                pass
    t1 = alteration_data[(alteration_data['SFE_1'].isin(sfe_list)) | alteration_data['SFE_2'].isin(sfe_list)]
    t2 = t1.join(tumor_motif)
    df = t2.replace(np.nan, 'NA', regex=True)
    df = df[df['significance'].isin(['significant_permissive','significant_robust'])]
    df['motif']=df.index.values.tolist()
    df = df[['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p.value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']]
    df.columns = ['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p_value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']
    df.n[df.n=='NA']=0
    return df

def get_tumor_alteration_data(tumor):
    
    """
    Function to get the alteration data for a searched gene
    :param gene:
    :return: a pandas data-frame with the alteration data.
    """
    tumor_df = tumor_motif[tumor_motif['tumors'].str.contains(tumor)]
    df = alteration_data.loc[tumor_df.index.values.tolist()]
    df = df[['SFE_1', 'SFE_2', 'support_1', 'support_2', 'overlap', 'max_overlap',
       'freq_overlap', 'int_type', 'r_overlap', 'r_freq_overlap', 'wMI_stat',
       'E.r.wMI_stat', 'ME_p.value', 'wMI_p.value', 'APC', 'direction',
       'gene_1', 'gene_2', 'dMI', 'ME_good', 'wMI_good', 'APC_good',
       'significant', 'significance']]
    print(len(df.columns))
    print(df.columns)
    df.columns = ['SFE_1', 'SFE_2', 'support_1', 'support_2', 'overlap', 'max_overlap',
       'freq_overlap', 'int_type', 'r_overlap', 'r_freq_overlap', 'wMI_stat',
       'E_r_wMI_stat', 'ME_p_value', 'wMI_p_value', 'APC', 'direction',
       'gene_1', 'gene_2', 'dMI', 'ME_good', 'wMI_good', 'APC_good',
       'significant', 'significance']
    return df    


def get_gene_alteration_dataset(motif):
    """
    Function to get the alteration data for all dataset from motif
    :param gene:
    :return: a json object
    """
    alteration_data['motif']=alteration_data.index.values.tolist()
    t1 = alteration_data[(alteration_data['motif']==motif)]
    t2 = t1.join(tumor_motif)
    df = t2.replace(np.nan, 'NA', regex=True)
    df = df[df['significance'].isin(['significant_permissive','significant_robust'])]
    df = df[['SFE_1', 'SFE_2', 'support_1', 'support_2', 'overlap', 'max_overlap',
       'freq_overlap', 'int_type', 'r_overlap', 'r_freq_overlap', 'wMI_stat',
       'E.r.wMI_stat', 'ME_p.value', 'wMI_p.value', 'APC', 'direction',
       'gene_1', 'gene_2', 'dMI', 'ME_good', 'wMI_good', 'APC_good',
       'significant', 'significance', 'motif', 'tumors', 'n']]
    df.columns = ['SFE_1', 'SFE_2', 'support_1', 'support_2', 'overlap', 'max_overlap',
       'freq_overlap', 'int_type', 'r_overlap', 'r_freq_overlap', 'wMI_stat',
       'E_r_wMI_stat', 'ME_p_value', 'wMI_p_value', 'APC', 'direction',
       'gene_1', 'gene_2', 'dMI', 'ME_good', 'wMI_good', 'APC_good',
       'significant', 'significance', 'motif', 'tumors', 'n']
    motif_df = df.loc[motif,]
    motif_df = motif_df.replace(np.nan, 'NA', regex=True)
    cancer = motif_df.tumors.split(",")
    df.n[df.n=='NA']=0
    if 'NA' in cancer:
        df['cancer'] ='NA'
        return df
    else:
        alteration_cancer['motif']=alteration_cancer['SFE_1'].map(str) + " - " + alteration_cancer['SFE_2'].map(str)       
        tdf = alteration_cancer[alteration_cancer['cancer'].isin(cancer)]
        t2 = tdf[(tdf['motif']==motif)]
        t = t2.append(t1)
        t.columns = ['APC', 'APC_good', 'E_r_wMI_stat', 'ME_good', 'ME_p_value', 'SFE_1',
       'SFE_2', 'cancer', 'dMI', 'direction', 'freq_overlap', 'gene_1',
       'gene_2', 'int_type', 'max_overlap', 'motif', 'overlap',
       'r_freq_overlap', 'r_overlap', 'significance', 'significant',
       'support_1', 'support_2', 'wMI_good', 'wMI_p_value', 'wMI_p_value_fdr',
       'wMI_stat']
        return t.replace(np.nan, 'NA', regex=True)

def get_gene_alteration_screening_dataset(motif):
    """
    Function to get the alteration data for all dataset from motif
    :param gene:
    :return: a json object
    """
    alteration_screening['actual_motif'] = alteration_screening['SFE_1'].map(str) + " - " + alteration_screening['SFE_2'].map(str)
    t = alteration_screening[(alteration_screening['actual_motif']==motif)]
    return t

def get_gene_network_data(gene):
    sfe_list=[]
    for key, value in gene_alteration_map.items():
        for item in value:
            if item == gene:
                if key in sfe_list:
                    pass
                else:
                    sfe_list.append(key)
            else:
                pass
    t1 = alteration_data[(alteration_data['SFE_1'].isin(sfe_list)) | alteration_data['SFE_2'].isin(sfe_list)]
    t2 = t1.join(tumor_motif)
    df = t2.replace(np.nan, 'NA', regex=True)
    df = df[df['significance'].isin(['significant_permissive','significant_robust'])]
    df['motif']=df.index.values.tolist()
    df = df[['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p.value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']]
    df.columns = ['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p_value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']
    df.n[df.n=='NA']=0    
    talteration_data = df
    filter_data = talteration_data[(talteration_data['SFE_1'].isin(sfe_list)) | talteration_data['SFE_2'].isin(sfe_list)]
    new_sfe_list=[]
    new_sfe_list_gene={}
    for index,value in filter_data.iterrows():
        if value['SFE_1'] in new_sfe_list:
            pass
        else:
            new_sfe_list.append(value['SFE_1'])
            if gene in value['gene_1'].split(","):
                new_sfe_list_gene[value['SFE_1']]=1
            else:
                new_sfe_list_gene[value['SFE_1']]=0
        if value['SFE_2'] in new_sfe_list:
            pass
        else:
            new_sfe_list.append(value['SFE_2'])
            if gene in value['gene_2'].split(","):
                new_sfe_list_gene[value['SFE_2']]=1
            else:
                new_sfe_list_gene[value['SFE_2']]=0

    t1 = alteration_data[(alteration_data['SFE_1'].isin(new_sfe_list)) | alteration_data['SFE_2'].isin(new_sfe_list)]
    t2 = t1.join(tumor_motif)
    df = t2.replace(np.nan, 'NA', regex=True)
    df = df[df['significance'].isin(['significant_permissive','significant_robust'])]
    df['motif']=df.index.values.tolist()
    df = df[['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p.value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']]
    df.columns = ['SFE_1', 'SFE_2', 'overlap', 'max_overlap',
       'freq_overlap', 'wMI_p_value', 'APC', 'direction',
       'gene_1', 'gene_2','significance', 'motif','tumors', 'n']
    df.n[df.n=='NA']=0    
    talteration_data = df
    new_filter_data = talteration_data[(talteration_data['SFE_1'].isin(new_sfe_list)) | talteration_data['SFE_2'].isin(new_sfe_list)]
    nodes = []
    edges =[]
    counter = 1
    sfe_mapping ={}
    for sfe in new_sfe_list:
        if sfe.split(".")[0] == 'MUT':
            if new_sfe_list_gene[sfe] == 1:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": '#ffe1bd', "border": 'black'}}
            else:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": 'white', "border": 'black'}}
        elif sfe.split(".")[0] == 'AMP':
            if new_sfe_list_gene[sfe] == 1:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": '#ffe1bd', "border": 'red'}}
            else:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": 'white', "border": 'red'}}
        elif sfe.split(".")[0] == 'DEL':
            if new_sfe_list_gene[sfe] == 1:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": '#ffe1bd', "border": 'blue'}}
            else:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": 'white', "border": 'blue'}}
        else:
            if new_sfe_list_gene[sfe] == 1:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": '#ffe1bd', "border": 'grey'}}
            else:
                nodes_data = {'id': counter, 'label': sfe, "shape": 'box', "color": {"background": 'white', "border": 'grey'}}
        if nodes_data in nodes:
            pass
        else:
            nodes.append(nodes_data)
        sfe_mapping[sfe]=counter
        counter += 1

    for index, value in new_filter_data.iterrows():
        try:
            edges_data = {'from': sfe_mapping[value['SFE_1']], 'to': sfe_mapping[value['SFE_2']]}

            if value['direction'] == 'CO':
                edges_data['color'] = {'color': 'green'}
            elif value['direction'] == 'ME':
                edges_data['color'] = {'color': 'purple'}
            else:
                edges_data['color'] = {'color': 'black'}

            if edges_data in edges:
                pass
            else:
                edges.append(edges_data)
        except:
            pass

    return nodes, edges