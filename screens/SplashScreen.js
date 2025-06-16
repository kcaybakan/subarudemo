import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function SplashScreen({ onFinish }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        onFinish();
      }, 3000); // 3 saniye sonra welcome screen'e geç

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/subarulogo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={SUBARU_BLUE} />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
      
      <View style={styles.bottomContainer}>
        <Text style={styles.versionText}>Subaru Türkiye</Text>
        <Text style={styles.copyrightText}>© 2025 Telif Hakları Baytur Motorlu Vasıtalar Ticaret A.Ş.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 120,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies?.medium || 'System',
    marginTop: 15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  versionText: {
    color: SUBARU_BLUE,
    fontSize: 18,
    fontFamily: fontFamilies?.bold || 'System',
    marginBottom: 5,
  },
  copyrightText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies?.light || 'System',
  },
}); 