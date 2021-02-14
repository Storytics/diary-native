import { useContext } from "react";
import { AuthContext, AuthContextProps } from "context/AuthContext";

export const useSession = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useSession must be used within a AuthContextProvider.`);
  }
  return context;
};
