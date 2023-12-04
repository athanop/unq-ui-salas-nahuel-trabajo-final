import React, { useEffect, useRef } from 'react';
import './Movimiento.css';

const Movimiento = ({ movimientos, titulo, letras, numeros }) => {
  const movimientosContainerRef = useRef(null);

  useEffect(() => {
    if (movimientosContainerRef.current) {
      movimientosContainerRef.current.scrollTop = movimientosContainerRef.current.scrollHeight;
    }
  }, [movimientos]);

  return (
    <div className="movimientos-container" ref={movimientosContainerRef}>
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