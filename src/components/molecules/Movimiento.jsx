import React from 'react';
import './Movimiento.css';

const Movimientos = ({ movimientos, titulo, letras, numeros }) => {
    return (
      <div className="movimientos-container">
        <h3>{titulo}</h3>
        <ul>
          {movimientos.map((movimiento, index) => (
            <li key={index}>{`Letra: ${letras[movimiento.filaIndex]}, Número: ${numeros[movimiento.celdaIndex]}`}</li>
          ))}
        </ul>
      </div>
    );
  };

export default Movimientos;
