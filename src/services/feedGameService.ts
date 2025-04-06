import axios from 'axios';
import { GameSubmission } from '../types/types';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const fetchComments = () => {
  return axios.get(`${BASE_URL}/api/feed-game/get-all-comments`);
};

export const postGameResult = (submission: GameSubmission[]) => {
  return axios.post(`${BASE_URL}/api/feed-game/submit-answer`, { submission });
};
