import { useContext } from "react";
import { EditorContext } from "context/EditorContext";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUpStampsContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("EditorContext must be used with EditorProvider!");
  }
  return context;
};

export default useUpStampsContext;
