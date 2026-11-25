import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWordGame } from '../hooks/useWordGame';
import { obtenerProximaLetra } from '../utils/gameRules';
import { Timer } from '../components/Timer';
import { ScoreBoard } from '../components/ScoreBoard';
import { WordForm } from '../components/WordForm';
import { WordChain } from '../components/WordChain';

export function HomePage() {
  const navigate = useNavigate();
  const {
    chain,
    score,
    timeLeft,
    hasStarted,
    isGameOver,
    errorMessage,
    isValidating,
    submitWord,
  } = useWordGame();

  const nextLetter = obtenerProximaLetra(chain[chain.length - 1]);

  useEffect(() => {
    if (isGameOver) {
      navigate('/game-over', {
        state: { score, wordsCount: chain.length },
      });
    }
  }, [isGameOver, navigate, score, chain.length]);

  return (
    <main className="page-container">
      <header className="game-header">
        <h1>Palabras Encadenadas</h1>
        <Link to="/leaderboard" className="nav-link">
          Ranking
        </Link>
      </header>

      <section className="stats-bar">
        <Timer timeLeft={timeLeft} hasStarted={hasStarted} />
        <ScoreBoard score={score} wordsCount={chain.length} />
      </section>

      <p className="instruction-hint">
        {nextLetter
          ? `Ingresá una palabra que empiece con "${nextLetter}"`
          : 'Ingresá cualquier palabra válida en español para comenzar'}
      </p>

      {chain.length === 0 && (
        <div className="game-example">
          <p>
            <strong>Ejemplo de cadena:</strong>
          </p>
          <p>
            cas<strong>a</strong> → <strong>a</strong>rbo<strong>l</strong> →{' '}
            <strong>l</strong>un<strong>a</strong> → <strong>a</strong>vión
          </p>
        </div>
      )}

      <WordForm
        nextLetter={nextLetter}
        isValidating={isValidating}
        disabled={isGameOver}
        onSubmitWord={submitWord}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <WordChain chain={chain} />
    </main>
  );
}