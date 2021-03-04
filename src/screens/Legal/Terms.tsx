import React from "react";
// Types
import { TermsNavigationProps, LegalType } from "types/navigation";
// Components
import ManagerWebView from "./ManagerWebView";

const TermsScreen: React.FC<TermsNavigationProps> = (props) => (
  <ManagerWebView page={LegalType.terms} {...props} />
);

export default TermsScreen;
