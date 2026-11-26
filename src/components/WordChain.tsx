interface WordChainProps {
    chain: string[];
}

export function WordChain({ chain }: WordChainProps) {
    if (chain.length === 0) return null;

    return (
        <section className="chain-section">
            <h2>Cadena actual: </h2>
            <div className="word-chain">
                {chain.map((word, index) => (
                    <div key={`${word}-${index}`} className="chain-step">
                        <span className="chain-item">{word}</span>
                        {index < chain.length - 1 && ( 
                            <span className="chain-arrow" aria-hidden="true">
                                →
                            </span>
                        )}
                    </div>
                    ))}
            </div>
    </section>
    );
}