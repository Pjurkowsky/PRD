import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
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
        >
          <div>
            <TextField required id="outlined-required" label="Login" />
            <TextField
              required
              id="outlined-password-input"
              label="Hasło"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-center">
            <Button variant="contained" color="success" size="large">
              Zaloguj
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Login;
