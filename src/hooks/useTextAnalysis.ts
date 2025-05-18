import { useState } from "react";
import { AnalyzeResponse } from "@/types/textAnalysis.type";
import { analyzeText } from "@/services/textAnalysisService";

export const useTextAnalysis = () => {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitText = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeText({ text });
      setResult(response);
    } catch (err) {
      console.error("Text analysis error:", err);
      setError("Analysis failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return { result, loading, error, submitText, resetAnalysis };
};
