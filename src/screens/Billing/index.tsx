import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
// Components
import Container from "components/Container";
import Header from "components/Header";
// Utils
import { billingUrl } from "utils/constants";
// Types
import { BillingNavigationProps } from "types/navigation";

const Billing: React.FC<BillingNavigationProps> = ({
  navigation,
  route: { params },
}) => (
  <SafeAreaView>
    <Container>
      <Header
        hasBackButton
        onPress={() => {
          navigation.goBack();
        }}
        text="Back to Authentication"
      />
      <WebView
        source={{
          uri: billingUrl,
          headers: {
            Cookie: `user=${JSON.stringify(params.user)};`,
          },
        }}
        sharedCookiesEnabled
      />
    </Container>
  </SafeAreaView>
);

export default Billing;
