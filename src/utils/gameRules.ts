const quitarTildes = (texto: string): string => {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
};

export const calcularPuntos = (word: string): number => {
  return word.trim().length;
};

export const esCadenaValida = (
  lastWord: string | undefined,
  currentWord: string
): boolean => {
  if (!lastWord) return true;
  const lastChar = quitarTildes(lastWord).slice(-1);
  const firstChar = quitarTildes(currentWord).charAt(0);
  return lastChar === firstChar;
};

export const fueUsada = (history: string[], word: string): boolean => {
  const normalizada = quitarTildes(word);
  return history.some((w) => quitarTildes(w) === normalizada);
};

export const obtenerProximaLetra = (lastWord: string | undefined): string | null => {
  if (!lastWord) return null;
  return quitarTildes(lastWord).slice(-1).toUpperCase();
};