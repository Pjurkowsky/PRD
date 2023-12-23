from datetime import datetime, timedelta
import random


streets = ["Maple Street", "Oak Avenue", "Pine Lane", "Cedar Drive", "Elm Road",
           "Birch Court", "Willow Way", "Cherry Boulevard", "Aspen Circle", "Holly Terrace"]
apartment_numbers = ["101", "202", "303", "404",
                     "505", "606", "707", "808", "909", "1001"]
cities = ["Springfield", "Rivertown", "Lakeside", "Hillcrest", "Sunnyvale",
          "Meadowbrook", "Fairview", "Woodland", "Brookfield", "Clearwater"]
postal_codes = ["12-345", "23-456", "34-567", "45-678",
                "56-789", "67-890", "78-901", "89-012", "90-123", "01-234"]

num_records = 1000

records = []
for _ in range(num_records):
    record = (
        _ + 1,
        random.choice(streets),
        random.choice(apartment_numbers),
        random.choice(cities),
        random.choice(postal_codes)
    )
    records.append(record)


file_path = './dupa/AddressRecords.sql'
with open(file_path, 'w') as file:
    line = f"id,street,apartment_number,city,postal_code \n"
    file.write(line)
    for record in records:
        line = f"{record[0]},{record[1]},{record[2]},{record[3]},{record[4]}\n"
        file.write(line)


print("File saved:", file_path)


email_domains = ["example.com", "mail.com",
                 "inbox.com", "service.com", "internet.com"]


records = []
for i in range(1, num_records + 1):

    email_address = f"user{i}@{random.choice(email_domains)}"

    phone_number = random.randint(100000000, 999999999)

    person_id = i

    record = (i, email_address, phone_number, person_id)
    records.append(record)

print(records)

file_path = './dupa/ApplicantRecords.sql'
with open(file_path, 'w') as file:
    line = "id,email_address,phone_number,person_id\n"
    file.write(line)
    for record in records:
        line = f"{record[0]},{record[1]},{record[2]},{record[3]}\n"
        file.write(line)


print("File saved:", file_path)


records = []
for i in range(1, num_records + 1):
    application_type_id = random.randint(
        1, 10)
    applicant_id = i

    record = (application_type_id, applicant_id, "NULL")
    records.append(record)


file_path = './dupa/ApplicationRecords.sql'
with open(file_path, 'w') as file:
    line = "application_type_id,applicant_id,employee_id\n"
    file.write(line)
    for record in records:
        line = f"{record[0]},{record[1]},{record[2]}\n"
        file.write(line)

print("File saved:", file_path)


first_names = ["Alice", "Bob", "Carol", "David",
               "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"]
second_names = ["Ann", "Lee", "Marie", "Joe",
                "Lynn", "Max", "Beth", "Ray", "Elle", "Dean"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones",
              "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
genders = ["M", "F"]
places_of_birth = ["Springfield", "Rivertown", "Lakeside", "Hillcrest",
                   "Sunnyvale", "Meadowbrook", "Fairview", "Woodland", "Brookfield", "Clearwater"]
father_names = ["James", "John", "Robert", "Michael",
                "William", "David", "Richard", "Joseph", "Thomas", "Charles"]
mother_names = ["Mary", "Patricia", "Jennifer", "Linda",
                "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"]

unique_pesels = set()


def generate_unique_pesel(num_digits=11):
    while True:
        pesel = str(random.randint(10**(num_digits - 1), 10**num_digits - 1))
        if pesel not in unique_pesels:
            unique_pesels.add(pesel)
            return pesel


unique_certificates = set()


def generate_unique_certificate(prefix):
    while True:
        certificate_number = f"{prefix}#{random.randint(10000, 99999)}"
        if certificate_number not in unique_certificates:
            unique_certificates.add(certificate_number)
            return certificate_number


def random_date_of_birth(start_year=1950, end_year=2000):
    start_date = datetime(year=start_year, month=1, day=1)
    end_date = datetime(year=end_year, month=12, day=31)
    time_between_dates = end_date - start_date
    random_number_of_days = random.randrange(time_between_dates.days)
    return start_date + timedelta(days=random_number_of_days)


records = []
for i in range(num_records):
    record = (
        i + 1,
        random.choice(first_names),
        random.choice(second_names),
        random.choice(last_names),
        random.choice(genders),
        generate_unique_pesel(),
        random_date_of_birth().strftime('%Y-%m-%d'),
        random.choice(places_of_birth),
        generate_unique_certificate("BirthCert"),
        generate_unique_certificate("DeathCert"),
        generate_unique_certificate("CivilCert"),
        random.choice(father_names),
        random.choice(mother_names),
        random.choice(last_names),
        i + 1
    )
    records.append(record)


print(record)
file_path = './dupa/PersonRecords.sql'
with open(file_path, 'w') as file:
    line = "id,first_name,second_name,last_name,gender,PESEL,date_of_birth,place_of_birth,birth_certificate,death_certificate,civil_status_certificate,father_name,mother_name,mother_maiden_name,address_id\n"
    file.write(line)
    for record in records:
        line = f"{record[0]},{record[1]},{record[2]},{record[3]},{record[4]},{record[5]},{record[6]},{record[7]},{record[8]},{record[9]},{record[10]},{record[11]},{record[12]},{record[13]},{record[14]}\n"
        file.write(line)

print("File saved:", file_path)
