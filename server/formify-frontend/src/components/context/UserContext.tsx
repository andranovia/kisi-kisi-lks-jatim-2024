import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type UserContext = {
  userData: User | undefined;
  setUserData: Dispatch<SetStateAction<User | undefined>>;
};

const userContext = createContext<UserContext | undefined>(undefined);

export const useUserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("wrap parent with provider");
  }
  return context;
};
