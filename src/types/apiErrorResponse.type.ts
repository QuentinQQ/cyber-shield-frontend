export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
  [key: string]: any;
}
