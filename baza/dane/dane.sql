INSERT INTO `User` (username, password) VALUES
('janedoe', 'password123'),
('johnsmith', 'securepass'),
('alicejones', 'testpassword'),
('bobross', 'pass123'),
('emilybrown', 'abc123'),
('laurasmith', 'pass456'),
('williamjones', 'abcxyz'),
('sophiawilliams', 'userpass'),
('davidbrown', 'david123'),
('emilytaylor', 'emilypass'),
('oliverbrown', 'pass789'),
('charlottelee', 'password456'),
('ethanjackson', 'ethanpass'),
('ameliaadams', 'pass1234'),
('danielrobinson', 'danielpass'),
('hannahwilson', 'passHannah'),
('dylanmartin', 'dylanPass'),
('zoeyrogers', 'zoey123'),
('nathanperez', 'passNathan'),
('avaedwards', 'avaPass123');

INSERT INTO Employee (user_id) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20);

INSERT INTO Address (street, apartment_number, city, postal_code) VALUES
('123 Main St', 'Apt 101', 'New York', '10001'),
('456 Oak Ave', 'Apt 202', 'Los Angeles', '90001'),
('789 Elm St', 'Apt 303', 'Chicago', '60001'),
('012 Pine Ave', 'Apt 404', 'Houston', '77001'),
('345 Maple St', 'Apt 505', 'Miami', '33101'),
('567 Cedar St', 'Apt 606', 'London', 'W1A1AA'),
('890 Pine St', 'Apt 707', 'Paris', '75001'),
('123 Oak St', 'Apt 808', 'Berlin', '10115'),
('456 Elm St', 'Apt 909', 'Rome', '00184'),
('789 Maple St', 'Apt 1010', 'Madrid', '28001'),
('123 Cedar St', 'Apt 111', 'London', 'W1A2BB'),
('456 Pine St', 'Apt 222', 'Paris', '75002'),
('789 Oak St', 'Apt 333', 'Berlin', '10116'),
('012 Elm St', 'Apt 444', 'Rome', '00185'),
('345 Maple St', 'Apt 555', 'Madrid', '28002'),
('567 Cedar St', 'Apt 666', 'Madrid', '28003'),
('890 Pine St', 'Apt 777', 'Rome', '00186'),
('123 Oak St', 'Apt 888', 'Berlin', '10117'),
('456 Elm St', 'Apt 999', 'Paris', '75003'),
('789 Maple St', 'Apt 10101', 'London', 'W1A3BB');

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Eva', NULL, 'Brown', 'F', '23456769012', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1),
( 'Michael', 'Lucas', 'Johnson', 'M', '34567890123', '1982-07-10', 'London', NULL, NULL, NULL, 'George', 'Emily', 'Davis', 1),
( 'Olivia', NULL, 'Garcia', 'F', '45678901234', '1995-02-20', 'Paris', NULL, NULL, NULL, 'Daniel', 'Isabella', 'Gomez', 2),
( 'Liam', 'Robert', 'Martinez', 'M', '56789012345', '1998-09-05', 'Berlin', NULL, NULL, NULL, 'William', 'Sophia', 'Hernandez', 5),
( 'Sophie', 'Anne', 'Wilson', 'F', '67890123456', '1993-11-12', 'Sydney', NULL, NULL, NULL, 'David', 'Olivia', 'Taylor', 1),
( 'James', 'Michael', 'Anderson', 'M', '78901234567', '1980-08-25', 'Toronto', NULL, NULL, NULL, 'Thomas', 'Sophia', 'Clark', 2),
( 'Ava', NULL, 'Miller', 'F', '89012345678', '1987-04-30', 'Melbourne', NULL, NULL, NULL, 'Ethan', 'Emma', 'Moore', 3),
( 'Noah', 'William', 'Thompson', 'M', '90123456789', '1996-06-17', 'Vancouver', NULL, NULL, NULL, 'Liam', 'Isabella', 'King', 9),
( 'Isabella', NULL, 'Turner', 'F', '51235676902', '2000-01-05', 'Auckland', NULL, NULL, NULL, 'Mason', 'Grace', 'Baker', 9),
( 'Daniel', 'Robert', 'Clark', 'M', '32345678901', '1988-03-25', 'Boston', NULL, NULL, NULL, 'Robert', 'Sophia', 'Johnson', 8),
( 'Emma', NULL, 'Harris', 'F', '13456789012', '1994-12-12', 'Sydney', NULL, NULL, NULL, 'William', 'Olivia', 'Taylor', 2),
( 'Liam', 'James', 'Young', 'M', '14567891230', '1980-09-30', 'Toronto', NULL, NULL, NULL, 'Michael', 'Sophie', 'Anderson', 3),
( 'Mia', NULL, 'Wright', 'F', '15678901234', '1997-05-18', 'Paris', NULL, NULL, NULL, 'David', 'Emily', 'Roberts', 4),
( 'Lucas', 'William', 'Lee', 'M', '16789012345', '2002-07-05', 'Berlin', NULL, NULL, NULL, 'John', 'Emma', 'Scott', 5),
( 'Sophia', 'Grace', 'Hall', 'F', '17890123456', '1989-07-18', 'Berlin', NULL, NULL, NULL, 'Jacob', 'Ava', 'King', 1),
( 'Oliver', 'Henry', 'Scott', 'M', '18901234567', '1975-04-05', 'Paris', NULL, NULL, NULL, 'Noah', 'Sophie', 'Young', 2),
( 'Charlotte', NULL, 'Baker', 'F', '19012345678', '1983-11-28', 'London', NULL, NULL, NULL, 'Ethan', 'Emily', 'Wright', 3),
( 'Ethan', 'Thomas', 'Cook', 'M', '10123456789', '1990-09-10', 'New York', NULL, NULL, NULL, 'Michael', 'Grace', 'Harris', 4),
( 'Adam', 'John', 'Smith', 'M', '12345678901', '1990-05-15', 'Warsaw', '123BC', NULL, NULL, 'Michael', 'Anna', 'Johnson', 3);

INSERT INTO `Application Type` (type, type_name) VALUES
(1, 'Type A'),
(2, 'Type B'),
(3, 'Type C'),
(4, 'Type D'),
(5, 'Type E'),
(6, 'Type F'),
(7, 'Type G'),
(8, 'Type H');


INSERT INTO Applicant (email_address, phone_number, person_id) VALUES
('eva@example.com', 987654321, 2),
('michael@example.com', 555555555, 3),
('olivia@example.com', 111111111, 4),
('liam@example.com', 999999999, 5),
('sophie@example.com', 555123456, 6),
('james@example.com', 987654333, 7),
('ava@example.com', 111222333, 8),
('noah@example.com', 444555666, 9),
('isabella@example.com', 777888999, 10),
('daniel@example.com', 555123456, 11),
('emma@example.com', 987654333, 12),
('liam@example.com', 111222333, 13),
('mia@example.com', 444555666, 14),
('lucas@example.com', 777888999, 15),
('sophia@example.com', 555666777, 16),
('oliver@example.com', 888999000, 17),
('charlotte@example.com', 111222333, 18);



INSERT INTO Application (status, date_of_submission, date_of_verification, note, application_type_id, applicant_id, employee_id) VALUES
('In Review', '2023-04-10', NULL, 'in Review', 1, 1,  NULL);


INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'cwel', NULL, 'Brown', 'F', '31416232219', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1);

INSERT INTO Applicant (email_address, phone_number, person_id, user_id) VALUES
('eveDd@example.com', 987654321, 32, NULL);

INSERT INTO Application ( application_type_id, applicant_id, employee_id) VALUES
(  2, 30,  NULL);