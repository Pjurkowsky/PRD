from pydantic import BaseModel, Field


class UserLoginSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "1232141231",
                "password": "weakpassword"
            }
        }
