

from fastapi import FastAPI

app = FastAPI(title = "qSOFA Sepsis Screening Backend")

@app.get("/")
def home():
    return {"message":"qSOFA Screening Backend  Running"}
