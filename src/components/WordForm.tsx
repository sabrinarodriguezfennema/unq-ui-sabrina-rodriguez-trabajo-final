import { useState } from 'react';

interface WordFormProps {
  nextLetter: string | null;
  isValidating: boolean;
  disabled: boolean;
  onSubmitWord: (word: string) => Promise<boolean>;
}

export function WordForm({
  nextLetter,
  isValidating,
  disabled,
  onSubmitWord,
}: WordFormProps) {
  const [input, setInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidating || disabled) return;
    const isValid = await onSubmitWord(input);
    if (isValid) {
      setInput('');
    }
  };

  return (
    <form className="word-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          nextLetter
            ? `Palabra con "${nextLetter}"...`
            : 'Escribí la primera palabra...'
        }
        disabled={isValidating || disabled}
        autoFocus
      />
      <button type="submit" disabled={isValidating || disabled}>
        {isValidating ? 'Validando...' : 'Enviar'}
      </button>
    </form>
  );
} 