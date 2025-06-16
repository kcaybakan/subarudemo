import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function HomeScreen({ onNavigateToTestDrive, onNavigateToModels }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState('Modeller');

  const cardData = {
    'Modeller': {
      title: "2024'ün en iyi ana akım\notomotiv markası",
      buttonText: 'Modeller',
      image: require('../assets/homepage/25_ASC_interior_feature_2.jpeg')
    },
    'Fiyat Listesi': {
      title: "Güncel fiyat bilgileri\nve kampanya detayları",
      buttonText: 'Fiyat Listesi',
      image: require('../assets/homepage/images.jpeg')
    },
    'Bayi & Servis': {
      title: "Size en yakın bayi\nve servis noktalarımız",
      buttonText: 'Bayi & Servis',
      image: require('../assets/homepage/images-2.jpeg')
    },
    'Kampanyalar': {
      title: "Özel indirimler\nve kampanya fırsatları",
      buttonText: 'Kampanyalar',
      image: require('../assets/homepage/203_SEER_Lifestyle_FOR_Pet_Owners_2.jpeg')
    },
    'Test Sürüşü': {
      title: "Subaru deneyimini\nşimdi yaşayın",
      buttonText: 'Test Sürüşü',
      image: require('../assets/testdrive/testdrivecard.jpeg')
    },
    'İletişim': {
      title: "Bizimle iletişime\ngeçin",
      buttonText: 'İletişim',
      image: require('../assets/homepage/images.jpeg')
    }
  };

  const cards = ['Modeller', 'Fiyat Listesi', 'Bayi & Servis', 'Kampanyalar', 'Test Sürüşü', 'İletişim'];

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
        source={activeCard === 'Test Sürüşü' ? require('../assets/testdrive/testdrivecard.jpeg') : require('../assets/bg.jpeg')}
        style={styles.backgroundImage}
        contentFit="contain"
        contentPosition="top"
        backgroundColor={BLACK}
        placeholder={null}
      />
      <View style={styles.logoOverlay}>
        <Image
          source={require('../assets/whitelogo.png')}
          style={styles.subaruLogo}
          contentFit="contain"
        />
      </View>
      <View style={styles.bottomOverlay}>
        <Text style={styles.titleText}>{cardData[activeCard].title}</Text>
        <TouchableOpacity 
          style={styles.modelsButton}
          onPress={() => {
            if (activeCard === 'Test Sürüşü' && onNavigateToTestDrive) {
              onNavigateToTestDrive();
            } else if (activeCard === 'Modeller' && onNavigateToModels) {
              onNavigateToModels();
            }
          }}
        >
          <Text style={styles.buttonText}>{cardData[activeCard].buttonText}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Divider between button and cards */}
      <View style={styles.divider} />
      
      {/* Cards Section */}
      <View style={styles.cardsContainer}>
        {/* First Row - 3 cards */}
        <View style={styles.cardRow}>
          {cards.slice(0, 3).map((cardName, index) => (
            <View key={index} style={styles.cardWrapper}>
              <TouchableOpacity 
                style={activeCard === cardName ? styles.activeCard : styles.inactiveCard}
                onPress={() => setActiveCard(cardName)}
              >
                <Image
                  source={cardData[cardName].image}
                  style={styles.cardImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardTitle}>{cardName}</Text>
            </View>
          ))}
        </View>
        
        {/* Second Row - 3 cards */}
        <View style={styles.cardRow}>
          {cards.slice(3, 6).map((cardName, index) => (
            <View key={index + 3} style={styles.cardWrapper}>
              <TouchableOpacity 
                style={activeCard === cardName ? styles.activeCard : styles.inactiveCard}
                onPress={() => setActiveCard(cardName)}
              >
                <Image
                  source={cardData[cardName].image}
                  style={styles.cardImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardTitle}>{cardName}</Text>
            </View>
          ))}
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
  logoOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  subaruLogo: {
    width: 200,
    height: 60,
  },

  bottomOverlay: {
    position: 'absolute',
    bottom: '40%',
    left: 20,
    right: 20,
    alignItems: 'flex-start',
    zIndex: 1,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    textAlign: 'left',
    marginBottom: 25,
    lineHeight: 34,
    width: '75%',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  modelsButton: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
  divider: {
    position: 'absolute',
    bottom: 320,
    left: 0,
    right:0,
    height: 1,
    backgroundColor: '#333',
  },
  cardsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 240,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%',
  },
  cardWrapper: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeCard: {
    width: 110,
    height: 110,
    backgroundColor: '#222',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  inactiveCard: {
    width: 110,
    height: 110,
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    marginTop: 8,
  },
}); 