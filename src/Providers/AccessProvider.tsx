import React, { useContext, createContext, useState } from "react";

const AccessContext = createContext<{
  access: boolean;
  setAccess: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  access: false,
  setAccess: () => {},
});

export const useAccess = () => useContext(AccessContext);

export const AccessProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [access, setAccess] = useState(false);

  return (
    <AccessContext.Provider value={{ access, setAccess }}>
      {children}
    </AccessContext.Provider>
  );
};
