/**
 * Interface representing the request body to analyze a user text.
 */
export interface AnalyzeRequest {
  text: string;
}

/**
 * Interface representing the API response after analyzing text.
 */
export interface AnalyzeResponse {
  zone: string;
  likelihood: string;
  comment: string;
  suggested_text: string;
  bullying_level: number;
}
