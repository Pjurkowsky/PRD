
import time
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status

from database import connect

from auth import sign_jwt, JWTBearer, decode_jwt
from model import *
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api")


while True:  # temporary for tests
    try:
        conn = connect()
        time.sleep(1)
        if conn.is_connected():
            print("Connected to MySQL database")
            break
        else:
            print("Connection failed")
    except Exception as e:
        print(e)
cursor = conn.cursor(dictionary=True)


def get_current_user(current_user: str = Depends(JWTBearer())):
    payload = decode_jwt(current_user)
    return payload


@router.get("/applications", dependencies=[Depends(JWTBearer())])
async def get_applications():
    query = "SELECT * FROM Application"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.get("/application/{id}", dependencies=[Depends(JWTBearer())])
async def get_application(id: int):
    query = "SELECT * FROM FullApplicationInfo WHERE application_id=%s"
    cursor.execute(query, (id,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Application not found")
    return result


@router.get("/employee_applications", dependencies=[Depends(JWTBearer())])
async def get_employee_applications(current_user: str = Depends(get_current_user)):
    query = """
    SELECT A.*
    FROM Application A
    JOIN Employee E ON A.employee_id = E.id
    JOIN User U ON E.user_id = U.id
    WHERE U.username=%s
    """
    cursor.execute(query, (current_user,))
    result = cursor.fetchall()

    if not result:
        return []

    # Fetch application types separately
    query = "SELECT * FROM `Application Type`"
    cursor.execute(query)
    application_types = {
        app_type["id"]: app_type for app_type in cursor.fetchall()}

    # Add application_type to each application in the result
    for application in result:
        application_type_id = application["application_type_id"]
        if application_type_id in application_types:
            application["application_type"] = application_types[application_type_id]

    return result


@router.get("/user_applications", dependencies=[Depends(JWTBearer())])
async def get_user_applications(current_user: str = Depends(get_current_user)):
    query = """
    SELECT A.*
    FROM Application A
    JOIN Applicant AP ON A.applicant_id = AP.id
    JOIN Person P ON AP.person_id = P.id
    WHERE P.pesel=%s
    """
    cursor.execute(query, (current_user,))
    result = cursor.fetchall()

    if not result:
        return []

    # Fetch application types separately
    query = "SELECT * FROM `Application Type`"
    cursor.execute(query)
    application_types = {
        app_type["id"]: app_type for app_type in cursor.fetchall()}

    # Add application_type to each application in the result
    for application in result:
        application_type_id = application["application_type_id"]
        if application_type_id in application_types:
            application["application_type"] = application_types[application_type_id]

    return result


@router.get("/user", dependencies=[Depends(JWTBearer())])
async def get_user(current_user: str = Depends(get_current_user)):
    query = "SELECT * FROM User WHERE username=%s"
    cursor.execute(query, (current_user,))
    result = cursor.fetchone()
    return result


@router.get("/is_employee", dependencies=[Depends(JWTBearer())])
async def get_is_employee(current_user: str = Depends(get_current_user)):
    query = """
        SELECT E.*
        FROM User U
        LEFT JOIN Employee E ON U.id = E.user_id
        WHERE U.username = %s
    """
    cursor.execute(query, (current_user,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Employee not found")

    return result


@router.get("/application_types")
async def get_application_types():
    query = "SELECT * FROM `Application Type`"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.get("/residents", dependencies=[Depends(JWTBearer())])
async def get_residents():
    query = "SELECT * FROM ResidentContactInfo"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.get("/applcation_types_summery", dependencies=[Depends(JWTBearer())])
async def get_application_types_summery():
    query = "SELECT * FROM `ApplicationTypeSummary`"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.get("/application_employee_info", dependencies=[Depends(JWTBearer())])
async def get_application_employee_info():
    query = "SELECT * FROM `EmployeeApplicationCount`"
    cursor.execute(query)
    result = cursor.fetchall()
    return result


@router.post("/address")
async def post_address(address: AddressSchema):
    query = "INSERT INTO Address (street, apartment_number, city, postal_code) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (address.street, address.apartment_number,
                   address.city, address.postal_code))
    conn.commit()

    item_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Address WHERE id = %s", (item_id,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Address not found after insertion")
    return result


@router.post("/person")
async def post_person(person: PersonSchema):
    query = "INSERT INTO Person (first_name, second_name, last_name, gender, pesel, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s)"
    cursor.execute(query, (person.first_name, person.second_name, person.last_name, person.gender, person.pesel, person.date_of_birth, person.place_of_birth,
                   person.birth_certificate, person.death_certificate, person.civil_status_certificate, person.father_name, person.mother_name, person.mother_maiden_name, person.address_id))
    conn.commit()

    item_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Person WHERE id = %s", (item_id,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Person not found after insertion")
    return result


