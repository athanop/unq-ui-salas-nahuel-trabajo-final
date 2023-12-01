import React from 'react';
import './Jugadas.css';
import Movimientos from '../molecules/Movimiento';

const Jugadas = ({ movimientosJugador, movimientosMaquina, letras, numeros }) => {
    return (
      <div className="contenedor-movimientos">
        <Movimientos
          movimientos={movimientosJugador}
          titulo="Jugador"
          letras={letras}
          numeros={numeros}
        />
        <Movimientos
          movimientos={movimientosMaquina}
          titulo="Máquina"
          letras={letras}
          numeros={numeros}
        />
      </div>
    );
  };
  
  export default Jugadas;