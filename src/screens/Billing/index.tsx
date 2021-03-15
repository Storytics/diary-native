import React, { useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
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

const Billing: React.FC<BillingNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const onMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    if (data !== undefined && data !== null) {
      if (data.includes("diary/privacy")) {
        navigation.navigate("Privacy");
      } else if (data.includes("diary/terms")) {
        navigation.navigate("Terms");
      }
    }
  };

  const renderHeader = () => (
    <Header
      iconColor={theme.colors.gray800}
      underlayColor={theme.colors.gray300}
      titleColor={theme.colors.gray800}
      hasBackButton
      onPress={() => {
        navigation.navigate("Home");
      }}
      text={i18n.t("billing.section.title")}
    />
  );

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.gray100}
        barStyle="dark-content"
      />
      <CustomSafeArea backgroundColor={theme.colors.gray100}>
        <Container backgroundColor={theme.colors.gray100}>
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
                "x-dia-native-user-id": String(params.user.id),
                "x-dia-native-user-email": String(params.user.email),
              },
            }}
            onChangeLoading={(state: boolean) => setIsLoading(state)}
            onMessage={onMessage}
            contentMode="mobile"
            thirdPartyCookiesEnabled
            sharedCookiesEnabled
          />
        </Container>
      </CustomSafeArea>
    </>
  );
};

export default Billing;
