import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

function App() {
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
            <Link to={"/login"}>Zaloguj</Link>
          </span>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
