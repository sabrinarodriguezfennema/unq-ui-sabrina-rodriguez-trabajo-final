import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="page-container">
      <header className="game-header">
        <h1>Palabras Encadenadas</h1>
        <Link to="/leaderboard" className="nav-link">
          Ranking
        </Link>
      </header>
      <p>Pantalla de juego </p>
    </main>
  );
}