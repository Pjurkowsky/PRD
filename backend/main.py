from typing import Union

from fastapi import FastAPI

from database import connect

app = FastAPI()
conn = connect()
cursor = conn.cursor()


@app.get("/")
def read_root():
    query = "SELECT * FROM Application"
    cursor.execute(query)
    result = cursor.fetchall()
    return {"result": result}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
