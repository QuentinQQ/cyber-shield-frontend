import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTextAnalysis } from "@/hooks/useTextAnalysis";
import AnalysisResult from "@/components/textAnalysis/AnalysisResult";
import PageWrapper from "@/components/PageWrapper";
import { TeleportBubble } from "@/components/TeleportBubble";
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
  const navigate = useNavigate();
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

  // Navigation handler for both teleport bubbles
  const handleTeleportNext = () => {
    navigate("/get-help");
  };

  const handleTeleportBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white p-4"
      style={{ backgroundImage: "url(ai-background.png)" }}
    >
      <PageWrapper>
        <div className="flex items-start pt-28 justify-start min-h-[calc(100vh-2rem)]">
          {/* Improved space-themed container */}
          <div 
            className="w-full max-w-xl rounded-2xl shadow-xl p-8 ml-136 overflow-hidden relative"
            style={{
              background: "linear-gradient(to bottom, #191970, #483D8B)",
              border: "1px solid rgba(138, 43, 226, 0.4)",
              boxShadow: "0 0 30px rgba(138, 43, 226, 0.3), inset 0 0 20px rgba(148, 0, 211, 0.2)"
            }}
          >
            {/* Cosmic elements */}
            <div 
              className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-60"
              style={{ 
                background: "radial-gradient(circle, rgba(255,223,0,1) 0%, rgba(240,120,0,0.5) 50%, rgba(240,0,0,0) 100%)",
                boxShadow: "0 0 20px rgba(255,223,0,0.7)"
              }}
            ></div>
            <div 
              className="absolute top-0 right-0 left-0 h-1"
              style={{ 
                background: "linear-gradient(90deg, transparent, rgba(148, 0, 211, 0.8), transparent)"
              }}
            ></div>
            
            {/* Page title - keeping your original but with space styling */}
            <h1 
              className="text-2xl font-bold mb-6 text-center relative"
              style={{ 
                color: "#E6E6FA",
                textShadow: "0 0 10px rgba(138, 43, 226, 0.7)"
              }}
            >
              Is your message kind? Let's check together!
            </h1>

            {/* Message input box - space themed but preserving your structure */}
            <div className="relative">
              <textarea
                className="w-full h-32 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  background: "rgba(25, 25, 112, 0.3)",
                  border: "1px solid rgba(138, 43, 226, 0.4)",
                  color: "#E6E6FA",
                  backdropFilter: "blur(4px)"
                }}
              />
              
              {/* Scanner line animation */}
              <div 
                className="absolute inset-x-0 h-1 pointer-events-none" 
                style={{
                  top: "0",
                  background: "linear-gradient(90deg, transparent, #9370DB, transparent)",
                  animation: "scanline 2s linear infinite",
                  opacity: 0.7
                }}
              ></div>
            </div>

            {/* Input validation error display - keeping structure */}
            {inputValidationError && (
              <p className="mt-2 text-sm text-center" style={{ color: "#FF6B6B" }}>
                {inputValidationError}
              </p>
            )}

            {/* Submission button - styled like PrimaryButton */}
            <div className="relative mt-4">
              {/* Shadow beneath the button */}
              <div 
                className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
                style={{
                  animation: "shadowMove 2s infinite alternate",
                  width: "90%",
                  marginLeft: "5%"
                }}
              />
              
              <button
                className="relative font-bold rounded-full px-8 py-4 shadow-lg z-10 w-full
                           bg-[#C2E764] text-black"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  animation: loading ? "" : "buttonBounce 1.2s infinite ease-in-out",
                  transform: loading ? "scale(0.95)" : "scale(1)"
                }}
              >
                {loading ? "Checking..." : "Check Text"}
                
                {/* Ring orbits */}
                <div
                  className="absolute inset-0 border-2 border-black/10 rounded-full"
                  style={{
                    animation: "ringPulse1 3s infinite"
                  }}
                />
                <div
                  className="absolute inset-0 border-2 border-black/5 rounded-full"
                  style={{
                    animation: "ringPulse2 3s infinite",
                    animationDelay: "0.2s"
                  }}
                />
              </button>
            </div>

            {/* Error message display - keeping structure */}
            {error && (
              <p className="mt-4 text-sm text-center" style={{ color: "#FF6B6B" }}>
                {error}
              </p>
            )}

            {/* Analysis result display - keeping structure */}
            {result && <AnalysisResult result={result} />}
          </div>
        </div>
        
        {/* Both Teleport Bubbles */}
        <TeleportBubble onClick={handleTeleportNext} color="blue" position="right" text="Get Help" />
        <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" text="Back" />
      </PageWrapper>
      
      {/* Add CSS for animations */}
      <style>{`
        @keyframes scanline {
          0% { top: 0% }
          100% { top: 100% }
        }
        @keyframes buttonBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shadowMove {
          0% { width: 90%; left: 5%; }
          100% { width: 60%; left: 20%; }
        }
        @keyframes ringPulse1 {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes ringPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
      `}</style>
    </div>

  );
};

export default TextCheckerPage;