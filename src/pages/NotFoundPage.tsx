import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="page-container not-found-container">
      <header className="game-header">
        <h1>Ruta no encontrada</h1>
      </header>

      <p className="instruction-hint">
        Esta página no existe en la cadena.
      </p>

      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}