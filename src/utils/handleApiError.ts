import axios from "axios";
import { ApiErrorResponse } from "@/types/apiErrorResponse.type";

/**
 * Converts an unknown error (e.g. from Axios or network) into a standardized Error object.
 * 
 * @param error - The error caught from try-catch block, possibly unknown type.
 * @returns An Error instance with clean and informative message.
 */
export function handleApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const apiData = error.response?.data;

    if (
      apiData &&
      typeof apiData === "object" &&
      "message" in apiData &&
      typeof apiData.message === "string"
    ) {
      const typedError = apiData as ApiErrorResponse;
      return new Error(typedError.message);
    }

    return new Error(error.message || "Unknown API error");
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Unexpected error occurred");
}
