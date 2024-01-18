from pydantic import BaseModel, Field
from typing import Annotated


class UserLoginSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "username": "janedoe",
                "password": "password123"
            }
        }


class AddressSchema(BaseModel):
    street: str = Field(...)
    apartment_number: str = Field(...)
    city: str = Field(...)
    postal_code: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "street": "Mikolaja reja",
                "apartment_number": "69/1d",
                "city": "Wroclaw",
                "postal_code": "53-530"
            }
        }


class PersonSchema(BaseModel):
    first_name: str = Field(...)
    second_name: str = Field(...)
    last_name: str = Field(...)
    gender: str = Field(...)
    pesel: str = Field(...)
    date_of_birth: str = Field(...)
    place_of_birth: str = Field(...)
    birth_certificate: str = Field(...)
    death_certificate: str = Field(...)
    civil_status_certificate: str = Field(...)
    father_name: str = Field(...)
    mother_name: str = Field(...)
    mother_maiden_name: str = Field(...)
    address_id: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "first_name": "Jan",
                "second_name": "Kazimierz",
                "last_name": "Kowalski",
                "gender": "M",
                "pesel": "12345678901",
                "date_of_birth": "1999-01-01",
                "place_of_birth": "Wroclaw",
                "birth_certificate": "12345678901",
                "death_certificate": "12345678901",
                "civil_status_certificate": "12345678901",
                "father_name": "Jan",
                "mother_name": "Anna",
                "mother_maiden_name": "Kowalska",
                "address_id": 1
            }
        }


class ApplicantSchema(BaseModel):
    email_address: str = Field(...)
    phone_number: str = Field(...)
    person_id: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "email_address": "essatron@essa.pl",
                "phone_number": "123456789",
                "person_id": 1
            }
        }


class ApplicationSchema(BaseModel):
    application_type_id: int = Field(...)
    applicant_id: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "application_type_id": 1,
                "applicant_id": 1,
            }
        }


class FullApplicationSchema(BaseModel):
    street: str = Field(...)
    apartment_number: str = Field(...)
    city: str = Field(...)
    postal_code: str = Field(...)
    first_name: str = Field(...)
    second_name: str | None = Field(None)
    last_name: str = Field(...)
    gender: str = Field(...)
    pesel: str | None = Field(None)
    date_of_birth: str | None = Field(None)
    place_of_birth: str | None = Field(None)
    birth_certificate: str | None = Field(None)
    death_certificate: str | None = Field(None)
    civil_status_certificate: str | None = Field(None)
    father_name: str | None = Field(None)
    mother_name: str | None = Field(None)
    mother_maiden_name: str | None = Field(None)
    email_address: str = Field(...)
    phone_number: str = Field(...)
    application_type_id: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "street": "Mikolaja reja",
                "apartment_number": "69/1d",
                "city": "Wroclaw",
                "postal_code": "53-530",
                "first_name": "Jan",
                "second_name": "Kazimierz",
                "last_name": "Kowalski",
                "gender": "M",
                "pesel": "12345678901",
                "date_of_birth": "1999-01-01",
                "place_of_birth": "Wroclaw",
                "birth_certificate": "12345678901",
                "death_certificate": "12345678901",
                "civil_status_certificate": "12345678901",
                "father_name": "Jan",
                "mother_name": "Anna",
                "mother_maiden_name": "Kowalska",
                "email_address": "essatron@essa.pl",
                "phone_number": "123456789",
                "application_type_id": 1
            }
        }


class ApplicationVerificationSchema(BaseModel):
    application_id: int = Field(...)
    note: str = Field(...)
    status: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "application_id": 1,
                "note": "note",
                "status": "approved"
            }
        }
