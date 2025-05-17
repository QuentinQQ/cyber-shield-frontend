import { useEffect, useRef, useState } from 'react';
import { CommentData, GameSubmission } from '@/types/types';

/**
 * @function useGameController
 * @description
 * Custom hook that manages the internal state of the feed game:
 * - tracks the current comment index,
 * - records each user's like/dislike response,
 * - measures response time,
 * - and triggers a callback when the game ends.
 *
 * @param {CommentData[]} comments - The list of comments to iterate through.
 * @param {(submissions: GameSubmission[]) => void} onFinish - Callback to execute when the game finishes.
 *
 * @returns {{
 *   currentComment: CommentData,
 *   nextComment: CommentData | undefined,
 *   handleResponse: (response_status: 'like' | 'dislike') => void
 * }} Returns the current comment, next comment, and a function to record user responses.
 *
 * @sideEffect Sets up a 60-second timer to auto-finish the game.
 */
export function useGameController(comments: CommentData[], onFinish: (submissions: GameSubmission[]) => void) {
  const [current, setCurrent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const submissionsRef = useRef<GameSubmission[]>([]);

  useEffect(() => {
    setStartTime(Date.now());
    const timeout = setTimeout(() => onFinish(submissionsRef.current), 15000);
    return () => clearTimeout(timeout);
  }, []);

  /**
   * @function handleResponse
   * @description
   * Handles the user's action (like/dislike) for the current comment,
   * records the response time, and advances to the next comment.
   * Triggers the `onFinish` callback if this is the last comment.
   *
   * @param {'like' | 'dislike'} response_status - The user's response action.
   * @returns {void}
   */
  const handleResponse = (response_status: 'like' | 'dislike') => {
    const now = Date.now();
    const response_time = now - startTime;
    const currentComment = comments[current];

    submissionsRef.current.push({
      comment_id: currentComment.comment_id,
      response_status,
      response_time,
    });

    setStartTime(Date.now());
    if (current < comments.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish(submissionsRef.current);
    }
  };

  return {
    currentComment: comments[current],
    nextComment: current < comments.length - 1 ? comments[current + 1] : undefined,
    handleResponse,
  };
}
