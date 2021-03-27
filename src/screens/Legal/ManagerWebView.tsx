import React, { useState } from "react";
import { Linking } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";
// Components
import Container from "components/Container";
import Header from "components/Header";
import OverlaySpinner from "components/OverlaySpinner";
import CustomSafeArea from "components/CustomSafeArea";
import CustomHeaderWebView, {
  injectScript,
} from "components/CustomHeaderWebView";
import Placeholder from "components/Placeholder";
// Hooks
import useStore from "hooks/useStore";
// Utils
import { privacyUrl, termsUrl } from "utils/constants";
// Types
import {
  PrivacyScreenNavigationProp,
  TermsScreenNavigationProp,
  LegalType,
} from "types/navigation";
import { NetworkStatus } from "types/store";
// Locales
import i18n from "locales/index";
// Styles
import { Overlay, PlaceholderContainer } from "./styles";

interface Props {
  page: LegalType;
  navigation: PrivacyScreenNavigationProp | TermsScreenNavigationProp;
}

const ManagerWebView: React.FC<Props> = ({ navigation, page }) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    state: { networkStatus, isDarkTheme },
  } = useStore();

  const renderHeader = () => (
    <Header
      hasBackButton
      onPress={() => {
        navigation.goBack();
      }}
      text={i18n.t(
        page === LegalType.terms
          ? "terms.section.title"
          : "privacy.section.title"
      )}
    />
  );

  const onMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    if (data !== undefined && data !== null) {
      if (data.includes("diary/privacy")) {
        navigation.navigate("Privacy");
      } else if (data.includes("diary/terms")) {
        navigation.navigate("Terms");
      } else {
        Linking.openURL(data);
      }
    }
  };

  if (networkStatus === NetworkStatus.offline) {
    return (
      <CustomSafeArea>
        <Container>
          {renderHeader()}
          <PlaceholderContainer>
            <Placeholder
              icon="wifi-off"
              text={i18n.t("terms.netWorkStatus.offline")}
            />
          </PlaceholderContainer>
        </Container>
      </CustomSafeArea>
    );
  }

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
            uri: page === LegalType.terms ? termsUrl : privacyUrl,
            // uri: "https://webhook.site/4ac434fd-eb7d-42e3-b894-b43c55d3d0d7",
            headers: {
              "x-is-native": "true",
              "x-is-native-dark": String(isDarkTheme),
            },
          }}
          onChangeLoading={(state: boolean) => setIsLoading(state)}
          injectedJavaScript={injectScript}
          sharedCookiesEnabled
          onMessage={onMessage}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default ManagerWebView;
