import React, { useState, useEffect } from "react";

function UserDashboard() {
  const [user, setUser] = useState({});

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
      <h1>User Dashboard</h1>
    </div>
  );
}

export default UserDashboard;
