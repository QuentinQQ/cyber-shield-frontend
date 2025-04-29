import React from "react";
import { AnalyzeResponse } from "@/types/textAnalysis.type";

interface Props {
  result: AnalyzeResponse;
}

const AnalysisResult: React.FC<Props> = ({ result }) => {
  return (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      {result.is_bullying ? (
        <>
          <p className="text-red-600 font-bold">⚠️ Bullying detected!</p>
          {result.suggested_text && (
            <p className="mt-2 italic text-sm">
              Try saying: <span className="text-blue-600">{result.suggested_text}</span>
            </p>
          )}
        </>
      ) : (
        <p className="text-green-600">✅ Great! Your message looks friendly.</p>
      )}
    </div>
  );
};

export default AnalysisResult;
