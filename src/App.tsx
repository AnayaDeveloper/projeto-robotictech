import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CameraDetails from './pages/CameraDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/camera/:id" element={<CameraDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;