import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Addoperator from "./core/AddOperator";
import AddError from "./core/AddError";
import AddSupervisor from "./core/AddSupervisor";
import AddTechnician from "./core/AddTechnician";
import AddQc from "./core/AddQc";
import Addpacking from "./core/AddPacking";
import AddChangeOver from "./core/AddChangeOver";
import Dashboard from "./core/Dashboard";
import Login from "./core/Login";
import Home from "./core/Home";
import AdminHome from "./core/AdminHome";
import ViewAllChangeovers from "./core/ViewAllChnageovers";
import GenerateReport from "./core/GenerateReport";
import FirstPage from "./core/FirstPage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<FirstPage />} />
          <Route path="/Basilur" exact element={<Login />} />
          <Route
            path="/Basilur/home/:id/:from_login"
            exact
            element={<Home />}
          />
          <Route
            path="/Basilur/adminhome/:id/:from_login"
            exact
            element={<AdminHome />}
          />
          <Route
            path="/Basilur/home/:id/dashboard"
            exact
            element={<Dashboard />}
          />
          <Route
            path="/Basilur/adminhome/:id/addoperator"
            exact
            element={<Addoperator />}
          />
          <Route
            path="/Basilur/adminhome/:id/adderror"
            exact
            element={<AddError />}
          />
          <Route
            path="/Basilur/adminhome/:id/addsupervisor"
            exact
            element={<AddSupervisor />}
          />
          <Route
            path="/Basilur/adminhome/:id/addtechnician"
            exact
            element={<AddTechnician />}
          />
          <Route
            path="/Basilur/adminhome/:id/addqc"
            exact
            element={<AddQc />}
          />
          <Route
            path="/Basilur/adminhome/:id/addpacking"
            exact
            element={<Addpacking />}
          />
          <Route
            path="/Basilur/home/:id/addchangeover"
            exact
            element={<AddChangeOver />}
          />
          <Route
            path="/Basilur/home/:id/generatereport"
            exact
            element={<GenerateReport />}
          />
          <Route
            path="/Basilur/home/:id/viewallchangeovers"
            exact
            element={<ViewAllChangeovers />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
