import React, { useCallback, useState } from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import CustomHeaderWebView from "components/CustomHeaderWebView";
import CustomSafeArea from "components/CustomSafeArea";
import OverlaySpinner from "components/OverlaySpinner";
// Utils
import { billingUrl } from "utils/constants";
// Types
import { BillingNavigationProps } from "types/navigation";
// Locales
import i18n from "locales/index";
import { WebViewMessageEvent } from "react-native-webview";
// Styles
import { Overlay } from "./styles";

const injectScript = `
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.ReactNativeWebView.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;

const Billing: React.FC<BillingNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoading = useCallback((state: boolean) => {
    setTimeout(() => {
      setIsLoading(state);
    }, 2000);
  }, []);

  const onMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    console.log("onMessage data = ", data);
  };

  const renderHeader = () => (
    <Header
      hasBackButton
      onPress={() => {
        navigation.navigate("Home");
      }}
      text={i18n.t("billing.section.title")}
    />
  );

  return (
    <CustomSafeArea>
      <Container>
        {isLoading && (
          <Overlay>
            {renderHeader()}
            <OverlaySpinner />
          </Overlay>
        )}
        {renderHeader()}
        <CustomHeaderWebView
          source={{
            uri: billingUrl,
            headers: {
              "x-dia-native-user-id": "123",
            },
          }}
          onLoad={() => onLoading(false)}
          onError={() => onLoading(false)}
          injectedJavaScript={injectScript}
          onMessage={onMessage}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default Billing;
