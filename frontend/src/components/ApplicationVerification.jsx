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

function ApplicationVerification() {
  const params = useParams();
  const [application, setApplication] = useState({});
  const [employee, setEmployee] = useState({});
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

  const setTextFields = () => {
    first_name.current.value = application.first_name;
    second_name.current.value = application.second_name;
    last_name.current.value = application.last_name;
    pesel.current.value = application.pesel;

    father_name.current.value = application.father_name;
    mother_name.current.value = application.mother_name;
    mother_maiden_name.current.value = application.mother_maiden_name;

    birth_certificate_number.current.value =
      application.birth_certificate_number;
    civil_status_certificate_number.current.value =
      application.civil_status_certificate_number;

    email_address.current.value = application.email_address;
    phone_number.current.value = application.phone_number;

    city.current.value = application.city;
    street.current.value = application.street;
    postal_code.current.value = application.postal_code;
    apartment_number.current.value = application.apartment_number;

    date_of_birth.current.value = application.date_of_birth;
    place_of_birth.current.value = application.place_of_birth;
  };

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
          pesel.current.value = data.applicant_pesel;

          father_name.current.value = data.father_name;
          mother_name.current.value = data.mother_name;
          mother_maiden_name.current.value = data.mother_maiden_name;

          birth_certificate_number.current.value =
            data.birth_certificate_number;
          civil_status_certificate_number.current.value =
            data.civil_status_certificate_number;

          email_address.current.value = data.email_address;
          phone_number.current.value = data.phone_number;

          city.current.value = data.city;
          street.current.value = data.street;
          postal_code.current.value = data.postal_code;
          apartment_number.current.value = data.apartment_number;

          // setTextFields();
        });
    })();
  }, []);

  return (
    <div>
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
              variant="filled"
            />
            <TextField id="second_name" label="Drugie Imię" ref={second_name} />
            <TextField id="last_name" label="Nazwisko" ref={last_name} />
            <TextField id="pesel" label="PESEL" ref={pesel} />
            <div className="flex ml-3 ">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                required
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Mężczyzna"
                />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Kobieta"
                />
              </RadioGroup>
            </div>
            <TextField
              id="date_of_birth"
              label="Data urodzenia"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField id="place_of_birth" label="Miejsce urodzenia" />
            <TextField id="phone_number" required label="Numer telefonu" />
            <TextField id="city" required label="Miasto" />
            <TextField id="street" required label="Ulica" />
          </div>

          <div className="flex flex-col">
            <TextField id="father_name" label="Imię ojca" />
            <TextField id="mother_name" label="Imię matki" />
            <TextField
              id="mother_maiden_name"
              label="Nazwisko panieńskie matki"
            />
            <div className="flex flex-col mt-32">
              <TextField
                id="birth_certificate_number"
                label="Numer aktu urodzenia"
              />
              <TextField
                id="civil_status_certificate_number"
                label="Numer aktu stanu cywilnego"
              />
            </div>

            <TextField id="email_address" required label="Adres email" />
            <TextField
              id="postal_code"
              required
              label="Kod pocztowy"
              placeholder="xx-xxx"
            />
            <TextField id="apartment_number" required label="Numer domu" />
          </div>
        </div>
        <div className="flex flex-col mt-10 mb-10 w-full justify-end">
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              sx={{
                minWidth: 150,
                padding: "10px 20px",
                borderRadius: 10,
              }}
            >
              xD
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ApplicationVerification;
