import React, { useEffect } from 'react';
import './FichasTablero.css';
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
  resetTablero,
  turno,
  mostrarMensaje,
  setMostrarMensaje,
  botonStartMostrado,
  setBotonStartMostrado,
  ganador,
  juegoTerminado
}) => {
  const estiloIconos = {
    display: orientacionIconos === 'horizontal' ? 'flex' : 'block',
    flexDirection: orientacionIconos === 'horizontal' ? 'row' : 'column',
  };

  const mostrarMensajeTurno = !mostrarMensaje && !botonStartMostrado;

  useEffect(() => {
    if (mostrarMensaje && !botonStartMostrado) {
      const timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [mostrarMensaje, botonStartMostrado, setMostrarMensaje]);

  return (
    <div className="iconos" style={estiloIconos}>
      {esJugador && (
        <div className="contenedor-iconos">
          <div className="icono-giro" onClick={() => cambiarOrientacion(orientacionIconos === 'horizontal' ? 'vertical' : 'horizontal')}>
          Girar barco
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
          ))}
          <div>
            <button className="button-reset" onClick={resetTablero}>RESET</button>
          </div>
          <div>
            {barcosColocados && botonStartMostrado && (
              <button className="start-button" onClick={() => {
                bloquearBarcos();
                setMostrarMensaje(true);
                setBotonStartMostrado(false);
              }}>START</button>
            )}
          </div>
          {mostrarMensaje && !botonStartMostrado && (
            <div className="mensaje">
              <p>¡Comienza la batalla!</p>
            </div>
          )}
          {!juegoTerminado && mostrarMensajeTurno && (
            <div className="mensaje">
              {turno ? <p>¡Derriba a tu oponente!</p> : <p>¡Es turno del oponente!</p>}
            </div>
          )}
          {ganador && ganador.length > 0 &&(
          <div className="mensaje-ganador">
            <p>{ganador}</p>
          </div>
        )}
        </div>
      )}
    </div>
    
  );
};

export default FichasTablero;
