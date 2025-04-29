import { useState } from "react";
import { useTextAnalysis } from "@/hooks/useTextAnalysis";
import AnalysisResult from "@/components/textAnalysis/AnalysisResult";
import PageWrapper from "@/components/PageWrapper";
import { validateTextInput } from "@/utils/inputValidation";

/**
 * TextCheckerPage
 *
 * A page where users (especially kids) can enter a message and check whether it's friendly.
 * If bullying is detected, the app suggests a kinder way to express it.
 *
 * @component
 * @returns A styled input page with real-time bullying feedback.
 */
const TextCheckerPage = () => {
  // State to hold the user input
  const [text, setText] = useState<string>("");
  const [inputValidationError, setInputValidationError] = useState<
    string | null
  >(null);

  // ViewModel hook that handles text submission and analysis result
  const { result, loading, error, submitText } = useTextAnalysis();

  /**
   * Handle form submission.
   * Only submits if the input text is non-empty after trimming.
   *
   * @function
   * @returns void
   */
  const handleSubmit = (): void => {
    const validationError = validateTextInput(text);

    if (validationError) {
      setInputValidationError(validationError);
      return;
    }
    setInputValidationError(null);
    submitText(text);
  };

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
      <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
        <div className="w-full max-w-xl bg-white text-black rounded-2xl shadow-xl p-8">
          {/* Page title */}
          <h1 className="text-2xl font-bold mb-6 text-center">
            Is your message kind? Let’s check together!
          </h1>

          {/* Message input box */}
          <textarea
            className="w-full h-32 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Input validation error display */}
          {inputValidationError && (
            <p className="text-red-500 mt-2 text-sm text-center">
              {inputValidationError}
            </p>
          )}

          {/* Submission button */}
          <button
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Text"}
          </button>

          {/* Error message display */}
          {error && (
            <p className="text-red-500 mt-4 text-sm text-center">{error}</p>
          )}

          {/* Analysis result display */}
          {result && <AnalysisResult result={result} />}
        </div>
      </div>
    </PageWrapper>
  );
};

export default TextCheckerPage;
