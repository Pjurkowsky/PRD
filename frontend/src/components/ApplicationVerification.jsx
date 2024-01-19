import { useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, Grid, filledInputClasses } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";

import { Link } from "react-router-dom";

function ApplicationVerification() {
  const params = useParams();
  const [application, setApplication] = useState({});
  const [employee, setEmployee] = useState({});

  const [note, setNote] = useState("");

  const navigate = useNavigate();

  const first_name = useRef();
  const second_name = useRef();
  const last_name = useRef();
  const pesel = useRef();

  const father_name = useRef();
  const mother_name = useRef();
  const mother_maiden_name = useRef();

  const birth_certificate_number = useRef();
  const civil_status_certificate_number = useRef();

  const email_address = useRef();
  const phone_number = useRef();

  const city = useRef();
  const street = useRef();
  const postal_code = useRef();
  const apartment_number = useRef();

  const date_of_birth = useRef();
  const place_of_birth = useRef();

  async function checkIfEmployee(token) {
    const response = await fetch("http://localhost:8000/api/is_employee/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      const errorData = data;
      throw new Error(errorData.message);
    }
    setEmployee(data);
    return data;
  }

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"))?.access_token;
    (async () => {
      const isEmployee = await checkIfEmployee(token);
      if (!isEmployee) {
        alert("Nie jesteś pracownikiem!");
        navigate("/");
      }
      fetch(`http://localhost:8000/api/application/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setApplication(data);
          console.log(data);
          first_name.current.value = data.applicant_first_name;
          second_name.current.value = data.applicant_second_name;
          last_name.current.value = data.applicant_last_name;
          pesel.current.value = data.applicant_PESEL;

          father_name.current.value = data.applicant_father_name;
          mother_name.current.value = data.applicant_mother_name;
          mother_maiden_name.current.value = data.applicant_mother_maiden_name;

          birth_certificate_number.current.value =
            data.applicant_birth_certificate;
          civil_status_certificate_number.current.value =
            data.applicant_civil_status_certificate;

          email_address.current.value = data.applicant_email_address;
          phone_number.current.value = data.applicant_phone_number;

          city.current.value = data.applicant_city;
          street.current.value = data.applicant_street;
          postal_code.current.value = data.applicant_postal_code;
          apartment_number.current.value = data.applicant_apartment_number;

          date_of_birth.current.value = data.applicant_birth_date;
          place_of_birth.current.value = data.applicant_birth_place;

          setNote(data.application_note);

          // setTextFields();
        });
    })();
  }, []);

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    const token = JSON.parse(sessionStorage.getItem("token"))?.access_token;
    const response = await fetch(
      `http://localhost:8000/api/application_verification/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          credentials: "include",
        },
        body: JSON.stringify({
          status: status ? "approved" : "rejected",
          application_id: params.id,
          note: note,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      const errorData = data;
      throw new Error(errorData.message || "Login failed");
    }
  };

  return (
    <div>
      <div className="font-bold text-5xl p-10 text-center">Dane Petenta</div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { my: 2, mx: 1, width: "40ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex ">
          <div className="flex flex-col">
            <TextField
              id="first_name"
              label="Imię"
              inputRef={first_name}
              disabled
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="second_name"
              label="Drugie Imię"
              inputRef={second_name}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <TextField
              id="last_name"
              label="Nazwisko"
              inputRef={last_name}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <TextField
              id="pesel"
              label="PESEL"
              inputRef={pesel}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <div className="flex ml-3 ">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Mężczyzna"
                  disabled
                />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Kobieta"
                  disabled
                />
              </RadioGroup>
            </div>
            <TextField
              id="date_of_birth"
              label="Data urodzenia"
              disabled
              inputRef={date_of_birth}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="place_of_birth"
              label="Miejsce urodzenia"
              disabled
              inputRef={place_of_birth}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="phone_number"
              required
              label="Numer telefonu"
              inputRef={phone_number}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="city"
              required
              label="Miasto"
              inputRef={city}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="street"
              required
              label="Ulica"
              inputRef={street}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="flex flex-col">
            <TextField
              id="father_name"
              label="Imię ojca"
              disabled
              inputRef={father_name}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="mother_name"
              label="Imię matki"
              disabled
              inputRef={mother_name}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="mother_maiden_name"
              label="Nazwisko panieńskie matki"
              disabled
              inputRef={mother_maiden_name}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="flex flex-col mt-32">
              <TextField
                id="birth_certificate_number"
                label="Numer aktu urodzenia"
                disabled
                inputRef={birth_certificate_number}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="civil_status_certificate_number"
                label="Numer aktu stanu cywilnego"
                disabled
                inputRef={civil_status_certificate_number}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <TextField
              id="email_address"
              label="Adres email"
              disabled
              inputRef={email_address}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="postal_code"
              label="Kod pocztowy"
              disabled
              inputRef={postal_code}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="apartment_number"
              label="Numer domu"
              disabled
              inputRef={apartment_number}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <TextField
          id="standard-multiline-flexible"
          label="Notka"
          multiline
          value={note}
          rows={6}
          disabled={application.application_status !== "in review"}
          variant="standard"
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex flex-row mt-10 mb-10 w-full justify-center gap-5">
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              minWidth: 150,
              padding: "10px 20px",
              borderRadius: 10,
            }}
          >
            <Link to={"/employee"}>Powrót</Link>
          </Button>

          {application.application_status === "in review" && (
            <>
              <Button
                variant="contained"
                color="error"
                size="large"
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                sx={{
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                Odrzuć
              </Button>

              <Button
                variant="contained"
                color="success"
                size="large"
                type="submit"
                onClick={(e) => handleSubmit(e, true)}
                sx={{
                  minWidth: 150,
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                Zatwierdź
              </Button>
            </>
          )}
        </div>
      </Box>
    </div>
  );
}

export default ApplicationVerification;
