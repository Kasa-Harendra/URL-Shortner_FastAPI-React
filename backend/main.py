from fastapi import FastAPI
from router import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://url-shortner-fast-api-react.vercel.app"
]

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=router)

@app.get('/')
def root():
    return HTMLResponse(
        content="""
        <h1>Welcome to FastAPI application</h1>
        Live app is available at : <a href="https://url-shortner-fast-api-react.vercel.app/">https://url-shortner-fast-api-react.vercel.app/</a>
        """,
        status_code=200
    )

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    index_path = os.path.join("frontend", "dist", "index.html")
    return FileResponse(index_path)