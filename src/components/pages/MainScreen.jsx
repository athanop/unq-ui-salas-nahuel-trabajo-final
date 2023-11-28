import React from 'react';
import Tablero from '../organisms/Tablero';
import './MainScreen.css'; 
import RandomShip from '../molecules/RandomShip';

const MainScreen = () => {


  return (
    <div className="main-screen-container">
        <div className="tableros-container">
          <div className="tablero-container">
            <h2>Tablero del Jugador</h2>
            <Tablero esJugador={true}/>
          </div>
          <div className="tablero-container">
            <h2>Tablero de la Máquina</h2>
            <Tablero esJugador={false} randomShips={RandomShip()} />
          </div>
        </div>
    </div>
  );
};

export default MainScreen;