# DAG Forge (Node-Weaver) Technical Architecture Guide

Welcome! This guide breaks down the architecture, technical decisions, and underlying logic of DAG Forge. I built this application to allow users to visually design and mathematically validate Directed Acyclic Graph (DAG) pipelines in a clean, production-ready environment. 

Here is a deep dive into how the frontend, backend, and infrastructure work together.

---

## 1. System Architecture & Tech Stack

The application follows a decoupled client-server architecture, allowing the frontend to handle complex UI state while delegating heavy mathematical validation to a containerized backend.

### **Frontend (Client)**
* **Core Framework:** React.js
* **Canvas Engine:** React Flow (for node-based drag-and-drop interactions)
* **State Management:** Zustand (lightweight, unopinionated global state)
* **Styling:** Tailwind CSS (implemented with strict Light/Dark mode design tokens)
* **Hosting:** Vercel (CI/CD connected directly to GitHub)

### **Backend (API)**
* **Core Framework:** FastAPI (Python)
* **Graph Mathematics:** NetworkX
* **Server:** Uvicorn
* **Containerization:** Docker
* **Hosting:** Render

---

## 2. Frontend Engineering

The frontend is designed to feel like a premium, Neo-SaaS developer tool. Beyond just looking good, it required careful state management and component structuring to keep the canvas highly performant.

### **State Management with Zustand**
Managing graph state (nodes and edges) inside React can get messy if relying solely on context or local state. I used Zustand to create a centralized store (`store.js`). 
* The store tracks the coordinates, data payloads, and connection lines of every node. 
* I engineered custom actions like `removeNode`, which not only deletes a targeted node from the array but simultaneously scrubs the `edges` array to remove any orphaned connections, preventing ghost data from being sent to the backend.

### **Component Architecture & React Portals**
To maintain a clean codebase, the UI is broken down into specific node components (`InputNode`, `LLMNode`, etc.), all wrapped by a foundational `BaseNode` component. This ensures unified styling (like the glassmorphic headers and custom connection handles) across the entire app.

One technical highlight is the implementation of **React Portals** for the analysis result modal. Because the main header utilizes CSS `backdrop-filter` (glassmorphism), it creates a new CSS stacking context. To prevent the modal from getting trapped inside the header's bounding box, I used `createPortal` to mount the modal directly to the `document.body`, ensuring it perfectly centers over the entire viewport regardless of where the trigger button lives in the DOM tree.

---

## 3. Backend Engineering & Graph Validation

The backend is a lean, high-performance microservice designed to do one thing exceptionally well: validate graph mathematics.

### **The Validation Endpoint (`main.py`)**
The core of the backend is the `POST /pipelines/parse` endpoint. When a user clicks "Analyze", the frontend sends the current array of nodes and edges as a JSON payload.

The backend parses this payload and reconstructs the visual graph as a mathematical model using the `NetworkX` library:
1. It initializes a `networkx.DiGraph()` (Directed Graph).
2. It calculates the total number of nodes and edges.
3. It runs the `nx.is_directed_acyclic_graph()` algorithm. This strictly evaluates the pathways to ensure data flows in a single direction. If a user accidentally routes an output back into a previous step (creating an infinite loop), this function catches the cycle and flags the graph as invalid.

### **Containerization**
To ensure the Python environment remains perfectly consistent between local development and production, the backend is containerized using Docker.
* It uses a lightweight Python 3.12 slim image.
* The `Dockerfile` handles the installation of `fastapi`, `uvicorn`, and `networkx`.
* It exposes port 8000 and spins up the Uvicorn ASGI server on boot.

---

## 4. Cloud Infrastructure & Security

### **Deployment Pipeline**
* **Frontend:** Deployed to Vercel. Vercel automatically compiles the static React assets and distributes them globally across its CDN edge network.
* **Backend:** The Docker container is hosted on Render, operating as an independent web service.

### **CORS & Environment Variables**
Because the frontend (Vercel) and backend (Render) live on entirely different domains, the browser will natively block communication between them due to Cross-Origin Resource Sharing (CORS) policies.

To securely bridge this:
1. **Dynamic Frontend Routing:** The React app utilizes a `.env` variable (`REACT_APP_API_URL`) to dynamically route API calls. Locally, it points to `localhost:8000`, but in production on Vercel, it injects the live Render URL during the build step.
2. **Strict Backend Authorization:** Inside the FastAPI configuration, I implemented the `CORSMiddleware`. By setting the backend's `ALLOWED_ORIGINS` environment variable strictly to the Vercel production domain, the server safely intercepts and approves the `OPTIONS` preflight requests, locking out unauthorized API access while allowing the web app to function flawlessly.