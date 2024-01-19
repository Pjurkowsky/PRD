import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState, useRef } from "react";
import { Checkbox, Grid } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

function ApplicationForm({ loggedIn }) {
  const [application_types, setApplicationTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const [trueDataCheckbox, setTrueDataCheckbox] = useState(false);
  const [trueDataCheckbox2, setTrueDataCheckbox2] = useState(false);

  useEffect(() => {
    // get application types
    fetch("http://localhost:8000/api/application_types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setApplicationTypes(data);
        console.log(data);
      });
  }, []);

  const [application_type_id, setApplicationTypeId] = useState("");
  const [application_type, setApplicationType] = useState("");

  const first_name = useRef();
  const second_name = useRef();
  const last_name = useRef();
  const pesel = useRef();
  const [gender, setGender] = useState();

  const father_name = useRef();
  const mother_name = useRef();
  const mother_maiden_name = useRef();

  const birth_certificate_number = useRef();
  const civil_status_certificate_number = useRef();

  const death_certificate_number = useRef();

  const email_address = useRef();
  const phone_number = useRef();

  const city = useRef();
  const street = useRef();
  const postal_code = useRef();
  const apartment_number = useRef();

  const [date_of_birth, setDateOfBirth] = useState(null);
  const place_of_birth = useRef();

  const [isResponsePositive, setIsResponsePositive] = useState(false);

  const validateInput = (input, regex) => {
    const isValid = regex.test(input.value);
    setErrors((prevErrors) => ({ ...prevErrors, [input.id]: !isValid }));
    return isValid;
  };

  const validateString = (input) => {
    const regex = /^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ]+$/;
    validateInput(input, regex);
  };

  const validateEmptyString = (input) => {
    const regex = /^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ]*$/;
    validateInput(input, regex);
  };

  const validateNumber = (input) => {
    const regex = /^[0-9]+$/;
    validateInput(input, regex);
  };

  const validateEmail = (input) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    validateInput(input, regex);
  };

  const validatePostalCode = (input) => {
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    validateInput(input, regex);
  };

  const validatePhoneNumber = (input) => {
    const regex = /^[0-9]{9}$/;
    validateInput(input, regex);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.values(errors).some((error) => error === true)) return;

    if (!trueDataCheckbox || !trueDataCheckbox2) return;

    fetch("http://localhost:8000/api/full_application", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        first_name: first_name.current.value,
        second_name: second_name.current.value,
        last_name: last_name.current.value,

        father_name: father_name.current.value,
        mother_name: mother_name.current.value,
        mother_maiden_name: mother_maiden_name.current.value,

        birth_certificate_number: birth_certificate_number.current.value,
        civil_status_certificate_number:
          civil_status_certificate_number.current.value,

        email_address: email_address.current.value,
        phone_number: phone_number.current.value,

        city: city.current.value,
        street: street.current.value,
        postal_code: postal_code.current.value,
        apartment_number: apartment_number.current.value,

        date_of_birth: date_of_birth,
        place_of_birth: place_of_birth.current.value,

        application_type_id: application_type_id,

        gender: gender,
        pesel: pesel.current.value,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setIsResponsePositive(true);
        }
      });
  };

  const menuItemsData = [
    { value: "wpis_dziecka_do_rejestru", label: "Wpis dziecka do rejestru" },
    { value: "wyrobienie_pesel", label: "Wyrobienie numeru PESEL" },
    { value: "zmiana_zameldowania", label: "Zmiana miejsca zameldowania" },
    { value: "zmiana_imienia_nazwiska", label: "Zmiana imienia i nazwiska" },
    { value: "zmiana_plci", label: "Zmiana płci" },
    { value: "zmiana_stanu_cywilnego", label: "Zmiana stanu cywilnego" },
    { value: "wypis_z_rejestru", label: "Wypis z rejestru mieszkańców" },
    { value: "info_o_smierci", label: "Informacja o śmierci bliskiej osoby" },
  ];

  const handleApplicationType = (e) => {
    const type = e.target.value;
    setApplicationType(type);
    const application_type_id = application_types.find(
      (application_type) => application_type.type_name === type
    ).id;
    setApplicationTypeId(application_type_id);
  };
  if (!isResponsePositive) {
    return (
      <div className="flex h-full justify-center items-center">
        <div>
          <div className="font-bold text-5xl p-10 text-center">
            Formularz składania wniosku
          </div>
          <div className="flex justify-center">
            <div className="font-bold text-3xl mb-10 text-center">
              <TextField
                select
                label="Typ wniosku"
                value={application_type}
                onChange={(e) => handleApplicationType(e)}
                sx={{ minWidth: 800 }}
              >
                {!loggedIn && (
                  <MenuItem value="wpis_do_rejestru">Wpis do rejestru</MenuItem>
                )}
                {loggedIn &&
                  menuItemsData.map((menuItem) => (
                    <MenuItem key={menuItem.value} value={menuItem.value}>
                      {menuItem.label}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          </div>
          {application_type && (
            <div className="font-bold text-3xl text-center">Dane Petenta</div>
          )}
          {application_type && (
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
              onSubmit={handleSubmit}
            >
              <div className="flex ">
                <div className="flex flex-col">
                  <TextField
                    required
                    error={errors.first_name}
                    id="first_name"
                    label="Imię"
                    inputRef={first_name}
                    onBlur={() => validateString(first_name.current)}
                    helperText={
                      errors.first_name && "Imię może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="second_name"
                    label="Drugie Imię"
                    error={errors.second_name}
                    inputRef={second_name}
                    onBlur={() => validateEmptyString(second_name.current)}
                    helperText={
                      errors.second_name &&
                      "Drugie imię może zawierać tylko litery"
                    }
                  />
                  <TextField
                    required
                    id="last_name"
                    label="Nazwisko"
                    inputRef={last_name}
                    error={errors.last_name}
                    onBlur={() => validateString(last_name.current)}
                    helperText={
                      errors.last_name && "Nazwisko może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="pesel"
                    label="PESEL"
                    inputRef={pesel}
                    error={errors.pesel}
                    onBlur={() => validateNumber(pesel.current)}
                    helperText={
                      errors.pesel && "PESEL może zawierać tylko cyfry"
                    }
                  />
                  <div className="flex ml-3 ">
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="row-radio-buttons-group"
                      required
                      onChange={(e) => setGender(e.target.value)}
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
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="place_of_birth"
                    label="Miejsce urodzenia"
                    inputRef={place_of_birth}
                    error={errors.place_of_birth}
                    onBlur={() => validateEmptyString(place_of_birth.current)}
                    helperText={
                      errors.place_of_birth &&
                      "Miejsce urodzenia może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="phone_number"
                    required
                    label="Numer telefonu"
                    inputRef={phone_number}
                    error={errors.phone_number}
                    onBlur={() => validatePhoneNumber(phone_number.current)}
                    helperText={
                      errors.phone_number &&
                      "Numer telefonu może zawierać tylko cyfry"
                    }
                  />
                  <TextField
                    id="city"
                    required
                    label="Miasto"
                    inputRef={city}
                    error={errors.city}
                    onBlur={() => validateString(city.current)}
                    helperText={
                      errors.city && "Miasto może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="street"
                    required
                    label="Ulica"
                    inputRef={street}
                    error={errors.street}
                    onBlur={() => validateString(street.current)}
                    helperText={
                      errors.street && "Ulica może zawierać tylko litery"
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <TextField
                    id="father_name"
                    label="Imię ojca"
                    inputRef={father_name}
                    error={errors.father_name}
                    onBlur={() => validateEmptyString(father_name.current)}
                    helperText={
                      errors.father_name &&
                      "Imię ojca może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="mother_name"
                    label="Imię matki"
                    inputRef={mother_name}
                    error={errors.mother_name}
                    onBlur={() => validateEmptyString(mother_name.current)}
                    helperText={
                      errors.mother_name &&
                      "Imię matki może zawierać tylko litery"
                    }
                  />
                  <TextField
                    id="mother_maiden_name"
                    label="Nazwisko panieńskie matki"
                    inputRef={mother_maiden_name}
                    error={errors.mother_maiden_name}
                    onBlur={() =>
                      validateEmptyString(mother_maiden_name.current)
                    }
                    helperText={
                      errors.mother_maiden_name &&
                      "Nazwisko panieńskie matki może zawierać tylko litery"
                    }
                  />
                  <div className="flex flex-col mt-32">
                    <TextField
                      id="birth_certificate_number"
                      label="Numer aktu urodzenia"
                      inputRef={birth_certificate_number}
                      error={errors.birth_certificate_number}
                      onBlur={() =>
                        validateNumber(birth_certificate_number.current)
                      }
                      helperText={
                        errors.birth_certificate_number &&
                        "Numer aktu urodzenia może zawierać tylko cyfry"
                      }
                    />
                    <TextField
                      id="civil_status_certificate_number"
                      label="Numer aktu stanu cywilnego"
                      inputRef={civil_status_certificate_number}
                      error={errors.civil_status_certificate_number}
                      onBlur={() =>
                        validateNumber(civil_status_certificate_number.current)
                      }
                      helperText={
                        errors.civil_status_certificate_number &&
                        "Numer aktu stanu cywilnego może zawierać tylko cyfry"
                      }
                    />
                  </div>

                  <TextField
                    id="email_address"
                    required
                    label="Adres email"
                    inputRef={email_address}
                    error={errors.email_address}
                    onBlur={() => validateEmail(email_address.current)}
                    helperText={
                      errors.email_address && "Niepoprawny adres email"
                    }
                  />
                  <TextField
                    id="postal_code"
                    required
                    label="Kod pocztowy"
                    placeholder="xx-xxx"
                    inputRef={postal_code}
                    error={errors.postal_code}
                    onBlur={() => validatePostalCode(postal_code.current)}
                    helperText={
                      errors.postal_code && "Niepoprawny kod pocztowy"
                    }
                  />
                  <TextField
                    id="apartment_number"
                    required
                    label="Numer domu"
                    inputRef={apartment_number}
                    error={errors.apartment_number}
                    onBlur={() => validateNumber(apartment_number.current)}
                    helperText={
                      errors.apartment_number &&
                      "Numer domu może zawierać tylko cyfry"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mt-10 mb-10 w-full justify-end">
                <div className="flex justify-end">
                  <FormGroup>
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      onChange={() => setTrueDataCheckbox(!trueDataCheckbox)}
                      label="Potwierdzam, że podane  przeze mnie dane są
                        prawdziwe."
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      required
                      onChange={() => setTrueDataCheckbox2(!trueDataCheckbox2)}
                      label="Zgadzam się na przetwarzanie danych"
                    />
                  </FormGroup>
                </div>
                <div className="flex justify-end">
                  {" "}
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
                    Prześlij Wniosek
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className=" h-full text-center mt-10">
        <h1 className="text-5xl  font-bold">
          Twój wniosek został pomyślnie złożony
        </h1>
        <h2 className="mt-10">
          Oczekuj na weryfikację przez pracownika urzędu gminy
        </h2>
        {application_type === "wpis_do_rejestru" && (
          <p>
            Informacje o utworzonym koncie zostały przesłane drogą elektroniczną
            na twój email.
          </p>
        )}
      </div>
    );
  }
}

export default ApplicationForm;
