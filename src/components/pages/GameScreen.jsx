import React, { useState, useEffect } from 'react';
import './GameScreen.css';
import IconPortaAviones from '../atoms/portaaviones.png';
import IconCrucero from '../atoms/crucero.png';
import IconLancha from '../atoms/lancha.png';
import IconSubmarino from '../atoms/submarino.png';
import IconExplode from '../atoms/explode.png'
import FichasTablero from '../organisms/FichasTablero';
import Letras from '../molecules/Letras';
import Numeros from '../molecules/Numeros';
import RandomShip from '../molecules/RandomShip';
import Jugadas from '../molecules/Jugadas';
import TableroPlayer from '../organisms/TableroPlayer';
import GameStatus from '../molecules/GameStatus';


const GameScreen = () => {
  const [contadorJugador1, setContadorJugador1] = useState(0);
  const [contadorJugador2, setContadorJugador2] = useState(0);
  const [celdasSeleccionadas, setCeldasSeleccionadas] = useState(new Set());
  const [ganador, setGanador] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [botonStartMostrado, setBotonStartMostrado] = useState(true);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [esJugador, setEsJugador] = useState([]);
  const [celdasValidas, setCeldasValidas] = useState([]);
  const [celdasInvalidas, setCeldasInvalidas] = useState([]);
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
    setTableroMaquina(RandomShip());
    setEsJugador(true);
  }, [esJugador]);

  const bloquearBarcos = () => {
    if (barcosColocados) {
      setBarcosBloqueados(true);
    } else {
      console.log('Aún faltan barcos por colocar');
    }
  };

  const verificarBarcosDestruidos = (tablero) => {
    let barcosDestruidos = 0;
    for (let fila = 0; fila < tablero.length; fila++) {
      for (let columna = 0; columna < tablero[fila].length; columna++) {
        const celda = tablero[fila][columna];
        if (celda?.explosion || celda?.icono === IconExplode) {
          barcosDestruidos++;
        }
      }
    }
    return barcosDestruidos === 14;
  };

  useEffect(() => {
    if (juegoTerminado) return;

    const barcosDestruidosJugador = verificarBarcosDestruidos(tableroJugador);
    const barcosDestruidosMaquina = verificarBarcosDestruidos(tableroMaquina);

    if (barcosDestruidosJugador) {
      setGanador('¡Tu oponente ganó la partida!');
      setJuegoTerminado(true);
      setContadorJugador2(contadorJugador2 + 1);
    } else if (barcosDestruidosMaquina) {
      setGanador('¡Ganaste la partida!');
      setJuegoTerminado(true);
      setContadorJugador1(contadorJugador1 + 1);
    }
  }, [tableroJugador, tableroMaquina, juegoTerminado,contadorJugador1, contadorJugador2]);



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
    setBarcosBloqueados(false);
    setTableroMaquina(RandomShip());
    setMovimientosJugador([]);
    setMovimientosMaquina([]);
    setMostrarMensaje([]);
    setMostrarMensaje(false);
    setBotonStartMostrado(true);
    setGanador([])
    setJuegoTerminado(false)
  };




  const handleCellClick = (filaIndex, celdaIndex, tablero) => {
    const celda = tablero[filaIndex][celdaIndex];
    if (barcosBloqueados && turnoJugador && !celda?.atacada) {
      if (!tablero[filaIndex][celdaIndex]?.icono && tablero === tableroMaquina) {
        const nuevoTableroMaquina = [...tablero];
        nuevoTableroMaquina[filaIndex][celdaIndex] = { ...nuevoTableroMaquina[filaIndex][celdaIndex], atacada: true };
        setTableroMaquina(nuevoTableroMaquina);
        setMovimientosJugador([...movimientosJugador, { filaIndex, celdaIndex }]);
        setTimeout(() => {
          const movimientoMaquina = generarCeldaAleatoria();
          setMovimientosMaquina([...movimientosMaquina, movimientoMaquina]);
          setTurnoJugador(true);
        }, 1000);
        setTurnoJugador(false);
      } else if (tablero[filaIndex][celdaIndex]?.icono && tablero === tableroMaquina) {
        const nuevoTableroMaquina = JSON.parse(JSON.stringify(tableroMaquina));
        const celda = nuevoTableroMaquina[filaIndex][celdaIndex];

        if (turnoJugador && celda && celda.icono) {
          nuevoTableroMaquina[filaIndex][celdaIndex] = { ...celda, atacada: true, explosion: true };
          setTableroMaquina(nuevoTableroMaquina);
          setMovimientosJugador([...movimientosJugador, { filaIndex, celdaIndex }]);
          setTurnoJugador(false);
          setTimeout(() => {
            const movimientoMaquina = generarCeldaAleatoria();
            setMovimientosMaquina([...movimientosMaquina, movimientoMaquina]);
            setTurnoJugador(true);
          }, 1000);
        }
      }
    }

  };



  const generarCeldaAleatoria = () => {
    let filaAleatoria, celdaAleatoria;
    const nuevasCeldasSeleccionadas = new Set(celdasSeleccionadas);
    let nuevoTableroJugador = JSON.parse(JSON.stringify(tableroJugador)); 
  
    do {
      filaAleatoria = Math.floor(Math.random() * nuevoTableroJugador.length);
      celdaAleatoria = Math.floor(Math.random() * nuevoTableroJugador[filaAleatoria].length);
    } while (nuevasCeldasSeleccionadas.has(`${filaAleatoria},${celdaAleatoria}`));
  
    if (!nuevoTableroJugador[filaAleatoria][celdaAleatoria]?.icono) {
      nuevoTableroJugador[filaAleatoria][celdaAleatoria] = { atacada: true };
    } else {
      nuevoTableroJugador[filaAleatoria][celdaAleatoria] = { icono: IconExplode };
    }
    setTableroJugador(nuevoTableroJugador);
  
    nuevasCeldasSeleccionadas.add(`${filaAleatoria},${celdaAleatoria}`);
    setCeldasSeleccionadas(nuevasCeldasSeleccionadas);
  
    return { filaIndex: filaAleatoria, celdaIndex: celdaAleatoria };
  };
  


  const letras = Array.from({ length: tableroJugador.length }, (_, index) => String.fromCharCode(65 + index));
  const numeros = Array.from({ length: tableroJugador[0].length }, (_, index) => index + 1);

  

  
  

  return (
    <div className='body-tablero'>
      <div className="contador-ganador">
      <div>
        <GameStatus contadorJugador1={contadorJugador1} contadorJugador2={contadorJugador2}/>
      </div>
    </div>
    <div>
        <Jugadas
          movimientosJugador={movimientosJugador}
          movimientosMaquina={movimientosMaquina}
          letras={letras}
          numeros={numeros}
        />
      </div>
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
            esJugador={esJugador}
            barcosColocados={barcosColocados}
            bloquearBarcos={bloquearBarcos}
            resetTablero={handleResetTablero}
            turno={turnoJugador}
            mostrarMensaje={mostrarMensaje}
            setMostrarMensaje={setMostrarMensaje}
            botonStartMostrado={botonStartMostrado}
            setBotonStartMostrado={setBotonStartMostrado}
            ganador={ganador}
            juegoTerminado={juegoTerminado}
          />
          <div className="contenedor-principal">
            <Letras letras={letras} />
            <div className={`tablero-jugador`}>
              <div className="numeros-jugador">
                <div className="titulo-tablero">Mi tablero</div>
                <Numeros numeros={numeros} esJugador={esJugador} />
              </div>
              <TableroPlayer
                tableroJugador={tableroJugador}
                esJugador={esJugador}
                celdasValidas={celdasValidas}
                celdasInvalidas={celdasInvalidas}
                juegoTerminado={juegoTerminado}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleCellClick={handleCellClick}
                IconExplode={IconExplode}
              />
            </div>
          </div>
          <div className="contenedor-principal">
            <Letras letras={letras} />
            <div className={`tablero-maquina`}>
              <div className="numeros-maquina">
                <div className="titulo-tablero-enemigo">Tablero enemigo</div>
                <Numeros numeros={numeros} esJugador={esJugador} />
              </div>
              <TableroPlayer
                tableroJugador={tableroMaquina}
                esJugador={!esJugador}
                celdasValidas={[]}
                celdasInvalidas={[]}
                juegoTerminado={juegoTerminado}
                handleDragOver={() => { }}
                handleDrop={() => { }}
                handleCellClick={handleCellClick}
                IconExplode={IconExplode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;