import React, { useEffect, useState } from 'react';
import { CommentData, GameSubmission } from '../../types/types';
import CommentCard from './CommentCard';
import Timer from './Timer';

const GameScreen: React.FC<{
  comments: CommentData[];
  onFinish: (submissions: GameSubmission[]) => void;
}> = ({ comments, onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [submissions, setSubmissions] = useState<GameSubmission[]>([]);

  useEffect(() => {
    setStartTime(Date.now());
    const timeout = setTimeout(() => onFinish(submissions), 60000);
    return () => clearTimeout(timeout);
  }, []);

  const handleResponse = (response_status: 'like' | 'dislike') => {
    const now = Date.now();
    const response_time = now - startTime;
    const currentComment = comments[current];

    setSubmissions((prev) => [
      ...prev,
      {
        comment_id: currentComment.comment_id,
        response_status,
        response_time,
      },
    ]);

    setStartTime(Date.now());
    if (current < comments.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish(submissions);
    }
  };

  return (
    <div className="space-y-6">
      <Timer duration={60} />
      <CommentCard
        comment={comments[current]}
        onLike={() => handleResponse('like')}
        onDislike={() => handleResponse('dislike')}
      />
    </div>
  );
};

export default GameScreen;
