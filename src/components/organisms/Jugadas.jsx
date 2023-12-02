import React from 'react';
import './Jugadas.css';
import Movimiento from '../molecules/Movimiento';

const Jugadas = ({ movimientosJugador, movimientosMaquina, letras, numeros }) => {
    return (
      <div className="contenedor-movimientos">
        <Movimiento
          movimientos={movimientosJugador}
          titulo="Jugador"
          letras={letras}
          numeros={numeros}
        />
        <Movimiento
          movimientos={movimientosMaquina}
          titulo="Máquina"
          letras={letras}
          numeros={numeros}
        />
      </div>
    );
  };
  
  export default Jugadas;