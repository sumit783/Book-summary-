import React from 'react';

const reactions = [
  { label: '😢', value: 1 },
  { label: '🙁', value: 2 },
  { label: '😐', value: 3 },
  { label: '🙂', value: 4 },
  { label: '😄', value: 5 },
];

interface ReactionProps {
  value: number | null;
  onChange: (value: number) => void;
}

const Reaction: React.FC<ReactionProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {reactions.map(r => (
        <button
          key={r.value}
          className={`text-2xl px-2 py-1 rounded-full border ${value === r.value ? 'bg-blue-200 dark:bg-blue-700' : ''}`}
          onClick={() => onChange(r.value)}
          type="button"
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};

export default Reaction; 