import React, { useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
import { WebViewNavigation } from "react-native-webview";
// Components
import CustomHeaderWebView from "components/CustomHeaderWebView";
import CustomSafeArea from "components/CustomSafeArea";
import OverlaySpinner from "components/OverlaySpinner";
// Context
import { setNetworkStatus } from "context/StoreContext";
// Utils
import { billing } from "utils/constants";
// Types
import { CheckoutNavigationProps } from "types/navigation";
import { NetworkStatus, SubscriptionStatus } from "types/store";
// Hooks
import useStore from "hooks/useStore";
// Styles
import { Overlay } from "./styles";

const Checkout: React.FC<CheckoutNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch, state } = useStore();

  const onNavigationStateChange = ({ url }: WebViewNavigation) => {
    if (url) {
      if (url.includes("/diary/plans/select")) {
        navigation.goBack();
      } else if (url.includes("/diary/plans/success")) {
        dispatch({
          type: "SET_AUTHENTICATION_STATUS",
          payload: {
            subscriptionStatus: SubscriptionStatus.active,
            user: state.user,
          },
        });
        setNetworkStatus(dispatch, NetworkStatus.authenticated);
        navigation.navigate("Home");
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
          onChangeLoading={(loading: boolean) => setIsLoading(loading)}
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
