import axios from "axios";
import { GameSubmission, GameResultV2 } from "../types/types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const fetchComments = () => {
  return axios.get(`${BASE_URL}/api/feed-game/get-all-comments`);
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
