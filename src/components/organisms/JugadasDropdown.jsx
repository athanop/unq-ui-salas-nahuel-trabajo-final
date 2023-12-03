import React, { useState } from 'react';
import Jugadas from '../molecules/Jugadas';
import './JugadasDropdown.css';

const JugadasDropdown = ({ movimientosJugador, movimientosMaquina, letras, numeros }) => {
    const [mostrarJugadas, setMostrarJugadas] = useState(false);

    const toggleMostrarJugadas = () => {
        setMostrarJugadas(!mostrarJugadas);
    };

    return (
        <div className='jugadas-tablero'>
            <div className="custom-button" onClick={toggleMostrarJugadas}>
                {mostrarJugadas ? 'Ocultar Jugadas' : 'Mostrar Jugadas'}
            </div>
            <div className={`jugadas-content ${mostrarJugadas ? 'visible' : 'oculto'}`}>
                <Jugadas
                    movimientosJugador={movimientosJugador}
                    movimientosMaquina={movimientosMaquina}
                    letras={letras}
                    numeros={numeros}
                />
            </div>
        </div>
    );
};

export default JugadasDropdown;
