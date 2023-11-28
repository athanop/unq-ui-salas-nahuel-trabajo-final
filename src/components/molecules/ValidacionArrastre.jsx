import { useEffect } from 'react';

const ValidacionArrastre = ({
  esJugador,
  fichaArrastrada,
  orientacionIconos,
  filaIndex,
  celdaIndex,
  tableroJugador,
  setCeldasValidas,
  setCeldasInvalidas,
}) => {

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();

      if (!esJugador || !fichaArrastrada) return;

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

    document.addEventListener('dragover', handleDragOver);
    return () => {
      document.removeEventListener('dragover', handleDragOver);
    };
  }, [
    esJugador,
    fichaArrastrada,
    orientacionIconos,
    filaIndex,
    celdaIndex,
    tableroJugador,
    setCeldasValidas,
    setCeldasInvalidas,
  ]);

  return null; 
};

export default ValidacionArrastre;
