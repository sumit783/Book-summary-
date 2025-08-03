import React, { useState, useEffect } from 'react';
import { getCommentsByBook, createComment } from '@/services/api';

const reactions = [
  { label: '😢', value: 1 },
  { label: '🙁', value: 2 },
  { label: '😐', value: 3 },
  { label: '🙂', value: 4 },
  { label: '😄', value: 5 },
];

interface UserType {
  _id: string;
  username: string;
  email: string;
}

interface CommentType {
  _id: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
}

// Accept bookId as a prop
interface CommentProps {
  bookId: string;
}

const Comment: React.FC<CommentProps> = ({ bookId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [input, setInput] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getCommentsByBook(bookId);
      setComments(res.data.comments);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) fetchComments();
  }, [bookId]);

  const handleAddComment = async () => {
    if (input.trim() && selectedReaction) {
      try {
        await createComment({ bookId, rating: selectedReaction, comment: input });
        setInput('');
        setSelectedReaction(null);
        fetchComments();
      } catch (err) {
        // handle error
      }
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
        {loading ? (
          <div className="text-gray-500">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-500">No comments yet.</div>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex flex-col gap-1 p-2 border rounded">
              <div className="flex items-center gap-2">
                <span className="text-xl">{reactions.find(r => r.value === c.rating)?.label}</span>
                <span className="font-semibold text-black dark:text-white">{c.user?.username}</span>
                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <span className="text-black dark:text-white ml-7">{c.comment}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment; 