import React, { useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
// Components
import CustomHeaderWebView from "components/CustomHeaderWebView";
import CustomSafeArea from "components/CustomSafeArea";
import OverlaySpinner from "components/OverlaySpinner";
// Utils
import { billing } from "utils/constants";
// Types
import { CheckoutNavigationProps } from "types/navigation";
// Locales
import { WebViewNavigation } from "react-native-webview";
// Styles
import { Overlay } from "./styles";

const Checkout: React.FC<CheckoutNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const onNavigationStateChange = ({ url }: WebViewNavigation) => {
    console.log("url = ", url);

    if (url) {
      if (url.includes("/diary/plans/select")) {
        navigation.goBack();
      }
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.gray100}
        barStyle="dark-content"
      />
      <CustomSafeArea backgroundColor={theme.colors.gray100}>
        {isLoading && (
          <Overlay>
            <OverlaySpinner />
          </Overlay>
        )}
        <CustomHeaderWebView
          source={{
            uri: billing.checkout,
            headers: {
              "x-dia-native-user-id": String(params.user.id),
              "x-dia-native-user-email": String(params.user.email),
              "x-dia-native-user-plan-monthly": String(params.isMonthly),
            },
          }}
          onChangeLoading={(state: boolean) => setIsLoading(state)}
          onNavigationStateChange={onNavigationStateChange}
          contentMode="mobile"
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
        />
      </CustomSafeArea>
    </>
  );
};

export default Checkout;
