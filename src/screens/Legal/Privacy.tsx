import React from "react";
// Types
import { PrivacyNavigationProps, LegalType } from "types/navigation";
// Components
import ManagerWebView from "./ManagerWebView";

const PrivacyScreen: React.FC<PrivacyNavigationProps> = (props) => (
  <ManagerWebView page={LegalType.privacy} {...props} />
);

export default PrivacyScreen;
