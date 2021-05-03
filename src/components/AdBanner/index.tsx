import React, { useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
// Styles
import styled from "styled-components/native";
// Utils
import {
  isLiteVersion,
  adUnitID,
  userServePersonalizedAdsItem,
} from "utils/constants";
// Types
import { NetworkStatus } from "types/store";
// Context
import useStore from "hooks/useStore";

const Container = styled.View`
  top: 30px;
`;

export const showFullscreenAd = async (): Promise<void> => {
  try {
    const showPersonalizedAds = await AsyncStorage.getItem(
      userServePersonalizedAdsItem
    );

    await AdMobInterstitial.setAdUnitID(adUnitID.interstitial);
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: showPersonalizedAds === "true",
    });
    await AdMobInterstitial.showAdAsync();
  } catch (e) {
    console.log("Error opening video ad = ", e);
  }
};

const AdBanner: React.FC = () => {
  const {
    state: { networkStatus },
  } = useStore();
  const [hasPersonalizedAds, setHasPersonalizedAds] = useState(false);
  const [hasAd, setHasAd] = useState(false);

  useEffect(() => {
    const setPersonalizedAds = async () => {
      const showPersonalizedAds = await AsyncStorage.getItem(
        userServePersonalizedAdsItem
      );

      setHasPersonalizedAds(showPersonalizedAds === "true");
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
      networkStatus === NetworkStatus.online && isLiteVersion && hasAd ? (
        <Container>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID={adUnitID.banner}
            servePersonalizedAds={hasPersonalizedAds}
            onDidFailToReceiveAdWithError={() => setHasAd(false)}
            onAdViewDidReceiveAd={() => setHasAd(true)}
            onAdViewWillPresentScreen={() => setHasAd(true)}
          />
        </Container>
      ) : null,
    [hasAd, hasPersonalizedAds, networkStatus]
  );
};

export default AdBanner;
