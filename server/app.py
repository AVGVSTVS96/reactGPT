import os
from typing import List, Optional
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from openai.error import OpenAIError
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")


class Message(BaseModel):
    role: str
    content: str


class Gpt4Request(BaseModel):
    messages: List[Message]
    model_type: str


async def generate(messages: List[Message], model_type: str):
    try:
        response = await openai.ChatCompletion.acreate(
            model=model_type,
            messages=[message.dict() for message in messages],
            stream=True
        )

        async for chunk in response:
            content = chunk['choices'][0]['delta'].get('content', '')
            if content:
                yield content

    except OpenAIError as e:
        yield f"{type(e).__name__}: {str(e)}"


@app.post("/gpt4")
async def gpt4(request: Gpt4Request):
    assistant_response = generate(request.messages, request.model_type)
    return StreamingResponse(assistant_response, media_type='text/event-stream')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
