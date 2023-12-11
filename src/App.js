import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import MainScreen from "./components/pages/MainScreen";
import GameScreen from "./components/pages/GameScreen";

const App = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicRoute > <MainScreen /> </PublicRoute>} />
        <Route path="/gamescreen" element={<PublicRoute > <GameScreen /> </PublicRoute>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
