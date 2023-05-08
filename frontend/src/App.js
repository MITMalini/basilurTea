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
export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/addoperator" exact element={<Addoperator />} />
          <Route path="/adderror" exact element={<AddError />} />
          <Route path="/addsupervisor" exact element={<AddSupervisor />} />
          <Route path="/addtechnician" exact element={<AddTechnician />} /> 
          <Route path="/addqc" exact element={<AddQc />} /> 
          <Route path="/addpacking" exact element={<Addpacking />} />
          <Route path="/addchangeover/:id/:from_login" exact element={<AddChangeOver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}