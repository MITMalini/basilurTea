import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addoperator from './core/AddOperator';
import AddError from './core/AddError'
import AddSupervisor from './core/AddSupervisor'
import Dashboard from './core/Dashboard';
import AddTechnician from './core/AddTechnician';
import AddQc from './core/AddQc';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/operator" exact element={<Addoperator />} />
          <Route path="/error" exact element={<AddError />} />
          <Route path="/supervisor" exact element={<AddSupervisor />} />
          <Route path="/dashboard" exact element={<Dashboard />} /> 
          <Route path="/technician" exact element={<AddTechnician />} /> 
          <Route path="/qc" exact element={<AddQc />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}