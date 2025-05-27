import axios from "axios";
import { GameSubmission, GameResultV2, CommentData } from "../types/types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const fetchComments = () => {
  return axios.get(`${BASE_URL}/api/feed-game/get-all-comments`);
};

export const fetchCommentsV2 = () => {
  return axios.get(`${BASE_URL}/api/feed-game/get-all-comments-v2`);
};

export const postGameResult = (submission: GameSubmission[]) => {
  return axios.post(`${BASE_URL}/api/feed-game/submit-answer`, { submission });
};

export const postGameResultV2 = (
  submission: GameSubmission[]
): Promise<GameResultV2> => {
  return axios
    .post(`${BASE_URL}/api/feed-game/submit-answer-v2`, { submission })
    .then((response) => response.data as GameResultV2);
};


export const fetchCommentsWithSession = (): Promise<{
  comments: CommentData[];
  session_id: string;
  total_questions: number;
}> => {
  return axios
    .get(`${BASE_URL}/api/feed-game/comments`, {
      withCredentials: true,
    })
    .then((response) => response.data);
};

export const postGameResultV2WithSession = (
  submission: GameSubmission[]
): Promise<GameResultV2> => {
  return axios
    .post(
      `${BASE_URL}/api/feed-game/submit-v2`,
      { submission },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data);
};


axios.defaults.withCredentials = true;