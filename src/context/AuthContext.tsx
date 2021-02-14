import React, { useEffect, useState, createContext } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "libs/supabase";

export interface AuthContextProps {
  session: Session | null;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null,
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
