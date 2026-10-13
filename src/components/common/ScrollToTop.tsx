import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * ScrollToTop ensures the window scrolls to the top whenever
 * the route pathname changes in React Router.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
