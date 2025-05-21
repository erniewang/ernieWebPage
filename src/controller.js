import React, { createContext, useRef, useContext } from "react";

const ControllerContext = createContext(null);
function ControllerProvider({ children }) {
  const controllerRef = useRef();
  return (
    <ControllerContext.Provider value={controllerRef}>
      {children}
    </ControllerContext.Provider>
  );
}

function useControllerRef() {
  return useContext(ControllerContext);
}

export {ControllerProvider, useControllerRef};