import React, { createContext, useContext, useState, useEffect } from 'react';

const BackdropContext = createContext();

export function BackdropProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);

  const requestBackdrop = () => setRequestCount((prev) => prev + 1);
  const releaseBackdrop = () => setRequestCount((prev) => Math.max(0, prev - 1));

  // If ANY component requests the backdrop, it is visible.
  const isBackdropVisible = requestCount > 0;

  return (
    <BackdropContext.Provider value={{ isBackdropVisible, requestBackdrop, releaseBackdrop }}>
      {children}
    </BackdropContext.Provider>
  );
}

export function useBackdropContext() {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error('useBackdropContext must be used within a BackdropProvider');
  }
  return context;
}

// A simple declarative trigger component. 
// Mount this in your EmptyState or SuccessState to show the backdrop.
export function BackdropTrigger() {
  const { requestBackdrop, releaseBackdrop } = useBackdropContext();

  useEffect(() => {
    requestBackdrop();
    return () => {
      releaseBackdrop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render any DOM elements itself
}
