import React, { useState } from 'react';
import './Tablero.css';
import IconPortaAviones from '../atoms/portaaviones.png';
import IconCrucero from '../atoms/crucero.png';
import IconLancha from '../atoms/lancha.png';
import IconSubmarino from '../atoms/submarino.png';
import FichasTablero from './FichasTablero'; 


const Tablero = () => {
  const [celdasValidas, setCeldasValidas] = useState([]);
  const [celdasInvalidas, setCeldasInvalidas] = useState([]);
  const [tableroJugador, setTableroJugador] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [fichaArrastrada, setFichaArrastrada] = useState(null);
  const [orientacionIconos, setOrientacionIconos] = useState('horizontal');
  const [fichasDisponibles, setFichasDisponibles] = useState({
    [IconPortaAviones]: 1,
    [IconCrucero]: 1,
    [IconLancha]: 1,
    [IconSubmarino]: 1,
  });

  const cambiarOrientacion = (orientacion) => {
    setOrientacionIconos(orientacion);
  };

  const handleDragStart = (event, ficha) => {
    if (fichasDisponibles[ficha.icono] > 0) {
      setFichaArrastrada(ficha);
    }
  };

  const handleDragOver = (event, filaIndex, celdaIndex) => {
    event.preventDefault();
  
    if (!fichaArrastrada) return;
  
    const ficha = { ...fichaArrastrada };
    const size = ficha.agujeros;
  
    const maxFilaIndex = orientacionIconos === 'horizontal' ? filaIndex : filaIndex + size - 1;
    const maxCeldaIndex = orientacionIconos === 'horizontal' ? celdaIndex + size - 1 : celdaIndex;
  
    const celdasValidas = [];
    let celdasInvalidas = [];
  
    if (maxFilaIndex < 10 && maxCeldaIndex < 10) {
      for (let i = filaIndex; i <= maxFilaIndex; i++) {
        for (let j = celdaIndex; j <= maxCeldaIndex; j++) {
          if (tableroJugador[i][j] === null) {
            celdasValidas.push({ fila: i, celda: j });
          } else {
            celdasInvalidas.push({ fila: i, celda: j });
          }
        }
      }
    } else {
      celdasInvalidas = [{ fila: filaIndex, celda: celdaIndex }];
    }
  
    setCeldasValidas(celdasValidas);
    setCeldasInvalidas(celdasInvalidas);
  };

  const handleDrop = (event, filaIndex, celdaIndex) => {
    event.preventDefault();
    if (!fichaArrastrada) return;

    const nuevoTablero = JSON.parse(JSON.stringify(tableroJugador));
    const ficha = { ...fichaArrastrada };
    const size = ficha.agujeros;

    const maxFilaIndex = orientacionIconos === 'horizontal' ? filaIndex : filaIndex + size - 1;
    const maxCeldaIndex = orientacionIconos === 'horizontal' ? celdaIndex + size - 1 : celdaIndex;

    if (maxFilaIndex >= 10 || maxCeldaIndex >= 10) {
      setFichaArrastrada(null);
      setCeldasValidas([]);
      setCeldasInvalidas([]);
      return;
    }

    for (let i = filaIndex; i <= maxFilaIndex; i++) {
      for (let j = celdaIndex; j <= maxCeldaIndex; j++) {
        if (nuevoTablero[i][j] !== null) {
          setFichaArrastrada(null);
          setCeldasValidas([]);
          setCeldasInvalidas([]);
          return;
        }
      }
    }

    if (fichasDisponibles[ficha.icono] > 0) {
      for (let i = filaIndex; i <= maxFilaIndex; i++) {
        for (let j = celdaIndex; j <= maxCeldaIndex; j++) {
          nuevoTablero[i][j] = { icono: ficha.icono };
        }
      }

      const nuevasFichasDisponibles = {
        ...fichasDisponibles,
        [ficha.icono]: fichasDisponibles[ficha.icono] - 1,
      };

      setFichasDisponibles(nuevasFichasDisponibles);
      setTableroJugador(nuevoTablero);
      setFichaArrastrada(null);
      setCeldasValidas([]);
    }
  };


  return (
    <div className="contenedor-general">
      <div className="contenedor-tablero">
        <div className="tablero-con-iconos">
        <FichasTablero
  fichas={[
    { nombre: 'Portaaviones', icono: IconPortaAviones, agujeros: 5 },
    { nombre: 'Crucero', icono: IconCrucero, agujeros: 4 },
    { nombre: 'Lancha', icono: IconLancha, agujeros: 2 },
    { nombre: 'Submarino', icono: IconSubmarino, agujeros: 3 },
  ]}
            orientacionIconos={orientacionIconos}
            cambiarOrientacion={cambiarOrientacion}
            handleDragStart={handleDragStart}
            fichasDisponibles={fichasDisponibles}
          />
        <div className={`tablero jugador`}>
            {tableroJugador.map((fila, filaIndex) => (
              <div key={filaIndex} className="fila">
                {fila.map((celda, celdaIndex) => (
                  <div
                    key={celdaIndex}
                    className={`celda ${celdasValidas.some(
                      (c) => c.fila === filaIndex && c.celda === celdaIndex
                    ) ? 'celda-valida' : ''} ${celdasInvalidas.some(
                      (c) => c.fila === filaIndex && c.celda === celdaIndex
                    ) ? 'celda-invalida' : ''}`}
                    onDragOver={(event) => handleDragOver(event, filaIndex, celdaIndex)}
                    onDrop={(event) => handleDrop(event, filaIndex, celdaIndex)}
                  >
                    {celda && celda.icono && (
                      <img
                        src={celda.icono}
                        alt={`Ficha en Jugador ${filaIndex}-${celdaIndex}`}
                        style={{ width: '30px', height: '30px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tablero;
