export interface ScoreEntry {
  id: string;
  playerName: string;
  score: number;
  wordsCount: number;
  date: string;
}

const STORAGE_KEY = 'palabras_encadenadas_leaderboard';

export const getLeaderboard = (): ScoreEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScoreEntry[];
    return parsed.sort((a, b) => b.score - a.score).slice(0, 10);
  } catch {
    return [];
  }
};

export const saveScore = (
  playerName: string,
  score: number,
  wordsCount: number
): ScoreEntry[] => {
  const current = getLeaderboard();
  const newEntry: ScoreEntry = {
    id: crypto.randomUUID(),
    playerName: playerName.trim() || 'Anónimo',
    score,
    wordsCount,
    date: new Date().toLocaleDateString('es-AR'),
  };

  const updated = [...current, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};