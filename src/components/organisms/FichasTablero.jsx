import React from 'react';
import './FichasTablero.css';

const FichasTablero = ({
  fichas,
  orientacionIconos,
  cambiarOrientacion,
  handleDragStart,
  fichasDisponibles,
}) => {
  const estiloIconos = {
    display: orientacionIconos === 'horizontal' ? 'flex' : 'block',
    flexDirection: orientacionIconos === 'horizontal' ? 'row' : 'column',
  };

  return (
    <div className="iconos" style={estiloIconos}>
      <div className="contenedor-iconos">
        <div>
          <button onClick={() => cambiarOrientacion('horizontal')}>Horizontal</button>
          <button onClick={() => cambiarOrientacion('vertical')}>Vertical</button>
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

      </div>
    </div>
  );
};

export default FichasTablero;
