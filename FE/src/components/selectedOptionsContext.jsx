import React, { createContext, useState } from "react";

export const SelectedOptionsContext = createContext();

export const SelectedOptionsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <SelectedOptionsContext.Provider value={selectedOptions}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};
