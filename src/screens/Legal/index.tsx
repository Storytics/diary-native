import React, { useCallback, useState } from "react";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
// Components
import Container from "components/Container";
import Header from "components/Header";
import OverlaySpinner from "components/OverlaySpinner";
import CustomSafeArea from "components/CustomSafeArea";
// Hooks
import useStore from "hooks/useStore";
// Utils
import { privacyUrl, termsUrl } from "utils/constants";
// Types
import { LegalNavigationProps, LegalType } from "types/navigation";
import { NetworkStatus } from "types/store";
// Locales
import i18n from "locales/index";
// Styles
import { Overlay } from "./styles";

const TermsScreen: React.FC<LegalNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
        params.page === LegalType.terms
          ? "terms.section.title"
          : "privacy.section.title"
      )}
    />
  );

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
        <WebView
          source={{
            uri: params.page === LegalType.terms ? termsUrl : privacyUrl,
            headers: {
              "x-is-native": "true",
              "x-is-native-dark": String(isDarkTheme),
            },
          }}
          sharedCookiesEnabled
          onLoad={() => onLoading(false)}
          onError={() => onLoading(false)}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default TermsScreen;
