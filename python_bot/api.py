"""
FastAPI Microservice for Universal Autonomous Shortlink Auto-Bypass
Supports Single Bypass, Batch Bypass, Health Checks & Autonomous Zero-Day Diagnostics.
"""

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from bypass_engine import UniversalBypassEngine
import uvicorn
import time

app = FastAPI(
    title="Universal Autonomous Shortlink Auto-Bypass API",
    description="Cracks 1,337+ Shorteners + Autonomously Resolves ANY Unknown Zero-Day Shortlinks",
    version="2.0.0"
)

engine = UniversalBypassEngine()
start_time = time.time()

class BypassRequest(BaseModel):
    url: str

class BatchBypassRequest(BaseModel):
    urls: List[str]

@app.get("/")
def home():
    return {
        "status": "online",
        "engine": "Universal Autonomous AI Heuristic Engine",
        "supported_domains": "1,337+ Catalog + ANY Unknown / Zero-Day Domain",
        "uptime_seconds": round(time.time() - start_time, 1),
        "endpoints": {
            "GET /bypass": "Query single link (?url=...)",
            "POST /api/bypass": "JSON body single bypass",
            "POST /api/bypass/batch": "JSON body batch bypass",
            "GET /docs": "Interactive Swagger UI documentation"
        }
    }

@app.get("/bypass")
def get_bypass(url: str = Query(..., description="Shortlink URL to bypass")):
    res = engine.bypass(url)
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res)
    return res

@app.post("/api/bypass")
def post_bypass(req: BypassRequest):
    res = engine.bypass(req.url)
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res)
    return res

@app.post("/api/bypass/batch")
def post_batch_bypass(req: BatchBypassRequest):
    results = []
    for u in req.urls:
        if u.strip():
            results.append(engine.bypass(u.strip()))
    return {
        "total": len(results),
        "successful": len([r for r in results if r.get("success")]),
        "failed": len([r for r in results if not r.get("success")]),
        "results": results
    }

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
