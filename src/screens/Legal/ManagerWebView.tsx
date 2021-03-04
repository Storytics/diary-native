import React, { useCallback, useState } from "react";
import { Linking, Text } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
// Components
import Container from "components/Container";
import Header from "components/Header";
import OverlaySpinner from "components/OverlaySpinner";
import CustomSafeArea from "components/CustomSafeArea";
import CustomHeaderWebView from "components/CustomHeaderWebView";
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
import { Overlay } from "./styles";

interface Props {
  page: LegalType;
  navigation: PrivacyScreenNavigationProp | TermsScreenNavigationProp;
}

const ManagerWebView: React.FC<Props> = ({ navigation, page }) => {
  const [isLoading, setIsLoading] = useState(true);

  const webViewRef = React.createRef<WebView>();
  const {
    state: { networkStatus, isDarkTheme },
  } = useStore();

  const onLoading = useCallback((state: boolean) => {
    setTimeout(() => {
      setIsLoading(state);
    }, 2000);
  }, []);

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

  const handleNavigationChange = (event: WebViewNavigation) => {
    if (event.url.includes("diary/privacy")) {
      if (!isLoading) {
        webViewRef?.current?.stopLoading();
        navigation.navigate("Privacy");
      }
    } else if (event.url.includes("diary/terms")) {
      if (!isLoading) {
        webViewRef?.current?.stopLoading();
        navigation.navigate("Terms");
      }
    } else {
      webViewRef?.current?.stopLoading();
      Linking.openURL(event.url);
    }
  };

  if (networkStatus === NetworkStatus.offline) {
    return (
      <CustomSafeArea>
        <Container>
          <Text>No internet connection</Text>
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
          ref={webViewRef}
          source={{
            uri: page === LegalType.terms ? termsUrl : privacyUrl,
            headers: {
              "x-is-native": "true",
              "x-is-native-dark": String(isDarkTheme),
            },
          }}
          sharedCookiesEnabled
          onLoad={() => onLoading(false)}
          onError={() => onLoading(false)}
          onNavigationStateChange={handleNavigationChange}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default ManagerWebView;
