import { useContext } from "react";
import { StoreContext } from "context/StoreContext";
import { Context } from "types/store";

const useStore = (): Context => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error(`useStore must be used within a StoreContextProvider.`);
  }
  return context;
};

export default useStore;
