"""
Author: Arvind Iyer
Email: ayalurarvind@gmail.com
Desc: Database model file
Version: 0.0.1
"""
import pandas as pd
import json

#development
#path="/Users/arvindiyer/PycharmProjects/select_portal/backend/server/api/model/"
#production
path="/backend/server/api/model/"

data = pd.read_csv(sep=',',
filepath_or_buffer=path+'mergerd_data.csv',low_memory=False
)

alteration_data = pd.read_csv(sep="\t",
filepath_or_buffer=path+'pan_can_v32.tsv',
low_memory=False)

alteration_cancer = pd.read_csv(sep="\t",
filepath_or_buffer=path+'pan_can_tumor_cancer.tsv',
low_memory=False)


tumor_motif = pd.read_csv(sep="\t",
filepath_or_buffer=path+'ed_tumor_associations.tsv',
low_memory=False,index_col=0)

alteration_screening = pd.read_csv(sep="\t",
filepath_or_buffer=path+'pan_can_tumor_screening.tsv',
low_memory=False)

with open(path+'pan_can_gene.json') as f:
    map_data = json.load(f)
