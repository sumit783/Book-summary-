import React, { useState } from 'react';

const reactions = [
  { label: '😢', value: 1 },
  { label: '🙁', value: 2 },
  { label: '😐', value: 3 },
  { label: '🙂', value: 4 },
  { label: '😄', value: 5 },
];

interface CommentType {
  text: string;
  reaction: number;
}

const Comment: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [input, setInput] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<number | null>(null);

  const handleAddComment = () => {
    if (input.trim() && selectedReaction) {
      setComments([...comments, { text: input, reaction: selectedReaction }]);
      setInput('');
      setSelectedReaction(null);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-gray-900">
      <h3 className="font-semibold mb-2">Comments</h3>
      <div className="mb-4 flex flex-col gap-2">
        <textarea
          className="border rounded p-2 w-full resize-none text-black dark:text-white"
          rows={2}
          placeholder="Add a comment..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          {reactions.map(r => (
            <button
              key={r.value}
              className={`text-2xl px-2 py-1 rounded-full border ${selectedReaction === r.value ? 'bg-blue-200 dark:bg-blue-700' : ''}`}
              onClick={() => setSelectedReaction(r.value)}
              type="button"
            >
              {r.label}
            </button>
          ))}
          <button
            className="ml-auto bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleAddComment}
            disabled={!input.trim() || !selectedReaction}
            type="button"
          >
            Post
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
        {comments.map((c, i) => (
          <div key={i} className="flex items-center gap-2 p-2 border rounded">
            <span className="text-xl">{reactions.find(r => r.value === c.reaction)?.label}</span>
            <span className="text-black dark:text-white">{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment; 