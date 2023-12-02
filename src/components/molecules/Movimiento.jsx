import React from 'react';
import './Movimiento.css';

const Movimiento = ({ movimientos, titulo, letras, numeros }) => {
  return (
    <div className="movimientos-container">
      <h3>{titulo}</h3>
      <ul>
        {movimientos.map((movimiento, index) => (
          <li key={index}>
            <span className="movimiento">
              {letras[movimiento.filaIndex]}
              {numeros[movimiento.celdaIndex]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movimiento;
