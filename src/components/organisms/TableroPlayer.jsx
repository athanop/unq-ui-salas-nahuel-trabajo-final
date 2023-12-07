import React from 'react';
import './TableroPlayer.css'


function TableroPlayer({
    tableroJugador,
    esJugador,
    celdasValidas,
    celdasInvalidas,
    juegoTerminado,
    handleDragOver,
    handleDrop,
    handleCellClick,
    IconExplode
}) {
    return (
        <div className="tablero-jugador">
            {tableroJugador.map((fila, filaIndex) => (
                <div key={filaIndex} className="fila">
                    {fila.map((celda, celdaIndex) => {
                        const isEnemyShip = !esJugador && celda && celda.icono;
                        const showIcon = isEnemyShip
                            ? celda?.atacada
                                ? celda.explosion ? IconExplode : null
                                : null
                            : celda?.icono;
                        return (
                            <div
                                key={celdaIndex}
                                className={`celda ${celdasValidas.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                                    ? 'celda-valida'
                                    : ''
                                    } ${celdasInvalidas.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                                    ? 'celda-invalida'
                                    : ''
                                    } ${!celda?.icono && celda?.atacada ? 'atacada' : ''} ${celda?.explosion ? 'explosion' : ''
                                    }`}
                                onDragOver={(event) => handleDragOver(event, filaIndex, celdaIndex)}
                                onDrop={(event) => handleDrop(event, filaIndex, celdaIndex)}
                                onClick={() => {
                                    if (!juegoTerminado) {
                                        handleCellClick(filaIndex, celdaIndex, tableroJugador);
                                    }
                                }}
                            >
                                {showIcon && (
                                    <img
                                        src={showIcon}
                                        alt={`Ficha en Jugador ${filaIndex}-${celdaIndex}`}
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default TableroPlayer;



