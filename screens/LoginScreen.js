import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, Animated, Dimensions } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";
const { width, height } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState("cagdasaybakan@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const startTransitionAnimation = () => {
    setShowTransition(true);
    
    // Start overlay fade in
    Animated.timing(overlayOpacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Start form fade out and scale down
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Start logo animation
      Animated.sequence([
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        })
      ]).start(() => {
        // Wait a bit then complete login
        setTimeout(() => {
          onLogin();
        }, 1000);
      });
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen e-posta ve şifrenizi girin.");
      return;
    }

    setIsLoading(true);
    
    // Mock login - 1 saniye bekle sonra animasyon başlat
    setTimeout(() => {
      setIsLoading(false);
      startTransitionAnimation();
    }, 1000);
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color={SUBARU_BLUE} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.formWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/whitelogo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.headerTitle}>Giriş Yapın</Text>
          <Text style={styles.headerSubtitle}>Subaru hesabınızla devam edin</Text>
        </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-posta</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="E-posta adresiniz"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Şifre</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="Şifreniz"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>veya</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="#FFFFFF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
          <Ionicons name="logo-apple" size={20} color="#FFFFFF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Apple ile Giriş Yap</Text>
        </TouchableOpacity>
      </View>

              <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hesabınız yok mu? <Text style={styles.signupLink}>Kayıt Olun</Text>
          </Text>
        </View>
      </Animated.View>

      {/* Transition Overlay */}
      {showTransition && (
        <Animated.View 
          style={[
            styles.transitionOverlay,
            { opacity: overlayOpacityAnim }
          ]}
        >
          <Animated.View
            style={[
              styles.transitionLogoContainer,
              {
                opacity: logoOpacityAnim,
                transform: [{ scale: logoScaleAnim }]
              }
            ]}
          >
            <Image
              source={require('../assets/subarulogo.png')}
              style={styles.transitionLogo}
              contentFit="contain"
            />
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
          </Animated.View>
        </Animated.View>
      )}
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
  formWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 54,
    marginBottom: 30,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: fontFamilies.bold,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    paddingVertical: 15,
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: SUBARU_BLUE,
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  loginButton: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginHorizontal: 15,
  },
  socialButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  appleButton: {
    backgroundColor: '#1A1A1A',
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  signupLink: {
    color: SUBARU_BLUE,
    fontFamily: fontFamilies.bold,
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  transitionLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transitionLogo: {
    width: 280,
    height: 120,
    marginBottom: 30,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
}); 