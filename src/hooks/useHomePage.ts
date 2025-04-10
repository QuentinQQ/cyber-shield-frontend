import { useNavigate } from 'react-router-dom';

/**
 * @function useHomePage
 * @description This is a hook for the home page.
 * @return.gotoQuiz - A function to navigate to the quiz page.
 */
export function useHomePage() {
  const navigate = useNavigate();

  const goToQuiz = () => {
    navigate('/quiz');
  };
  

  return {
    goToQuiz,
  };
};