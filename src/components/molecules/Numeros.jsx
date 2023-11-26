import React from 'react';
import './Numeros.css'

const Numeros = ({ numeros }) => (
    <div className="numeros">
      {numeros.map((numero, index) => (
        <div key={index} className="numero">
          {numero}
        </div>
      ))}
    </div>
  );

export default Numeros;