@router.post("/applicant")
async def post_applicant(applicant: ApplicantSchema):
    query = "INSERT INTO Applicant (email_address,phone_number,person_id) VALUES (%s,%s, %s)"
    cursor.execute(query, (applicant.email_address,
                   applicant.phone_number, applicant.person_id))
    conn.commit()

    item_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Applicant WHERE id = %s", (item_id,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Applicant not found after insertion")
    return result


@router.post("/full_application")
async def post_full_application(full_application: FullApplicationSchema):

    query = "INSERT INTO Address (street, apartment_number, city, postal_code) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (full_application.street, full_application.apartment_number,
                           full_application.city, full_application.postal_code))
    conn.commit()

    address_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Address WHERE id = %s", (address_id,))
    address = cursor.fetchone()

    if address is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Address not found after insertion")

    query = "INSERT INTO Person (first_name, second_name, last_name, gender, pesel, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s)"
    cursor.execute(query, (full_application.first_name, full_application.second_name, full_application.last_name, full_application.gender, full_application.pesel, full_application.date_of_birth, full_application.place_of_birth,
                           full_application.birth_certificate, full_application.death_certificate, full_application.civil_status_certificate, full_application.father_name, full_application.mother_name, full_application.mother_maiden_name, address_id))
    conn.commit()

    person_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Person WHERE id = %s", (person_id,))

    person = cursor.fetchone()

    if person is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Person not found after insertion")

    query = "INSERT INTO Applicant (email_address,phone_number,person_id) VALUES (%s, %s, %s)"
    cursor.execute(query, (full_application.email_address,
                           full_application.phone_number, person_id))
    conn.commit()

    applicant_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Applicant WHERE id = %s",
                   (applicant_id,))

    applicant = cursor.fetchone()

    if applicant is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Applicant not found after insertion")

    query = "INSERT INTO Application (application_type_id, applicant_id) VALUES (%s, %s)"

    cursor.execute(
        query, (full_application.application_type_id, applicant_id))

    conn.commit()

    application_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Application WHERE id = %s",
                   (application_id,))

    application = cursor.fetchone()

    if application is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Application not found after insertion")

    # get user
    query = "SELECT * FROM User WHERE applicant_id=%s"
    cursor.execute(query, (applicant_id,))
    user = cursor.fetchone()

    result = {
        "address": address,
        "person": person,
        "applicant": applicant,
        "application": application,
        "user": user
    }
    return result


@router.post("/application_verification", dependencies=[Depends(JWTBearer())])
async def post_application_verification(application_to_verify: ApplicationVerificationSchema, current_user: str = Depends(get_current_user)):
    query = "SELECT * FROM User WHERE username=%s"
    cursor.execute(query, (current_user,))
    user = cursor.fetchone()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User not found")

    query = "SELECT * FROM Employee WHERE user_id=%s"
    cursor.execute(query, (user["id"],))
    employee = cursor.fetchone()

    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Employee not found")

    # check if employee is authorized to verify application
    query = "SELECT * FROM Application WHERE id=%s AND employee_id=%s"
    cursor.execute(
        query, (application_to_verify.application_id, employee["id"]))
    application = cursor.fetchone()

    if application is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Application not found")

    # verify application
    query = "UPDATE Application SET status=%s, note=%s WHERE id=%s"
    cursor.execute(query, (application_to_verify.status, application_to_verify.note,
                   application_to_verify.application_id))
    conn.commit()

    query = "SELECT * FROM Application WHERE id=%s"
    cursor.execute(query, (application_to_verify.application_id,))
    application = cursor.fetchone()

    return application


@router.post("/application")
async def post_application(application: ApplicationSchema):
    query = "INSERT INTO Application (application_type_id, applicant_id) VALUES (%s, %s)"
    cursor.execute(query, (application.application_type_id,
                   application.applicant_id))
    conn.commit()

    item_id = cursor.lastrowid

    cursor.execute("SELECT * FROM Application WHERE id = %s", (item_id,))
    result = cursor.fetchone()

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Application not found after insertion")

    return result


@router.post("/login")
async def login(user: UserLoginSchema):
    query = "SELECT * FROM User WHERE username=%s AND password=%s"
    cursor.execute(query, (user.username, user.password))
    result = cursor.fetchone()
    if result is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid username or password")

    return sign_jwt(user.username)


app.include_router(router)
