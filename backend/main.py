
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status

from database import connect

from auth import sign_jwt, JWTBearer
from model import UserLoginSchema

app = FastAPI()

router = APIRouter(prefix="/api")

conn = connect()
cursor = conn.cursor(dictionary=True)


@router.get("/applications", dependencies=[Depends(JWTBearer())])
def get_applications():
    query = "SELECT * FROM Application"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.post("/login")
def login(user: UserLoginSchema):
    query = "SELECT * FROM User WHERE username=%s AND password=%s"
    cursor.execute(query, (user.username, user.password))
    result = cursor.fetchone()
    print(user.password)
    print(result)
    if result is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid username or password")

    return sign_jwt(user.username)


app.include_router(router)
