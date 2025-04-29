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
      setError("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, submitText };
};
