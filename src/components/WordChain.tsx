interface WordChainProps {
  chain: string[];
}

export function WordChain({ chain }: WordChainProps) {
  if (chain.length === 0) return null;

  return (
    <section className="chain-section">
      <h2>Cadena actual</h2>
      <ul className="word-chain">
        {chain.map((word, index) => (
          <li key={`${word}-${index}`} className="chain-item">
            {word}
          </li>
        ))}
      </ul>
    </section>
  );
}