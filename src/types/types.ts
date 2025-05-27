export interface CommentData {
  comment_id: number;
  comment_text: string;
  comment_fake_name: string;
}

export interface GameSubmission {
  comment_id: number;
  response_status: 'like' | 'dislike';
  response_time: number;
}

export interface GameResult {
  score: number;
  answered: number;
  answered_correct: number;
  percent: string;
  submission_id: number;
  comparison: string;
}

export interface GameResultV2 {
  mistakes: [string, string][];// Array of tuples with [comment_text, is_bullying]
  problem: string;
  summary: string;
  score: number;
  answered: number;
  answered_cor: number;
  percent: string;
  submission_id: number;
  comparison: string;
}
