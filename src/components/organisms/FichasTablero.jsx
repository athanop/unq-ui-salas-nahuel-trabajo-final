import React from 'react';
import styles from './FichasTablero.css';
import IconoGiro from '../atoms/rotate.png';

const FichasTablero = ({
  fichas,
  orientacionIconos,
  cambiarOrientacion,
  handleDragStart,
  fichasDisponibles,
  esJugador,
  barcosColocados,
  bloquearBarcos,
  resetTablero
}) => {
  const estiloIconos = {
    display: orientacionIconos === 'horizontal' ? 'flex' : 'block',
    flexDirection: orientacionIconos === 'horizontal' ? 'row' : 'column',
  };

  return (
    <div className="iconos" style={estiloIconos}>
      {esJugador && (
        <div className="contenedor-iconos">
          <div className="icono-giro" onClick={() => cambiarOrientacion(orientacionIconos === 'horizontal' ? 'vertical' : 'horizontal')}>
            <img src={IconoGiro} alt="Cambiar orientación" />
          </div>
          {fichas.map((ficha, index) => (
            <div
              key={index}
              className="ficha"
              draggable
              onDragStart={(event) => handleDragStart(event, ficha)}
            >
              <span className="nombre-ficha">{ficha.nombre}</span>
              <img
                src={ficha.icono}
                alt={`Ficha ${index}`}
                style={{ width: '30px', height: '30px' }}
              />
              <span>{fichasDisponibles[ficha.icono]}</span>
            </div>
          ))}<div>
            <button className="button-reset" onClick={resetTablero}>RESET</button>
          </div>
          <div> {barcosColocados && (
            <button className="start-button" onClick={bloquearBarcos} styles={styles}>START</button>
          )}</div>
        </div>
      )}
    </div>
  );
};


export default FichasTablero;
