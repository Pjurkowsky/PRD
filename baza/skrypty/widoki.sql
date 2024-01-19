-- SQLBook: Code
CREATE VIEW ApplicationEmployeeInfo AS
SELECT 
    a.id AS ApplicationID,
    a.status AS ApplicationStatus,
    a.date_of_submission AS SubmissionDate,
    a.date_of_verification AS VerificationDate,
    a.note AS ApplicationNote,
    e.id AS EmployeeID,
    u.username AS EmployeeUsername,
    p.first_name AS EmployeeFirstName,
    p.last_name AS EmployeeLastName
FROM Application a
JOIN Employee e ON a.employee_id = e.id
JOIN `User` u ON e.user_id = u.id
JOIN Person p ON u.applicant_id = p.id;


CREATE VIEW UserApplicationInfo AS
SELECT 
    u.id AS UserID,
    u.username AS Username,
    a.id AS ApplicationID,
    a.status AS ApplicationStatus,
    a.date_of_submission AS SubmissionDate,
    a.date_of_verification AS VerificationDate,
    a.note AS ApplicationNote,
    at.type_name AS ApplicationTypeName
FROM `User` u
JOIN Applicant app ON u.applicant_id = app.id
JOIN Application a ON app.id = a.applicant_id
JOIN `Application Type` at ON a.application_type_id = at.id;

CREATE VIEW ApplicationTypeSummary AS
SELECT 
    at.type_name,
    COUNT(a.id) AS NumberOfApplications
FROM `Application Type` at
JOIN Application a ON at.id = a.application_type_id
GROUP BY at.type_name;

CREATE VIEW ResidentContactInfo AS
SELECT 
    r.id AS id,
    p.first_name,
    p.last_name,
    p.PESEL,
    a.street,
    a.apartment_number,
    a.city,
    a.postal_code,
    app.email_address,
    app.phone_number
FROM Resident r
JOIN Person p ON r.person_id = p.id
JOIN Address a ON p.address_id = a.id
JOIN Applicant app ON p.id = app.person_id;

CREATE VIEW UserRoleAccess AS
SELECT 
    u.id AS UserID,
    u.username,
    CASE
        WHEN e.id IS NOT NULL THEN 'Employee'
        WHEN app.id IS NOT NULL THEN 'Applicant'
        WHEN r.id IS NOT NULL THEN 'Resident'
        ELSE 'Unknown'
    END AS UserRole
FROM `User` u
LEFT JOIN Employee e ON u.id = e.user_id
LEFT JOIN Applicant app ON u.applicant_id = app.id
LEFT JOIN Resident r ON u.id = r.user_id;

CREATE VIEW EmployeeTaskAssignment AS
SELECT 
    e.id AS EmployeeID,
    p.first_name AS EmployeeFirstName,
    p.last_name AS EmployeeLastName,
    a.id AS AssignedApplicationID,
    a.status AS ApplicationStatus
FROM Employee e
JOIN Application a ON e.id = a.employee_id
JOIN `User` u ON e.user_id = u.id
JOIN Person p ON u.applicant_id = p.id;

CREATE VIEW EmployeeApplicationCount AS
SELECT
    E.id AS employee_id,
    U.username AS employee_username,
    COUNT(A.id) AS application_count
FROM
    Employee E
JOIN
    `User` U ON E.user_id = U.id
LEFT JOIN
    Application A ON E.id = A.employee_id
GROUP BY
    E.id, U.username;

CREATE VIEW FullApplicationInfo AS
SELECT
    a.id AS application_id,
    a.status AS application_status,
    a.date_of_submission AS submission_date,
    a.date_of_verification AS verification_date,
    a.note AS application_note,
    at.type_name AS application_type_name,
    p.first_name AS applicant_first_name,
    p.second_name AS applicant_second_name,
    p.last_name AS applicant_last_name,
    p.gender AS applicant_gender,
    p.PESEL AS applicant_PESEL,
    p.birth_certificate AS applicant_birth_certificate,
    p.civil_status_certificate AS applicant_civil_status_certificate,
    p.death_certificate AS applicant_death_certificate,
    p.date_of_birth AS applicant_birth_date,
    p.place_of_birth AS applicant_birth_place,
    p.father_name AS applicant_father_name,
    p.mother_name AS applicant_mother_name,
    p.mother_maiden_name AS applicant_mother_maiden_name,
    addr.street AS applicant_street,
    addr.apartment_number AS applicant_apartment_number,
    addr.city AS applicant_city,
    addr.postal_code AS applicant_postal_code,
    app.email_address AS applicant_email_address,
    app.phone_number AS applicant_phone_number
FROM
    Application a
JOIN `Application Type` at ON a.application_type_id = at.id
JOIN Applicant app ON a.applicant_id = app.id
JOIN Person p ON app.person_id = p.id
JOIN `Address` addr ON p.address_id = addr.id;

