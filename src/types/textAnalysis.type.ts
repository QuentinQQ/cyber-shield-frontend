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
  is_bullying: boolean;
  suggested_text: string;
}
