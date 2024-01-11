import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import EmployeePage from "./components/EmployeePage";
import UserDashboard from "./components/UserDashboard";
import ApplicationForm from "./components/UserDashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function logout() {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <>
      <nav className="bg-green-500 border-gray-200">
        <div className="flex items-center mx-auto p-4">
          <div className="flex mx-auto">
            <span className="font-semibold text-xl tracking-tight">
              <Link to={"/"}> GMINA ZBĄSZYNEK</Link>
            </span>
          </div>

          <span className="font-semibold text-xl tracking-tight">
            {!loggedIn && (
              <Link to={"/login"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Zaloguj
                </button>
              </Link>
            )}
            {loggedIn && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
              >
                Wyloguj
              </button>
            )}
          </span>
        </div>
      </nav>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/employee" element={<EmployeePage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dashboard/" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
