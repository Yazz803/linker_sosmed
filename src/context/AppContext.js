import React, { createContext, useContext, useMemo, useReducer } from "react";

import { AppReducer, initialState } from "../reducer/AppReducer";

const AppContext = createContext();
const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };

export function useAppContext() {
  return useContext(AppContext);
}
