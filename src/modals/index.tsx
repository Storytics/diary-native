import React from "react";
import CreateDiaryModal from "modals/CreateDiaryModal";
import MenuModal from "modals/MenuModal";
import DiaryActionsModal from "modals/DiaryActionsModal";

const Modals: React.FC = () => (
  <>
    <CreateDiaryModal />
    <MenuModal />
    <DiaryActionsModal />
  </>
);

export default Modals;
