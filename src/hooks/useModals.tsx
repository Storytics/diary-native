import { useContext } from "react";
import { ModalsContext } from "context/ModalsContext";
import { Context } from "types/modals";

const useModals = (): Context => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error(`useModals must be used within a ModalsContextProvider.`);
  }
  return context;
};

export default useModals;
