import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from './assets/fonts';
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ServiceHistory from "./screens/ServiceHistory";
import Appointments from "./screens/Appointments";
import TestDriveAppointment from "./screens/TestDriveAppointment";
import VehicleModels from "./screens/VehicleModels";
import VehicleDetail from "./screens/VehicleDetail";
import RoadsideAssistance from "./screens/RoadsideAssistance";

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, welcome, login, main
  const [activeTab, setActiveTab] = useState('Anasayfa');
  const [showTestDriveAppointment, setShowTestDriveAppointment] = useState(false);
  const [showVehicleModels, setShowVehicleModels] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
        <Text style={{ color: '#FFFFFF' }}>Loading...</Text>
      </View>
    );
  }

  const renderScreen = () => {
    // Splash Screen
    if (currentScreen === 'splash') {
      return <SplashScreen onFinish={() => setCurrentScreen('welcome')} />;
    }
    
    // Welcome Screen
    if (currentScreen === 'welcome') {
      return <WelcomeScreen onContinue={() => setCurrentScreen('login')} />;
    }
    
    // Login Screen
    if (currentScreen === 'login') {
      return <LoginScreen onLogin={() => setCurrentScreen('main')} />;
    }
    
    // Main App Screens
    if (showVehicleDetail && selectedVehicle) {
      return (
        <VehicleDetail 
          vehicle={selectedVehicle}
          onBack={() => {
            setShowVehicleDetail(false);
            setSelectedVehicle(null);
          }}
          onTestDrive={() => {
            setShowVehicleDetail(false);
            setSelectedVehicle(null);
            setShowTestDriveAppointment(true);
          }}
        />
      );
    }
    
    if (showVehicleModels) {
      return (
        <VehicleModels 
          onBack={() => setShowVehicleModels(false)}
          onVehicleSelect={(vehicle) => {
            setSelectedVehicle(vehicle);
            setShowVehicleDetail(true);
          }}
        />
      );
    }
    
    if (showTestDriveAppointment) {
      return <TestDriveAppointment onBack={() => setShowTestDriveAppointment(false)} />;
    }
    
    switch (activeTab) {
      case 'Anasayfa':
        return (
          <HomeScreen 
            onNavigateToTestDrive={() => setShowTestDriveAppointment(true)}
            onNavigateToModels={() => setShowVehicleModels(true)}
          />
        );
      case 'Servis Geçmişi':
        return <ServiceHistory onBack={() => setActiveTab('Anasayfa')} />;
      case 'Yol Yardım':
        return <RoadsideAssistance onBack={() => setActiveTab('Anasayfa')} />;
      case 'Randevularım':
        return <Appointments />;
      case 'Profil':
        return <View style={styles.placeholderScreen}><Text style={styles.placeholderText}>Profil</Text></View>;
      default:
        return (
          <HomeScreen 
            onNavigateToTestDrive={() => setShowTestDriveAppointment(true)}
            onNavigateToModels={() => setShowVehicleModels(true)}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {/* Bottom Navigation Bar - Only show in main app */}
      {currentScreen === 'main' && !showTestDriveAppointment && !showVehicleModels && !showVehicleDetail && (
      <View style={styles.bottomNavBar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Anasayfa')}
        >
          <Ionicons 
            name="home" 
            size={20} 
            color={activeTab === 'Anasayfa' ? SUBARU_BLUE : '#FFFFFF'} 
          />
          <Text style={[styles.navText, activeTab === 'Anasayfa' && styles.activeNavText]}>
            Anasayfa
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Servis Geçmişi')}
        >
          <Ionicons 
            name="construct" 
            size={20} 
            color={activeTab === 'Servis Geçmişi' ? SUBARU_BLUE : '#FFFFFF'} 
          />
          <Text style={[styles.navText, activeTab === 'Servis Geçmişi' && styles.activeNavText]}>
            Servis Geçmişi
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Yol Yardım')}
        >
          <Ionicons 
            name="warning" 
            size={20} 
            color={activeTab === 'Yol Yardım' ? SUBARU_BLUE : '#FFFFFF'} 
          />
          <Text style={[styles.navText, activeTab === 'Yol Yardım' && styles.activeNavText]}>
            Yol Yardım
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Randevularım')}
        >
          <Ionicons 
            name="calendar" 
            size={20} 
            color={activeTab === 'Randevularım' ? SUBARU_BLUE : '#FFFFFF'} 
          />
          <Text style={[styles.navText, activeTab === 'Randevularım' && styles.activeNavText]}>
            Randevularım
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Profil')}
        >
          <Ionicons 
            name="person" 
            size={20} 
            color={activeTab === 'Profil' ? SUBARU_BLUE : '#FFFFFF'} 
          />
          <Text style={[styles.navText, activeTab === 'Profil' && styles.activeNavText]}>
            Profil
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
  },
  placeholderScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
  },
  bottomNavBar: {
    backgroundColor: BLACK,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    gap: 4,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
  },
  activeNavText: {
    color: SUBARU_BLUE,
    fontFamily: fontFamilies.bold,
  },
});
