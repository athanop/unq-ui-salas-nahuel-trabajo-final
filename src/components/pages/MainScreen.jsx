import React from 'react';
import Tablero from '../organisms/Tablero';
import './MainScreen.css';
import RandomShip from '../molecules/RandomShip' 

const MainScreen = () => {

  
  return (
  <div className="main-screen-container">
    <div className="tableros-container">
      <div className="tablero-container" key="jugador">
        <Tablero randomShips={RandomShip()}/>
      </div>
    </div>
  </div>
);

};

export default MainScreen;