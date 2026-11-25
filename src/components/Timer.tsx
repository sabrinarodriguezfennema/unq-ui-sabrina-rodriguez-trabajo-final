interface TimerProps {
  timeLeft: number;
  hasStarted: boolean;
}

export function Timer({ timeLeft, hasStarted }: TimerProps) {
  const isWarning = hasStarted && timeLeft <= 5;

  return (
    <div className={`stat-box ${isWarning ? 'timer-warning' : ''}`}>
      <span className="stat-label">Tiempo</span>
      <span className="stat-value">{timeLeft}s</span>
    </div>
  );
}