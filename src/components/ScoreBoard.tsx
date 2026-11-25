interface ScoreBoardProps {
  score: number;
  wordsCount: number;
}

export function ScoreBoard({ score, wordsCount }: ScoreBoardProps) {
  return (
    <>
      <div className="stat-box">
        <span className="stat-label">Puntaje</span>
        <span className="stat-value">{score}</span>
      </div>
      <div className="stat-box">
        <span className="stat-label">Palabras</span>
        <span className="stat-value">{wordsCount}</span>
      </div>
    </>
  );
}