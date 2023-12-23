

CREATE PROCEDURE ValidatePesel(IN p_PESEL CHAR(11))
BEGIN
    DECLARE error_message VARCHAR(255);

    -- Walidacja numeru PESEL
    IF LENGTH(p_PESEL) <> 11 OR NOT p_PESEL REGEXP '^[0-9]+$' THEN
        SET error_message = 'PESEL is incorrect';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END ;





CREATE PROCEDURE ValidateEmail(IN p_email_address VARCHAR(255))
BEGIN
    DECLARE error_message VARCHAR(255);

    -- Walidacja adresu e-mail
    IF NOT p_email_address REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        SET error_message = 'Email address is incorrect';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END; 



CREATE PROCEDURE ValidatePhone(IN p_phone_number INT)
 BEGIN
     DECLARE error_message VARCHAR(255);
  
     -- Walidacja numeru telefonu
     IF LENGTH(p_phone_number) <> 9 OR NOT p_phone_number REGEXP '^[0-9]+$' THEN
         SET error_message = 'Phone number is incorrect';
         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
     END IF;
 END ;




CREATE PROCEDURE ValidateTextData(IN p_text_data VARCHAR(255), IN fieldName VARCHAR(255))
BEGIN
    DECLARE error_message VARCHAR(255);
  
    -- Walidacja czy dane tekstowe nie zawierają znaków specjalnych i liczb
    IF p_text_data REGEXP '[^A-Za-z ]' THEN
        SET error_message = CONCAT('Field ', fieldName, ' is incorrect. It should contain only letters.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END;



CREATE PROCEDURE ValidatePostalCode(IN p_postal_code VARCHAR(6))
BEGIN
    DECLARE error_message VARCHAR(255);

    -- Validation for postal code
    IF NOT p_postal_code REGEXP '^[0-9]{2}-[0-9]{3}$' THEN
        SET error_message = 'Postal code is incorrect. It should be in the format xx-xxx where x is a digit.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END;

 CREATE PROCEDURE AddEmployee(IN login VARCHAR(255), IN password VARCHAR(255))
 BEGIN
     DECLARE error_message VARCHAR(255);
  
        -- Dodanie użytkownika
        INSERT INTO `User` (username, password) VALUES (login, password);

        -- Pobranie id dodanego użytkownika
        SET @user_id = LAST_INSERT_ID();

  
     -- Dodanie nowego pracownika
        INSERT INTO Employee (user_id) VALUES (@user_id);
END;
