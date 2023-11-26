import React from 'react';
import './Letras.css'

const Letras = ({ letras }) => (
    <div className="letras-container">
      {letras.map((letra, index) => (
        <div key={index} className="letra">
          {letra}
        </div>
      ))}
    </div>
  );

export default Letras;