import IconPortaAviones from '../atoms/portaaviones.png';
import IconCrucero from '../atoms/crucero.png';
import IconLancha from '../atoms/lancha.png';
import IconSubmarino from '../atoms/submarino.png';

const RandomShip = () => {
  const generateRandomShips = () => {
    const nuevoTablero = Array.from({ length: 10 }, () => Array(10).fill(null));

    const fichas = [
      { icono: IconPortaAviones, agujeros: 5 },
      { icono: IconCrucero, agujeros: 4 },
      { icono: IconLancha, agujeros: 2 },
      { icono: IconSubmarino, agujeros: 3 },
    ];

    fichas.forEach((ficha) => {
      let colocada = false;

      while (!colocada) {
        const filaIndex = Math.floor(Math.random() * 10);
        const celdaIndex = Math.floor(Math.random() * 10);
        const orientacion = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        const maxFilaIndex =
          orientacion === 'horizontal' ? filaIndex : filaIndex + ficha.agujeros - 1;
        const maxCeldaIndex =
          orientacion === 'horizontal' ? celdaIndex + ficha.agujeros - 1 : celdaIndex;

        if (maxFilaIndex < 10 && maxCeldaIndex < 10) {
          let valido = true;
          for (let i = filaIndex; i <= maxFilaIndex; i++) {
            for (let j = celdaIndex; j <= maxCeldaIndex; j++) {
              if (nuevoTablero[i][j] !== null) {
                valido = false;
                break;
              }
            }
            if (!valido) break;
          }

          if (valido) {
            for (let i = filaIndex; i <= maxFilaIndex; i++) {
              for (let j = celdaIndex; j <= maxCeldaIndex; j++) {
                nuevoTablero[i][j] = { icono: ficha.icono };
              }
            }
            colocada = true;
          }
        }
      }
    });
    return nuevoTablero;
  };

  return generateRandomShips();
};

export default RandomShip;
