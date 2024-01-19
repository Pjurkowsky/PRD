import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function Residents() {
  const [residentss, setResidents] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetch("http://localhost:8000/api/residents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("token"))?.access_token
          }`,
          credentials: "include",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setResidents(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="w-8/12 m-auto mt-10">
      <div className="font-bold text-2xl text-center">Lista Mieszkańców</div>
      <div className="mt-10">
        {residentss.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={residentss}
              columns={[
                { field: "id", headerName: "ID", flex: 1 },
                { field: "first_name", headerName: "Imię", flex: 1 },
                { field: "last_name", headerName: "Nazwisko", flex: 1 },
                { field: "PESEL", headerName: "PESEL", flex: 1 },
                ,
                { field: "email_address", headerName: "Email", flex: 1 },
                {
                  field: "phone_number",
                  headerName: "Numer telefonu",
                  flex: 1,
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </Box>
        ) : (
          <div className="text-center">Brak wniosków do weryfikacji</div>
        )}
      </div>
    </div>
  );
}

export default Residents;
