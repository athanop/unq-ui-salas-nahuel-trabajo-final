import React, { useState } from 'react';
import './MainScreen.css';
import { useNavigate } from 'react-router-dom';
import GameScreen from './GameScreen';

const MainScreen = () => {
  const navigate = useNavigate();
  const [jugarClicked, setJugarClicked] = useState(false);

  const goToTablero = () => {
    setJugarClicked(true);
    navigate('/gamescreen');
  };

  return (
    <div className='body-main'>
      <div className="main-screen-container">
        <h1 className="game-title">Battleship</h1>
        <div className="custom-menu">
          <button className="jugar-button" onClick={goToTablero}>Jugar</button>
        </div>
        <div className="tableros-container">
          <div className="tablero-container" key="jugador">
            {jugarClicked && <GameScreen />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
