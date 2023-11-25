import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import Tablero from './components/organisms/Tablero'


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute > <Tablero /> </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
