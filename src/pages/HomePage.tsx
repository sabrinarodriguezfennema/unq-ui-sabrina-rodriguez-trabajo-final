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
          ? `Encadená palabras usando la última letra de la anterior antes de que se acabe el tiempo`
          : 'Ingresá cualquier palabra válida en español para comenzar'}
      </p>

      {chain.length === 0 && (
        <section className="chain-section example-section">
          <h2>Ejemplo de cadena:</h2>
          <div className="word-chain">
            <div className="chain-step">
              <span className="chain-item">
                cas<strong>a</strong>
              </span>
              <span className="chain-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <div className="chain-step">
              <span className="chain-item">
                <strong>a</strong>rbo<strong>l</strong>
              </span>
              <span className="chain-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <div className="chain-step">
              <span className="chain-item">
                <strong>l</strong>un<strong>a</strong>
              </span>
              <span className="chain-arrow" aria-hidden="true">
                →
              </span>
            </div>
            <div className="chain-step">
              <span className="chain-item">
                <strong>a</strong>vión
              </span>
            </div>
          </div>
        </section>
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