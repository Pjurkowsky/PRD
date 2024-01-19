import { useEffect, useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import EmployeePage from "./components/EmployeePage";
import UserDashboard from "./components/UserDashboard";
import ApplicationVerification from "./components/ApplicationVerification";
import ApplicationForm from "./components/ApplicationForm";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Residents from "./components/Residents";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  function logout() {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    setIsEmployee(false);
  }

  return (
    <>
      <nav className="bg-green-500 border-gray-200">
        <div className="flex mx-auto p-4">
          <div className="flex-1"></div>
          <div className="flex mt-2">
            <span className="font-semibold text-xl tracking-tight">
              <Link to={"/"}> GMINA ZBĄSZYNEK</Link>
            </span>
          </div>
          <div className="flex flex-1">
            <span className="font-semibold text-xl tracking-tight ml-auto">
              {!loggedIn && (
                <Link to={"/login"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Zaloguj
                  </button>
                </Link>
              )}
              {loggedIn && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                  onClick={logout}
                >
                  Wyloguj
                </button>
              )}
            </span>
          </div>
        </div>
      </nav>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="user_dashboard/" element={<UserDashboard />} />
          <Route path="employee_dashboard/" element={<EmployeeDashboard />} />
          <Route path="application/:id" element={<ApplicationVerification />} />
          <Route path="residents/" element={<Residents />} />
        </Route>
        <Route
          path="/"
          element={<Home isEmployee={isEmployee} loggedIn={loggedIn} />}
        />

        <Route
          path="/login"
          element={
            <Login setLoggedIn={setLoggedIn} setIsEmployee={setIsEmployee} />
          }
        />
        <Route
          path="/application"
          element={<ApplicationForm loggedIn={loggedIn} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
