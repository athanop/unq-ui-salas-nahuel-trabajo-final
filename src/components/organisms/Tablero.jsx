import React, { useState, useEffect } from 'react';
import './Tablero.css';
import IconPortaAviones from '../atoms/portaaviones.png';
import IconCrucero from '../atoms/crucero.png';
import IconLancha from '../atoms/lancha.png';
import IconSubmarino from '../atoms/submarino.png';
import IconExplode from '../atoms/explode.png'
import FichasTablero from './FichasTablero';
import Letras from '../molecules/Letras';
import Numeros from '../molecules/Numeros';
import Movimientos from '../molecules/Movimiento';
import Jugadas from './Jugadas';

const Tablero = ({ randomShips }) => {
  const [mensajeAtaqueMaquina, setMensajeAtaqueMaquina] = useState('');
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [esJugador, setEsJugador] = useState([]);
  const [celdasValidas, setCeldasValidas] = useState([]);
  const [celdasInvalidas, setCeldasInvalidas] = useState([]);
  const [celdasValidasMaquina, setCeldasValidasMaquina] = useState([]);
  const [celdasInvalidasMaquina, setCeldasInvalidasMaquina] = useState([]);
  const [movimientosJugador, setMovimientosJugador] = useState([]);
  const [movimientosMaquina, setMovimientosMaquina] = useState([]);
  const [tableroMaquina, setTableroMaquina] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));
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
    setTableroMaquina(randomShips);
    setEsJugador(true);
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
    if (!fichaArrastrada || barcosBloqueados) return;

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


  const handleResetTablero = () => {
    setFichasDisponibles({
      [IconPortaAviones]: 1,
      [IconCrucero]: 1,
      [IconLancha]: 1,
      [IconSubmarino]: 1,
    });
    setTableroJugador(Array.from({ length: 10 }, () => Array(10).fill(null)));
  };
  
  
  
  

  const handleCellClick = (filaIndex, celdaIndex, tablero) => {
    if (!barcosBloqueados && turnoJugador) {
       if (!tablero[filaIndex][celdaIndex]?.icono && tablero === tableroMaquina) {
        const nuevoTableroMaquina = [...tablero];
        nuevoTableroMaquina[filaIndex][celdaIndex] = { ...nuevoTableroMaquina[filaIndex][celdaIndex], atacada: true };
        setTableroMaquina(nuevoTableroMaquina);
        setMovimientosJugador([...movimientosJugador, { filaIndex, celdaIndex }]);
        setTimeout(() => {
          generarCeldaAleatoria();
          setMovimientosMaquina([...movimientosMaquina, { filaIndex, celdaIndex }]);
          setTurnoJugador(true);
        }, 1000);
        setTurnoJugador(false);
      } else if (tablero[filaIndex][celdaIndex]?.icono && tablero === tableroMaquina) {
        const nuevoTableroMaquina = JSON.parse(JSON.stringify(tableroMaquina));
        const celda = nuevoTableroMaquina[filaIndex][celdaIndex];

        if (turnoJugador && celda && celda.icono) {
          nuevoTableroMaquina[filaIndex][celdaIndex] = { ...celda, atacada: true, explosion: true };
        } else {
          nuevoTableroMaquina[filaIndex][celdaIndex] = { ...celda, atacada: true };
        }
        setTableroMaquina(nuevoTableroMaquina);
        setMovimientosJugador([...movimientosJugador, { filaIndex, celdaIndex }]);
        setTimeout(() => {
          generarCeldaAleatoria();
          setTurnoJugador(true);
          setMovimientosMaquina([...movimientosMaquina, { filaIndex, celdaIndex }]);
        }, 1000);
        setTurnoJugador(false);
      }
    }
  };


  const generarCeldaAleatoria = () => {
    const filaAleatoria = Math.floor(Math.random() * tableroJugador.length);
    const celdaAleatoria = Math.floor(Math.random() * tableroJugador[filaAleatoria].length);
    if (!tableroJugador[filaAleatoria][celdaAleatoria]?.icono) {
      const nuevoTableroJugador = [...tableroJugador];
      nuevoTableroJugador[filaAleatoria][celdaAleatoria] = { atacada: true };
      setTableroJugador(nuevoTableroJugador);
    } else {
      const nuevoTableroJugador = [...tableroJugador];
      nuevoTableroJugador[filaAleatoria][celdaAleatoria] = { icono: IconExplode };
      setTableroJugador(nuevoTableroJugador);
    }
  };


  const letras = Array.from({ length: tableroJugador.length }, (_, index) => String.fromCharCode(65 + index));
  const numeros = Array.from({ length: tableroJugador[0].length }, (_, index) => index + 1);

  return (
    <div className="contenedor-general">{mensajeAtaqueMaquina && <p>{mensajeAtaqueMaquina}</p>}
    <Jugadas
      movimientosJugador={movimientosJugador}
      movimientosMaquina={movimientosMaquina}
      letras={letras}
      numeros={numeros}
    />
      <div className="contenedor-tablero">
        <div className="numeros-jugador">
          <Numeros numeros={numeros} esJugador={esJugador} />
        </div>
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
            barcosColocados={barcosColocados}
            bloquearBarcos={bloquearBarcos}
            resetTablero={handleResetTablero}
          />
          <Letras letras={letras} />
          <div className={`tablero-jugador`}>
            {tableroJugador.map((fila, filaIndex) => (
              <div key={filaIndex} className="fila">
                {fila.map((celda, celdaIndex) => (
                  <div
                    key={celdaIndex}
                    className={`celda ${celdasValidas.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                      ? 'celda-valida'
                      : ''} ${celdasInvalidas.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                        ? 'celda-invalida'
                        : ''} ${!celda?.icono && celda?.atacada ? 'atacada' : ''} ${celda?.explosion ? 'explosion' : ''}`}
                    onDragOver={(event) => handleDragOver(event, filaIndex, celdaIndex)}
                    onDrop={(event) => handleDrop(event, filaIndex, celdaIndex)}
                    onClick={() => handleCellClick(filaIndex, celdaIndex, tableroJugador)}
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

          <Letras letras={letras} />
          <div className="numeros-maquina">
            <Numeros numeros={numeros} esJugador={esJugador} />
          </div>
          <div className={`tablero-maquina`}>
            {tableroMaquina.map((fila, filaIndex) => (
              <div key={filaIndex} className="fila">
                {fila.map((celda, celdaIndex) => {
                  const isEnemyShip = esJugador && celda && celda.icono;
                  const showIcon = isEnemyShip ? (celda?.atacada ? (celda.explosion ? IconExplode : null) : null) : celda?.icono;

                  return (
                    <div
                      key={celdaIndex}
                      className={`celda ${celdasValidasMaquina.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                        ? 'celda-valida'
                        : ''} ${celdasInvalidasMaquina.some((c) => c.fila === filaIndex && c.celda === celdaIndex)
                          ? 'celda-invalida'
                          : ''} ${!celda?.icono && celda?.atacada ? 'atacada' : ''} ${celda?.explosion ? 'explosion' : ''}`}
                      onDragOver={(event) => handleDragOver(event, filaIndex, celdaIndex)}
                      onDrop={(event) => handleDrop(event, filaIndex, celdaIndex)}
                      onClick={() => {
                        if (turnoJugador) {
                          handleCellClick(filaIndex, celdaIndex, tableroMaquina);
                        }
                      }}

                    >
                      {showIcon && (
                        <img
                          src={showIcon === IconExplode ? IconExplode : showIcon}
                          alt={showIcon === IconExplode ? 'Explosión' : `Ficha en Jugador ${filaIndex}-${celdaIndex}`}
                          style={{ width: '30px', height: '30px' }}
                        />
                      )}

                    </div>
                  );
                })}
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Tablero;