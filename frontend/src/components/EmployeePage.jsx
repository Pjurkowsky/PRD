import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  status,
  date_of_submission,
  note,
  date_of_verification,
  application_type
) {
  return {
    status,
    date_of_submission,
    note,
    date_of_verification,
    application_type,
  };
}

function EmployeePage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetch("http://localhost:8000/api/employee_applications", {
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
          setApplications(data);
          console.log(data);
        });
    }
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
  );
}

export default EmployeePage;
