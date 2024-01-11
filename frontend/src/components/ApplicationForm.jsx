import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';



function ApplicationForm() {
    const [first_name, setFirstName] = useState("");
    const [second_name, setSecondName] = useState("");
    const [last_name, setLastName] = useState("");
    const [pesel, setPesel] = useState("");
    const [gender, setGender] = useState('');
    const [date_of_birth, setDateOfBirth] = useState("");
    const [place_of_birth, setPlaceOfBirth] = useState("");
    const [birth_certificate_number, setBirthCertificateNumber] = useState("");
    const [civil_status_certificate_number, setCivilStatusCertificateNumber] = useState("");
    const [death_certificate_number, setDeathCertificateNumber] = useState("");
    const [father_name, setFatherName] = useState("");
    const [mother_name, setMotherName] = useState("");
    const [mother_maiden_name, setMotherMaidenName] = useState("");
    const [street, setStreet] = useState("");
    const [apartment_number, setApartmentNumber] = useState("");
    const [city, setCity] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [application_type, setApplicationType] = useState("");

    {/*do zmienienia*/}
    const isLoggedIn = true;

    

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePostalCodeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length >= 3) {
        value = value.substring(0, 2) + '-' + value.substring(2, 5);
    }
    value = value.substring(0, 6);
    setPostalCode(value);
};

  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <div className="font-bold text-5xl mb-10 text-center">
          Formularz składania wniosku
        </div>
        <div className="col-span-2 flex justify-center">
            <div className="font-bold text-3xl mb-10 text-center">
            Typ wniosku
            <TextField
                select
                label="Typ wniosku"
                value={application_type}
                onChange={(e) => setApplicationType(e.target.value)}
                sx={{ minWidth: 200, marginLeft:3 }}
                >
                    <MenuItem value="wpis_do_rejestru">Wpis do rejestru</MenuItem>
                    <MenuItem value="wpis_dziecka_do_rejestru">Wpis dziecka do rejestru</MenuItem>
                    <MenuItem value="wyrobienie_pesel">Wyrobienie numeru PESEL</MenuItem>
                    <MenuItem value="zmiana_pesel">Zmiana numeru PESEL</MenuItem>
                    <MenuItem value="zmiana_zameldowania">Zmiana miejsca zameldowania</MenuItem>
                    <MenuItem value="zmiana_imienia_nazwiska">Zmiana imienia i nazwiska</MenuItem>
                    <MenuItem value="zmiana_plci">Zmiana płci</MenuItem>
                    <MenuItem value="zmiana_stanu_cywilnego">Zmiana stanu cywilnego</MenuItem>
                    <MenuItem value="wypis_z_rejestru">Wypis z rejestru mieszkańców</MenuItem>
                    <MenuItem value="info_o_smierci">Informacja o śmierci bliskiej osoby</MenuItem>

            </TextField>
            </div>  
        </div>
        
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my:2, mx:1, width: "25ch" },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
        <div className='grid grid-cols-3'>
            <TextField
                required
                id="first_name"
                label="Imię"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                required
                id="second_name"
                label="Drugie Imię"
                onChange={(e) => setSecondName(e.target.value)}
            />
            <TextField
                required
                id="last_name"
                label="Nazwisko"
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
            <TextField
                required
                id="pesel"
                label="PESEL"
                onChange={(e) => setPesel(e.target.value)}
            /> 
            <div className="col-span-2 flex justify-center">
            <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <FormControlLabel value="Mezczyzna" control={<Radio />} label="Mężczyzna" />
                <FormControlLabel value="Kobieta" control={<Radio />} label="Kobieta" />
                </RadioGroup>
        </div>
        <div className="col-span-2 flex justify-center">
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
                onChange={(e) => setPlaceOfBirth(e.target.value)}
            /></div>
        <div className="grid grid-cols-3 col-span-3 flex justify-center">
            <TextField
                id="birth_certificate_number"
                label="Numer aktu urodzenia"
                onChange={(e) => setBirthCertificateNumber(e.target.value)}
            />
            <TextField
                id="civil_status_certificate_number"
                label="Numer aktu stanu cywilnego"
                onChange={(e) => setCivilStatusCertificateNumber(e.target.value)}
            />
            <TextField
                id="death_certificate_number"
                label="Numer aktu zgonu"
                onChange={(e) => setDeathCertificateNumber(e.target.value)}
            />
            <TextField
                id="father_name"
                label="Imię ojca"
                onChange={(e) => setFatherName(e.target.value)}
            />
            <TextField
                id="mother_name"
                label="Imię matki"
                onChange={(e) => setMotherName(e.target.value)}
            />
            <TextField
                id="mother_maiden_name"
                label="Nazwisko panieńskie matki"
                onChange={(e) => setMotherMaidenName(e.target.value)}
            />
        </div>
        <div className="grid grid-cols-2 col-span-2 flex justify-center">
            <TextField
                id="street"
                label="Ulica"
                onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
                id="apartment_number"
                label="Numer domu"
                onChange={(e) => setApartmentNumber(e.target.value)}
            />
            <TextField
                id="city"
                label="Miasto"
                onChange={(e) => setCity(e.target.value)}
            />
            <TextField
                id="postal_code"
                label="Kod pocztowy"
                value={postal_code}
                onChange={handlePostalCodeChange}
                placeholder="xx-xxx"
            />
        </div>
        <div className="flex justify-center">
            <Button variant="contained" color="success" size="large" sx={{ minWidth: 150, padding: '10px 20px' }}>
                Złóż Wniosek
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default ApplicationForm;
