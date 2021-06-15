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
// Hooks
import useStore from "hooks/useStore";
// Utils
import { releasesUrl } from "utils/constants";
// Types
import { ReleasesScreenNavigationProp } from "types/navigation";
// Locales
import i18n from "locales/index";
// Styles
import { Overlay } from "../Legal/styles";

interface Props {
  navigation: ReleasesScreenNavigationProp;
}

const ReleasesWebView: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    state: { isDarkTheme },
  } = useStore();

  const renderHeader = () => (
    <Header
      hasBackButton
      onPress={() => {
        navigation.goBack();
      }}
      text={i18n.t("releases.section.title")}
    />
  );

  const onMessage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    if (data !== undefined && data !== null) {
      Linking.openURL(data);
    }
  };

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
            uri: releasesUrl,
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

export default ReleasesWebView;
