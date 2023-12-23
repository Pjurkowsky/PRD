-- SQLBook: Code
CREATE ROLE 'administrator_role';
CREATE ROLE 'manager_role';
CREATE ROLE 'employee_role';



GRANT ALL PRIVILEGES ON del.* TO administrator_role;
 
GRANT SELECT, INSERT, UPDATE ON del.Application TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.`Application Type` TO manager_role;

GRANT SELECT ON del.`Application Type` TO employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.`User` TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.Applicant TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.Resident TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.Person TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.Address TO manager_role, employee_role;
  
GRANT SELECT, INSERT, UPDATE, DELETE ON del.Employee TO manager_role;  
