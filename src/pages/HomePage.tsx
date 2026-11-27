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
    isReady,
    startGame,
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
        <Link to="/leaderboard" className="nav-link">
        Ranking
      </Link>
        <h1>Palabras Encadenadas</h1>
      </header>

      {!isReady ? (
        <>
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
          <div className="actions-group">
            <button
              type="button"
              className="btn-primary"
              onClick={startGame}
            >
              Comenzar a jugar
            </button>
          </div>
        </>) : (<>
          <section className="stats-bar">
            <Timer timeLeft={timeLeft} hasStarted={hasStarted} />
            <ScoreBoard score={score} wordsCount={chain.length} />
          </section>

          <p className="instruction-hint">
            {nextLetter
              ? '¡Seguí encadenando! Palabras más largas suman más puntos'
              : 'Ingresá una palabra en español para iniciar el tiempo'}
          </p>

          <WordForm
            nextLetter={nextLetter}
            isValidating={isValidating}
            disabled={isGameOver}
            onSubmitWord={submitWord}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <WordChain chain={chain} />
        </>)
      }
    </main>
  );
}