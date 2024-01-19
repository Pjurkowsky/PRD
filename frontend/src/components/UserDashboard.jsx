import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetch("http://localhost:8000/api/user_applications", {
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
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="w-8/12 m-auto mt-10">
        <div className="font-bold text-2xl text-center">Twoje wnioski</div>
        <div className="mt-10">
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={applications}
              columns={[
                { field: "id", headerName: "ID", flex: 1 },
                {
                  field: "status",
                  headerName: "Status",
                  flex: 1,
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
                  flex: 1,
                },
                {
                  field: "date_of_verification",
                  headerName: "Data weryfikacji",
                  flex: 1,
                },

                {
                  field: "application_type",
                  headerName: "Rodzaj wniosku",
                  flex: 1,
                  valueGetter: (params) => `${params.value.type_name || ""}`,
                },
                {
                  field: "note",
                  headerName: "Notatka",
                  flex: 1,
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </Box>
        </div>
        <div className="mt-10">
          <div>
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
            >
              <Link to="/application">Złóż nowy wniosek</Link>
            </Button>
          </div>
          {/* <div className="mt-5">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
            >
              Poinformuj o zmarłej osobie
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
