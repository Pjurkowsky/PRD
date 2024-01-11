import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function ApplicationVerification() {
  const params = useParams();
  const [application, setApplication] = useState({});
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
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
        });
    })();
  }, []);

  const statuses = [
    { value: "approved", label: "Zaakceptowany" },
    { value: "rejected", label: "Odrzucony" },
    { value: "pending", label: "Oczekujący" },
  ];

  console.log(application);

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-disabled"
          disabled
          label="Imię"
          value={application.applicant_first_name || ""}
        />
        <TextField
          id="outlined-required"
          label="Drugie Imię"
          value={application.applicant_second_name || ""}
        />
        <TextField
          id="outlined-required"
          label="Nazwisko"
          value={application.applicant_last_name || ""}
        />
      </Box>
    </div>
  );
}

export default ApplicationVerification;
