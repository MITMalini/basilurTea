import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addoperator from './core/AddOperator';
import AddError from './core/AddError'
import AddSupervisor from './core/AddSupervisor'
import AddTechnician from './core/AddTechnician';
import AddQc from './core/AddQc';
import Addpacking from './core/AddPacking';
import AddChangeOver from './core/AddChangeOver';
import Dashboard from './core/Dashboard';
import Login from './core/Login';
import Home from './core/Home';
export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home/:id/dashboard" exact element={<Dashboard />} />
          <Route path="/home/:id/addoperator" exact element={<Addoperator />} />
          <Route path="/home/:id/adderror" exact element={<AddError />} />
          <Route path="/home/:id/addsupervisor" exact element={<AddSupervisor />} />
          <Route path="/home/:id/addtechnician" exact element={<AddTechnician />} /> 
          <Route path="/home/:id/addqc" exact element={<AddQc />} /> 
          <Route path="/home/:id/addpacking" exact element={<Addpacking />} />
          <Route path="/home/:id/addchangeover" exact element={<AddChangeOver />} />
          <Route path="/home/:id/:from_login" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}