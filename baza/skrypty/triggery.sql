-- SQLBook: Code
CREATE TRIGGER assign_employee_before_insert_application
BEFORE INSERT ON Application
FOR EACH ROW
BEGIN
    DECLARE available_employee_id INT;
    DECLARE applicant_pesel CHAR(11);
    DECLARE random_password VARCHAR(255);

    -- Find the employee with the least number of applications
    SELECT e.id INTO available_employee_id
    FROM Employee e
    LEFT JOIN (SELECT employee_id, COUNT(*) AS application_count
               FROM Application
               GROUP BY employee_id) AS app_count ON e.id = app_count.employee_id
    ORDER BY app_count.application_count ASC, RAND()
    LIMIT 1;

    -- Check if the selected employee is not the applicant of the current application
    IF NEW.applicant_id = available_employee_id THEN
        SELECT e.id INTO available_employee_id
        FROM Employee e
        WHERE e.id <> NEW.applicant_id
        ORDER BY RAND()
        LIMIT 1;
    END IF;

    -- Assign the employee to the application
    SET NEW.employee_id = available_employee_id;

    -- Check if this is the first application for the applicant
    SELECT COUNT(*) INTO @existing_applications
    FROM Application
    WHERE applicant_id = NEW.applicant_id;

    IF @existing_applications = 0 THEN
        -- Generate random password
        SELECT SUBSTRING(MD5(RAND()), 1, 10) INTO random_password;

        -- Get applicant's PESEL
        SELECT p.PESEL INTO applicant_pesel
        FROM Applicant
        JOIN Person p ON Applicant.person_id = p.id
        WHERE Applicant.id = NEW.applicant_id;

        -- Create new User record
        INSERT INTO `User` (username, password, applicant_id)
        VALUES (applicant_pesel, random_password, NEW.applicant_id);

    END IF;
END;

CREATE TRIGGER after_application_update
AFTER UPDATE ON Application
FOR EACH ROW
BEGIN
    DECLARE application_type INT;
    DECLARE person_id_for_resident INT;
    DECLARE user_id_for_resident INT;
    
    SELECT type INTO application_type FROM `Application Type` WHERE id = NEW.application_type_id;

    -- Check if the status is changed to 'approved' and the application type is 1
    IF OLD.status <> 'approved' AND NEW.status = 'approved' AND application_type = 1 THEN

        -- Retrieve person_id from the Applicant table linked to the application
        SELECT Applicant.person_id INTO person_id_for_resident
        FROM Applicant
        WHERE Applicant.id = NEW.applicant_id;

        -- Retrive user_id from the User table linked to the applicant
        SELECT id INTO user_id_for_resident
        FROM `User`
        WHERE applicant_id = NEW.applicant_id;

        -- Insert a new record into the Resident table
        INSERT INTO Resident (person_id, user_id)
        VALUES (person_id_for_resident, user_id_for_resident);
    END IF;
END;

CREATE TRIGGER before_insert_person
BEFORE INSERT ON Person
FOR EACH ROW
BEGIN
    IF NEW.PESEL IS NOT NULL THEN
        CALL ValidatePesel(NEW.PESEL);
    END IF;

    CALL ValidateTextData(NEW.first_name, "first_name");

    IF NEW.second_name IS NOT NULL THEN
        CALL ValidateTextData(NEW.second_name, "second_name");
    END IF;

    CALL ValidateTextData(NEW.last_name, "last_name");

    IF NEW.place_of_birth IS NOT NULL THEN
        CALL ValidateTextData(NEW.place_of_birth, "place_of_birth");
    END IF;

    IF NEW.father_name IS NOT NULL THEN
        CALL ValidateTextData(NEW.father_name, "father_name");
    END IF;

    IF NEW.mother_name IS NOT NULL THEN
        CALL ValidateTextData(NEW.mother_name, "mother_name");
    END IF;

    IF NEW.mother_maiden_name IS NOT NULL THEN
        CALL ValidateTextData(NEW.mother_maiden_name, "mother_maiden_name");
    END IF;
END;

CREATE TRIGGER before_insert_applicant
BEFORE INSERT ON Applicant
FOR EACH ROW
BEGIN
    -- Validate email address
    CALL ValidateEmail(NEW.email_address);

    -- Validate phone number
    CALL ValidatePhone(NEW.phone_number);
END;


CREATE TRIGGER before_insert_address
BEFORE INSERT ON Address
FOR EACH ROW
BEGIN
    -- Validate postal code
    CALL ValidatePostalCode(NEW.postal_code);
    CALL ValidateTextData(NEW.street, "street");
    CALL ValidateTextData(NEW.city, "city");
END;
