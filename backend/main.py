from collections import defaultdict, deque
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load env variables from the .env file
load_dotenv()

app = FastAPI()

# --------------------------------------------------
# CORS
# --------------------------------------------------

# Fetch origins from .env, default to an empty list if not found for safety
origins_str = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"]
)

# --------------------------------------------------
# Request Models
# --------------------------------------------------

class Pipeline(BaseModel):
    nodes: list
    edges: list


# --------------------------------------------------
# Utility Functions
# --------------------------------------------------

def is_dag(nodes, edges):
    """
    Uses Kahn's Algorithm
    to determine whether graph is a DAG.
    """

    node_ids = {node["id"] for node in nodes}

    graph = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source not in node_ids or target not in node_ids:
            continue

        graph[source].append(target)
        indegree[target] += 1

    queue = deque(
        node_id
        for node_id, degree in indegree.items()
        if degree == 0
    )

    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


# --------------------------------------------------
# Routes
# --------------------------------------------------

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    dag_status = is_dag(
        pipeline.nodes,
        pipeline.edges,
    )

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status,
    }