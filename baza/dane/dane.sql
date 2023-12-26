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
('Main St', 'Apt 101', 'New York', '10-001');

INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'Eva', NULL, 'Brown', 'F', '23456769012', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1);

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
('eva@example.com', 987654321, 1);



INSERT INTO Application (application_type_id, applicant_id, employee_id) VALUES
(1, 1,  NULL);


INSERT INTO Person (first_name, second_name, last_name, gender, PESEL, date_of_birth, place_of_birth, birth_certificate, death_certificate, civil_status_certificate, father_name, mother_name, mother_maiden_name, address_id) VALUES
( 'cwel', NULL, 'Brown', 'F', '31416232219', '1985-12-28', 'New York', NULL, NULL, NULL, 'Peter', 'Sophie', 'Miller', 1);

INSERT INTO Applicant (email_address, phone_number, person_id, user_id) VALUES
('eveDd@example.com', 987654321, 32, NULL);

INSERT INTO Application ( application_type_id, applicant_id, employee_id) VALUES
(  2, 30,  NULL);