import { useContext } from "react";
import { AuthContext, AuthContextProps } from "context/AuthContext";

export const useSession = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
