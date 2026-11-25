import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { saveScore } from '../utils/leaderboardStorage';

interface GameOverLocationState {
  score: number;
  wordsCount: number;
}

export function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameOverLocationState | null;

  const score = state?.score ?? 0;
  const wordsCount = state?.wordsCount ?? 0;

  const [playerName, setPlayerName] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saved || score === 0) return;
    saveScore(playerName, score, wordsCount);
    setSaved(true);
    navigate('/leaderboard');
  };

  return (
    <main className="page-container game-over-container">
      <h1>¡Tiempo agotado!</h1>

      <Link to="/leaderboard" className="nav-link">
          Ver ranking
        </Link>

      <section className="stats-bar">
        <div className="stat-box">
          <span className="stat-label">Puntaje final: </span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Palabras encadenadas: </span>
          <span className="stat-value">{wordsCount}</span>
        </div>
      </section>

      {score > 0 && !saved && (
        <form className="word-form" onSubmit={handleSave}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Tu nombre para el ranking..."
            maxLength={20}
            required
          />
          <button type="submit">Guardar puntaje</button>
        </form>
      )}

      <div className="actions-group">
        <Link to="/" className="btn-primary">
          Volver a jugar
        </Link>
        
      </div>
    </main>
  );
}