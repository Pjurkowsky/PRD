import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setLoggedIn, setIsEmployee }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function setToken(userToken) {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  }

  async function loginUser(credentials) {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorData = data;
      throw new Error(errorData.message || "Login failed");
    }

    setLoggedIn(true);
    return data;
  }

  async function getUser(token) {
    const response = await fetch("http://localhost:8000/api/user/", {
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
  }

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
    return data;
  }
  const handleSubmit = async (e) => {
    console.log("chuj");
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
    await getUser(token.access_token);

    const isEmployee = await checkIfEmployee(token.access_token);
    console.log(isEmployee);
    if (isEmployee.id != null) {
      setIsEmployee(true);
      navigate("/employee_dashboard");
    } else {
      setIsEmployee(false);
      navigate("/user_dashboard");
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className=" flex flex-col mb-2">
            <TextField
              required
              id="outlined-required"
              label="Login"
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Hasło"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              sx={{ borderRadius: "20px" }}
            >
              Zaloguj
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Login;
