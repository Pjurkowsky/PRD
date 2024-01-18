import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="w-8/12 m-auto mt-10">
      <div className="font-bold text-2xl text-center">Panel Pracownika</div>
      <div className="mt-10">
        {applications.length > 0 ? (
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={applications}
              columns={[
                { field: "id", headerName: "ID", width: 70 },
                {
                  field: "status",
                  headerName: "Status",
                  width: 130,
                  renderCell: (params) => {
                    return (
                      <div className="flex justify-center">
                        <div
                          className={`${
                            params.value === "approved"
                              ? "bg-green-500"
                              : (params.value === "rejected" && "bg-red-500") ||
                                "bg-blue-500"
                          } text-white rounded-full px-3 py-1 text-sm font-semibold`}
                        >
                          {params.value}
                        </div>
                      </div>
                    );
                  },
                },
                {
                  field: "date_of_submission",
                  headerName: "Data złożenia",
                  width: 200,
                },
                {
                  field: "date_of_verification",
                  headerName: "Data weryfikacji",
                  width: 200,
                },

                {
                  field: "application_type",
                  headerName: "Rodzaj wniosku",
                  width: 200,
                  valueGetter: (params) => `${params.value.type_name || ""}`,
                },

                {
                  headerName: "",
                  width: 200,
                  sortable: false,
                  renderCell: (params) => {
                    return (
                      <div className="flex justify-center">
                        <Button variant="contained" color="primary">
                          <Link to={`/application/${params.row.id}`}>
                            {params.row.status === "approved"
                              ? "Przeglądaj"
                              : "Weryfikuj"}
                          </Link>
                        </Button>
                      </div>
                    );
                  },
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
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="right">Status</TableCell>
    //         <TableCell align="right">Data złożenia</TableCell>
    //         <TableCell align="right">Notatka</TableCell>
    //         <TableCell align="right">Data weryfikacji</TableCell>
    //         <TableCell align="right">Rodzaj wniosku</TableCell>
    //         <TableCell></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {applications.map((row) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //         >
    //           <TableCell align="right">{row.status}</TableCell>
    //           <TableCell align="right">{row.date_of_submission}</TableCell>
    //           <TableCell align="right">{row.note}</TableCell>
    //           <TableCell align="right">{row.date_of_verification}</TableCell>
    //           <TableCell align="right">
    //             {row.application_type.type_name}
    //           </TableCell>
    //           <TableCell align="right">
    //             <Button variant="contained" color="primary">
    //               <Link to={`/application/${row.id}`}>Weryfikuj</Link>
    //             </Button>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}

export default EmployeePage;
