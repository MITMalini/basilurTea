import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addoperator from './core/AddOperator';
import AddError from './core/AddError'
import AddSupervisor from './core/AddSupervisor'
import Dashboard from './core/Dashboard';
import AddTechnician from './core/AddTechnician';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/addoperator" exact element={<Addoperator />} />
          <Route path="/adderror" exact element={<AddError />} />
          <Route path="/addsupervisor" exact element={<AddSupervisor />} />
          <Route path="/dashboard" exact element={<Dashboard />} /> 
          <Route path="/addtechnician" exact element={<Dashboard />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}