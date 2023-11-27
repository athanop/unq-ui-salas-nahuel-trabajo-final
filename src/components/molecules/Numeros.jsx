import React from 'react';
import './Numeros.css'

const Numeros = ({ numeros, esJugador }) => (
  <div className={`numeros ${esJugador ? '' : 'numeros-maquina'}`}>
    {numeros.map((numero, index) => (
      <div key={index} className="numero">
        {numero}
      </div>
    ))}
  </div>
);

export default Numeros;