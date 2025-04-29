import axios, { AxiosResponse } from "axios";
import { AnalyzeRequest, AnalyzeResponse } from "@/types/textAnalysis.type";
import { handleApiError } from "@/utils/handleApiError";

/**
 * Analyzes a piece of user-submitted text by sending it to the backend API.
 * The backend will forward this request to an anti-bullying model
 * and return whether the text is considered bullying, along with suggestions.
 *
 * @param {AnalyzeRequest} payload - The text to be analyzed.
 * @returns {Promise<AnalyzeResponse>} - Contains the analysis result including bullying flag and suggested text.
 * @throws {Error} If the request fails or returns a non-2xx status.
 */
export const analyzeText = async (
  payload: AnalyzeRequest
): Promise<AnalyzeResponse> => {
  try {
    // Send POST request to backend proxy endpoint
    const response: AxiosResponse<AnalyzeResponse> = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/text-checker/analyze`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // Need longer timeout for backend processing
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};
