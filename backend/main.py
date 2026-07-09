from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db, Interaction
from agent import run_agent

app = FastAPI(title="AI-First CRM API")

# CORS middleware for React communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InteractionSchema(BaseModel):
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    attendees: str
    topics_discussed: str
    sentiment: str
    outcomes: str
    follow_up_actions: str

class ChatInput(BaseModel):
    message: str

@app.post("/api/interaction/manual")
def manual_log(data: InteractionSchema, db: Session = Depends(get_db)):
    db_log = Interaction(**data.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return {"status": "success", "message": "Logged via Form successfully!"}

@app.post("/api/interaction/chat")
def chat_log(payload: ChatInput):
    try:
        agent_response = run_agent(payload.message)
        return {"status": "success", "reply": agent_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))