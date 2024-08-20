import { createContext, useEffect, useState } from 'react';

export const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={windowWidth}>
      {children}
    </ResponsiveContext.Provider>
  );
};
