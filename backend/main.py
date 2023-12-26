from typing import Union

from fastapi import FastAPI, APIRouter, Depends, HTTPException, status

from database import connect

app = FastAPI()

router = APIRouter(prefix="/api")

conn = connect()
cursor = conn.cursor(dictionary=True)


@router.get("/applications")
def get_applications():
    query = "SELECT * FROM Application"
    cursor.execute(query)
    result = cursor.fetchall()
    return {"result": result}


app.include_router(router)
