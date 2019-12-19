"""
Author: Arvind Iyer
Email: ayalurarvind@gmail.com
Desc: Main app file
Version: 0.0.1
"""
# Import the packages
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from api.model.model import data
from api.controller.controller import get_gene_alteration_data, get_gene_network_data, get_gene_alteration_dataset,get_gene_alteration_screening_dataset,get_tumor_alteration_data
import json

app = FastAPI(
    title="Select Portal API",
    description="Select Portal contains information events linked by Evolutionary Conditions across Human Tumors",
    version="0.0.1",
    docs_url="/doc",
    redoc_url=None,
)
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8080/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
),

@app.get("/", tags=["API"],
         description="Description of API")
def read_root():
    return {"API": "SELECT-API",
            "Version":"0.0.1",
            "Author": "Arvind Iyer",
            "Email": "ayalurarvind@gmail.com"}


@app.get("/gene", tags=["Gene"], description="Description of endpoint related to genes")
def all_gene_info():
    """
    Returns list of gene in the database.
    """
    result = json.loads(str(data.to_json(orient='records')))
    return result

@app.get("/gene/{gene}", tags=["Gene"],
         description="Description of endpoint related to genes")
def get_gene_info(gene):
    """
    Returns basic details of specific gene
    """
    return json.loads(str(data.loc[data['gene'] == gene].to_json(orient="records")))


@app.get("/tumor/{tumor}", tags=["Tumor"],
         description="Description of endpoint related to genes")
def get_tumor(tumor):
    """
    Returns basic details of specific gene
    """
    df = get_tumor_alteration_data(tumor)
    result = json.loads(str(df.to_json(orient='records')))
    return result

@app.get("/alteration/{gene}", tags=["Alteration"],
         description="Description of endpoint related to alterations")
def get_alteration_info(gene):
    """
    Returns list of alteration in the database for the given gene.
    """
    df = get_gene_alteration_data(gene)
    result = json.loads(str(df.to_json(orient='records')))
    return result



@app.get("/alteration/motif/{motif}", tags=["Alteration"],
         description="Returns all the select result data")
def get_motif(motif):
    """
    Returns the information of motif
    """
    #print(motif)
    t4 = get_gene_alteration_dataset(motif)
    #data = {'pca_v3': json.loads(str(t1.to_json(orient='records')))[0], 'pc24_v5': json.loads(str(t2.to_json(orient='records')))[0], 'pc32_no_msi_v8': json.loads(str(t3.to_json(orient='records')))[0], 'pc32_v8':json.loads(str(t4.to_json(orient='records')))[0]}
    #data = {'pc32_v8':json.loads(str(t4.to_json(orient='records')))[0]}
    
    return json.loads(str(t4.to_json(orient='records')))

@app.get("/alteration/screening/{motif}", tags=["Alteration"],
         description="Returns all the select result data")
def get_motif_screening(motif):
    """
    Returns the screening information of motif
    """
    t = get_gene_alteration_screening_dataset(motif)
    return json.loads(str(t.to_json(orient='records')))


@app.get("/network/{gene}", tags=["Alteration"],
         description="Description of endpoint related to alterations")
def get_network(gene):
    """
    Returns the network as form nodes and edges for the network creation
    """
    nodes, edges = get_gene_network_data(gene)
    data = {'nodes': nodes, 'edges': edges}
    return data

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True,log_level="info")
