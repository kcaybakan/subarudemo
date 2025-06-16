import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function WelcomeScreen({ onContinue }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color={SUBARU_BLUE} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bg.jpeg')}
        style={styles.backgroundImage}
        contentFit="contain"
        contentPosition="top"
        backgroundColor={BLACK}
        placeholder={null}
      />
      
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/whitelogo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>Subaru Dünyasına</Text>
          <Text style={styles.welcomeTitle}>Hoş Geldiniz</Text>
          
          <Text style={styles.welcomeSubtitle}>
            Güvenilir, dayanıklı ve performans odaklı araçlarımızla{'\n'}
            her yolculuğunuzda yanınızdayız
          </Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={32} color={SUBARU_BLUE} />
              <Text style={styles.featureText}>Güvenlik</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="car-sport" size={32} color={SUBARU_BLUE} />
              <Text style={styles.featureText}>Performans</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="leaf" size={32} color={SUBARU_BLUE} />
              <Text style={styles.featureText}>Çevre Dostu</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={styles.continueButtonText}>Başlayalım</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          </TouchableOpacity>
          
          <Text style={styles.skipText}>
            Zaten hesabınız var mı? <Text style={styles.skipLink}>Giriş Yapın</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: BLACK,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 60,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
    lineHeight: 38,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    lineHeight: 22,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginTop: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  skipText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginTop: 20,
    textAlign: 'center',
  },
  skipLink: {
    color: SUBARU_BLUE,
    fontFamily: fontFamilies.bold,
  },
}); 