import { Link } from 'react-router-dom';

export function LeaderboardPage() {
  return (
    <main className="page-container">
      <h1>Top 10 Puntajes</h1>
      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}