import { useNavigate } from "react-router-dom";

/**
 * Hook for QuizPage logic, such as navigation
 * @returns goToScenario - navigate to the scenario page
 */
export const useQuizPage = () => {
  const navigate = useNavigate();

  /** Navigate to /scenario page */
  const goToScenario = () => {
    navigate("/scenario");
  };

  return { goToScenario };
};