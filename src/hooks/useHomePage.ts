import { useNavigate } from 'react-router-dom';

/**
 * @function useHomePage
 * @description This is a hook for the home page.
 * @return.gotoGame - A function to navigate to the Game page.
 */
export function useHomePage() {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate('/scenario');
  };
  

  return {
    goToGame,
  };
};