// AbortControllerContext.js
import { createContext, useContext } from 'react';

export const AbortControllerContext = createContext(null);

export const useAbortController = () => {
  const context = useContext(AbortControllerContext);
  if (!context) throw new Error("useAbortController must be used within AbortControllerContext.Provider");
  return context;
};
