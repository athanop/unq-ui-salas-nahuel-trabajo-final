import React from 'react';

const Cell = ({
    filaIndex,
    celdaIndex,
    celda,
    celdasValidas,
    celdasInvalidas,
    handleDrop,
    handleCellClick,
  }) => {
    return (
      <div
        className={`celda ${celdasValidas.some(
          (c) => c.fila === filaIndex && c.celda === celdaIndex
        ) ? 'celda-valida' : ''} ${celdasInvalidas.some(
          (c) => c.fila === filaIndex && c.celda === celdaIndex
        ) ? 'celda-invalida' : ''}`}
        onDrop={(event) => handleDrop(event, filaIndex, celdaIndex)}
        onClick={() => handleCellClick(filaIndex, celdaIndex)}
      >
        {celda && celda.icono && (
          <img
            src={celda.icono}
            alt={`Ficha en Jugador ${filaIndex}-${celdaIndex}`}
            style={{ width: '30px', height: '30px' }}
          />
        )}
      </div>
    );
  };
  
  export default Cell;
