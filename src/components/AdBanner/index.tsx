import React, { useEffect, useState, useMemo } from "react";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
// Styles
import styled from "styled-components/native";
// Utils
import {
  isLiteVersion,
  adUnitID,
  userCloudLastSyncItem,
} from "utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  top: 30px;
`;

const AdBanner: React.FC = () => {
  const [hasPersonalizedAds, setHasPersonalizedAds] = useState(false);
  const [hasAd, setHasAd] = useState(true);

  useEffect(() => {
    const setPersonalizedAds = async () => {
      const item = await AsyncStorage.getItem(userCloudLastSyncItem);
      setHasPersonalizedAds(!!item);
    };
    const setAdTestDevice = async () => {
      try {
        await setTestDeviceIDAsync("EMULATOR");
      } catch (e) {
        console.log("Error setTestDeviceIDAsync  = ", e);
      }
    };

    if (isLiteVersion) {
      setPersonalizedAds();
      setAdTestDevice();
    }
  }, []);

  return useMemo(
    () =>
      isLiteVersion && hasAd ? (
        <Container>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={adUnitID}
            servePersonalizedAds={hasPersonalizedAds}
            onDidFailToReceiveAdWithError={() => setHasAd(false)}
          />
        </Container>
      ) : null,
    [hasAd, hasPersonalizedAds]
  );
};

export default AdBanner;
