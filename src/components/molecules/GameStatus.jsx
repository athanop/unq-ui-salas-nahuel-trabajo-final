
const GameStatus = ({ contadorJugador1, contadorJugador2 }) => {
  let mensaje = '';

  if (contadorJugador1 > 0 && contadorJugador2 === 0) {
    mensaje = `Ganaste ${contadorJugador1} - Tu oponente aún no ha ganado`;
  } else if (contadorJugador2 > 0 && contadorJugador1 === 0) {
    mensaje = `Aún no ganaste ninguna partida. - Tu oponente ganó ${contadorJugador2}`;
  } else if (contadorJugador1 > 0 && contadorJugador2 > 0) {
    mensaje = `Ganaste ${contadorJugador1} - Tu oponente ganó ${contadorJugador2}`;
  } else {
    mensaje = `Nadie ha ganado una partida aún.`;
  }

  return <p>{mensaje}</p>;
};

export default GameStatus;
