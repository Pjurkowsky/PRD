INSERT INTO Address (street, apartment_number, city, postal_code) VALUES
('Mikolajkowa', '10', 'Zbąszynek', '10-001');

INSERT INTO Address (street, apartment_number, city, postal_code) VALUES
('Starosciaka', '12', 'Zbąszynek', '10-003');

INSERT INTO Address (street, apartment_number, city, postal_code) VALUES
('Sadowskiego', '3', 'Zbąszynek', '10-000');

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Janina', NULL, 'Brown', 'F', '23456769012', '1985-12-28', 'Zbąszynek', 123, 123, NULL, 'Peter', 'Sophie', 'Miller', 1);

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Kuba', NULL, 'Jakubowski', 'M', '23456769013', '1985-12-25', 'Zbąszynek', 124, 124, NULL, 'Andrzej', 'Agnieszka', 'Adamska', 2);

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Bartek', NULL, 'Sraut', 'M', '23456769014', '2002-12-21', 'Zbąszynek', 125, 125, NULL, 'Maciej', 'Julia', 'Xdekowska', 3);

INSERT INTO Applicant (email_address, phone_number, person_id) VALUES
('janina@example.com', 987654321, 1);

INSERT INTO Applicant (email_address, phone_number, person_id) VALUES
('kuba@example.com', 123456789, 2);

INSERT INTO Applicant (email_address, phone_number, person_id) VALUES
('bartek@example.com', 123456788, 3);

INSERT INTO `User` (username, password) VALUES
('janina', 'password123'),
('johnsmith', 'securepass'),
('alicejones', 'testpassword');

INSERT INTO Employee (user_id) VALUES
(1),
(2),
(3);

INSERT INTO Resident (person_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3);












INSERT INTO Address (street, apartment_number, city, postal_code) VALUES
('Main St', 'Apt 101', 'New York', '10-001');

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Eva', NULL, 'Brown', 'F', '23456769012', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1);


INSERT INTO Application (application_type_id, applicant_id, employee_id) VALUES
(1, 1,  NULL);

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'woloo', NULL, 'Brown', 'F', '31416232219', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1);

INSERT INTO Applicant (email_address, phone_number, person_id, user_id) VALUES
('eveDd@example.com', 987654321, 32, NULL);

INSERT INTO Application ( application_type_id, applicant_id, employee_id) VALUES
(  2, 30,  NULL);