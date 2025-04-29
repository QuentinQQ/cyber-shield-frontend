import { useState } from "react";
import { useTextAnalysis } from "@/hooks/useTextAnalysis";
import AnalysisResult from "@/components/textAnalysis/AnalysisResult";

const TextCheckerPage = () => {
  const [text, setText] = useState("");
  const { result, loading, error, submitText } = useTextAnalysis();

  const handleSubmit = () => {
    if (text.trim()) {
      submitText(text);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Anti-Bullying Text Checker</h1>

      <textarea
        className="w-full h-32 p-3 border rounded resize-none"
        placeholder="Enter your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Text"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && <AnalysisResult result={result} />}
    </div>
  );
};

export default TextCheckerPage;
