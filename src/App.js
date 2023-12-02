import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import MainScreen from "./components/pages/MainScreen";
import Tablero from "./components/pages/Tablero";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute > <MainScreen /> </PublicRoute>} />
        <Route path="/tablero" element={<PublicRoute > <Tablero /> </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
