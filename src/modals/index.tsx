import React from "react";
import CreateDiaryModal from "modals/CreateDiaryModal";
import MenuModal from "modals/MenuModal";

const Modals: React.FC = () => {
  return (
    <>
      <CreateDiaryModal />
      <MenuModal />
    </>
  );
};

export default Modals;
