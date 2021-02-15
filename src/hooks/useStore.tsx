import { useContext } from "react";
import { StoreContext, Context } from "context/StoreContext";

const useStore = (): Context => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error(`useStore must be used within a StoreContextProvider.`);
  }
  return context;
};

export default useStore;
