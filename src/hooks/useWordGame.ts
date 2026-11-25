import { useState, useEffect } from 'react';
import { validarPalabra } from '../service/api';
import { calcularPuntos, esCadenaValida, fueUsada } from '../utils/gameRules';

export function useWordGame() {
  const [chain, setChain] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);

  useEffect(() => {
    if (!hasStarted || isGameOver) return;

    setTimeLeft(15);

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasStarted, chain.length, isGameOver]);

  const submitWord = async (rawWord: string): Promise<boolean> => {
    if (isValidating || isGameOver) return false;

    const cleanWord = rawWord.trim().toLowerCase();
    if (!cleanWord) return false;

    setErrorMessage('');

    if (!/^[a-záéíóúüñ]+$/i.test(cleanWord)) {
      setErrorMessage('Ingresá una palabra válida sin espacios ni números.');
      return false;
    }

    if (fueUsada(chain, cleanWord)) {
      setErrorMessage('La palabra ya fue utilizada.');
      return false;
    }

    const lastWord = chain[chain.length - 1];
    if (!esCadenaValida(lastWord, cleanWord)) {
      setErrorMessage('La palabra no respeta la regla de encadenamiento.');
      return false;
    }

    setIsValidating(true);

    try {
      const data = await validarPalabra(cleanWord);
      if (data.exists) {
        setChain((prev) => [...prev, cleanWord]);
        setScore((prev) => prev + calcularPuntos(cleanWord));
        setHasStarted(true);
        return true;
      } else {
        setErrorMessage('La palabra no existe en el diccionario.');
        return false;
      }
    } catch {
      setErrorMessage('Error al validar la palabra.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    chain,
    score,
    timeLeft,
    hasStarted,
    isGameOver,
    errorMessage,
    isValidating,
    submitWord,
  };
}