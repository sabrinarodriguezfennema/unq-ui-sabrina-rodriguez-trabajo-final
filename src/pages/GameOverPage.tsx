import { Link } from 'react-router-dom';

export function GameOverPage() {
  return (
    <main className="page-container">
      <h1>Fin de la partida</h1>
      <Link to="/" className="btn-primary">
        Volver a jugar
      </Link>
    </main>
  );
}