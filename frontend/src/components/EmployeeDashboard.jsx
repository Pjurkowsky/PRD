import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function EmployeeDashboard() {
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [applicationEmployeeInfo, setApplicationEmployeeInfo] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetch("http://localhost:8000/api/applcation_types_summery/", {
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
          console.log(data);
          setApplicationTypes(data);
        })
        .catch((err) => {
          console.log(err);
        });

      fetch("http://localhost:8000/api/application_employee_info/", {
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
          console.log(data);
          setApplicationEmployeeInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="flex flex-col h-full justify-center items-center mt-10">
      {" "}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="contained" color="success" size="large">
          {" "}
          <Link to={"/employee"}>Wnioski</Link>
        </Button>
        <Button variant="contained" color="success" size="large">
          {" "}
          <Link to={"/user_dashboard"}>Twoje wnioski</Link>
        </Button>
        <Button variant="contained" color="success" size="large">
          {" "}
          <Link to={"/residents"}>Rezydenci</Link>
        </Button>
      </ButtonGroup>
      <div className="m-10">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rodzaj wniosku</TableCell>
                <TableCell>Liczba wniosków</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationTypes.map((row) => (
                <TableRow
                  key={row.type_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.type_name}
                  </TableCell>
                  <TableCell>{row.NumberOfApplications}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Numer pracownika</TableCell>
                <TableCell>Imie pracownika</TableCell>
                <TableCell>Liczba wniosków</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationEmployeeInfo.map((row) => (
                <TableRow
                  key={row.employee_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.employee_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.employee_username}
                  </TableCell>
                  <TableCell>{row.application_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
