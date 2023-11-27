import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import MainScreen from "./components/pages/MainScreen";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute > <MainScreen /> </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
