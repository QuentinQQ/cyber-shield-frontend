import React from 'react';
import { CommentData } from '../../types/types';

const CommentCard: React.FC<{
  comment: CommentData;
  onLike: () => void;
  onDislike: () => void;
}> = ({ comment, onLike, onDislike }) => (
  <div className="bg-white/20 p-6 rounded-xl shadow-lg space-y-4">
    <h3 className="text-xl font-bold">{comment.comment_fake_name}</h3>
    <p className="text-lg">{comment.comment_text}</p>
    <div className="flex gap-4 mt-4">
      <button
        onClick={onLike}
        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold"
      >
        👍 Like
      </button>
      <button
        onClick={onDislike}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-lg font-semibold"
      >
        👎 Dislike
      </button>
    </div>
  </div>
);

export default CommentCard;
