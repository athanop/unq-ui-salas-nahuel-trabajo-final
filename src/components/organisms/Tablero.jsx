import React, { useState, useEffect } from 'react';
import style from './Tablero.css';
import IconPortaAviones from '../atoms/portaaviones.png';
import IconCrucero from '../atoms/crucero.png';
import IconLancha from '../atoms/lancha.png';
import IconSubmarino from '../atoms/submarino.png';
import FichasTablero from './FichasTablero';
import Letras from '../molecules/Letras';
import Numeros from '../molecules/Numeros';
import ValidacionArrastre from '../molecules/ValidacionArrastre';
import Cell from '../molecules/Cell';

const Tablero = ({ esJugador, randomShips }) => {
  const [celdaAtacada, setCeldaAtacada] = useState(null);
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
  const barcosColocados = Object.values(fichasDisponibles).every((cantidad) => cantidad === 0);
  const [barcosBloqueados, setBarcosBloqueados] = useState(false);

  useEffect(() => {
    if (!esJugador) {
      setTableroJugador(randomShips);
    }
  }, [esJugador, randomShips]);

  const bloquearBarcos = () => {
    if (barcosColocados) {
      setBarcosBloqueados(true);
    } else {
      console.log('Aún faltan barcos por colocar');
    }
  };

  const cambiarOrientacion = (orientacion) => {
    setOrientacionIconos(orientacion);
  };

  const handleDragStart = (event, ficha) => {
    if (fichasDisponibles[ficha.icono] > 0) {
      setFichaArrastrada(ficha);
    }
  };


  const handleDrop = (event, filaIndex, celdaIndex) => {
    event.preventDefault();
    if (!esJugador || !fichaArrastrada || barcosBloqueados) return;

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


  const borrarBarco = (filaIndex, celdaIndex) => {
    const tableroActualizado = JSON.parse(JSON.stringify(tableroJugador));
    const celda = tableroActualizado[filaIndex][celdaIndex];

    if (!celda || !celda.icono) return;

    tableroActualizado[filaIndex][celdaIndex] = null;

    const iconoBarco = celda.icono;

    const barcoEnCelda = tableroActualizado.some((fila) =>
      fila.some((c) => c && c.icono === iconoBarco)
    );

    if (!barcoEnCelda) {
      const nuevasFichasDisponibles = {
        ...fichasDisponibles,
        [iconoBarco]: fichasDisponibles[iconoBarco] + 1,
      };

      setFichasDisponibles(nuevasFichasDisponibles);
    }

    setTableroJugador(tableroActualizado);
  };

  const letras = Array.from({ length: tableroJugador.length }, (_, index) => String.fromCharCode(65 + index));
  const numeros = Array.from({ length: tableroJugador[0].length }, (_, index) => index + 1);

  const handleCellClick = (filaIndex, celdaIndex) => {
    if (!barcosBloqueados) {
      const iconoBarco = tableroJugador[filaIndex][celdaIndex]?.icono;

      if (iconoBarco) {
        borrarBarco(filaIndex, celdaIndex);
      } else if (!esJugador) {
        pintarCeldaRoja(filaIndex, celdaIndex);
        bloquearCelda(filaIndex, celdaIndex);
      } else {
        borrarBarco(filaIndex, celdaIndex);
      }
      const letra = letras[filaIndex];
      const numero = numeros[celdaIndex];

      setCeldaAtacada(`${letra}${numero}`);
    }
  };


  const pintarCeldaRoja = (filaIndex, celdaIndex) => {
    if (!esJugador) {
      const updatedTablero = [...tableroJugador];
      updatedTablero[filaIndex] = [...updatedTablero[filaIndex]];

      updatedTablero[filaIndex][celdaIndex] = {
        ...updatedTablero[filaIndex][celdaIndex],
        sinBarco: true,
      };

      setTableroJugador(updatedTablero);
    }
  };

  const bloquearCelda = (filaIndex, celdaIndex) => {
    if (!esJugador) {
      const updatedCeldasInvalidas = [...celdasInvalidas];
      updatedCeldasInvalidas.push({ fila: filaIndex, celda: celdaIndex });
      setCeldasInvalidas(updatedCeldasInvalidas);
    }
  };



  return (
    <div className="contenedor-general">
      <div className="info-celda-atacada" style={style}>
        {celdaAtacada && (
          <p>El disparo ocurrió en: {celdaAtacada}</p>
        )}
      </div>

      {esJugador && barcosColocados && (
        <button onClick={bloquearBarcos}>LISTO</button>
      )}
      <div className="contenedor-tablero">
        <Numeros numeros={numeros} esJugador={esJugador} />
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
            esJugador={esJugador}
          />
          <Letras letras={letras} />
          <div className={`tablero jugador`}>
          <ValidacionArrastre
            esJugador={esJugador}
            fichaArrastrada={fichaArrastrada}
            orientacionIconos={orientacionIconos}
            tableroJugador={tableroJugador}
            setCeldasValidas={setCeldasValidas}
            setCeldasInvalidas={setCeldasInvalidas}
          />
            {tableroJugador.map((fila, filaIndex) => (
              <div key={filaIndex} className="fila">
                {fila.map((celda, celdaIndex) => (
                  <Cell
                    key={celdaIndex}
                    filaIndex={filaIndex}
                    celdaIndex={celdaIndex}
                    celda={celda}
                    celdasValidas={celdasValidas}
                    celdasInvalidas={celdasInvalidas}
                    handleDrop={handleDrop}
                    handleCellClick={handleCellClick}
                  />
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