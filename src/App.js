import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import MainScreen from "./components/pages/MainScreen";
import GameScreen from "./components/pages/GameScreen";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute > <MainScreen /> </PublicRoute>} />
        <Route path="/gamescreen" element={<PublicRoute > <GameScreen /> </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
