import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [user, setUser] = useState({});
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("token"))?.access_token
          }`,
        },
      });

      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user-applications-table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Data złożenia</TableCell>
              <TableCell align="right">Notatka</TableCell>
              <TableCell align="right">Data weryfikacji</TableCell>
              <TableCell align="right">Rodzaj wniosku</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.date_of_submission}</TableCell>
                <TableCell align="right">{row.note}</TableCell>
                <TableCell align="right">{row.date_of_verification}</TableCell>
                <TableCell align="right">
                  {row.application_type.type_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ position: 'absolute', left: '50%', bottom: '10px', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="success" size="large">
              <Link to={"/application"}>Złóż nowy wniosek</Link>
            </Button>
      </div>
    </div>
  );
}

export default UserDashboard;
