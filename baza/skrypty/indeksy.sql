-- SQLBook: Code
CREATE INDEX idx_pesel ON Person (PESEL);
CREATE INDEX idx_last_name_first_name ON Person (last_name, first_name);
CREATE INDEX idx_applicant_id ON Application (applicant_id);
CREATE INDEX idx_application_type_id ON Application (application_type_id);
CREATE INDEX idx_date_of_submission_desc ON Application (date_of_submission DESC);