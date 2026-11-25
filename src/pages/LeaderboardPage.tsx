import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboard, type ScoreEntry } from '../utils/leaderboardStorage';

export function LeaderboardPage() {
  const [scores] = useState<ScoreEntry[]>(() => getLeaderboard());

  return (
    <main className="page-container">
      <header className="game-header">
        <h1>Top 10 Puntajes</h1>
      </header>

      {scores.length === 0 ? (
        <p className="instruction-hint">
          Todavía no hay puntajes registrados. ¡Jugá una partida para estrenar el ranking!
        </p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>Palabras</th>
              <th>Puntaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.playerName}</td>
                <td>{entry.wordsCount}</td>
                <td>
                  <strong>{entry.score}</strong>
                </td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="actions-group">
        <Link to="/" className="btn-primary">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}