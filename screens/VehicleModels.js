import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function VehicleModels({ onBack, onVehicleSelect }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: "Subaru Forester e-BOXER",
      image: require('../assets/testdrive/Yeni Forester e-BOXER.webp'),
      description: "Hibrit teknolojisiyle güçlü SUV",
      originalPrice: "3.525.105 ₺",
      campaignPrice: "3.425.000 ₺",
      features: ["2.0L e-BOXER Motor", "AWD Sistem", "EyeSight Güvenlik", "X-MODE"],
      fuelType: "Hibrit",
      transmission: "CVT",
      year: "2025"
    },
    {
      id: 2,
      name: "Subaru Solterra",
      image: require('../assets/testdrive/SOLTERRA.webp'),
      description: "Tamamen elektrikli SUV",
      originalPrice: "4.200.000 ₺",
      campaignPrice: "4.050.000 ₺",
      features: ["Elektrikli Motor", "AWD Sistem", "450km Menzil", "Hızlı Şarj"],
      fuelType: "Elektrik",
      transmission: "Otomatik",
      year: "2025"
    },
    {
      id: 3,
      name: "Subaru Crosstrek e-BOXER",
      image: require('../assets/testdrive/Crosstrek e-BOXER.webp'),
      description: "Hibrit crossover deneyimi",
      originalPrice: "2.850.000 ₺",
      campaignPrice: "2.750.000 ₺",
      features: ["2.0L e-BOXER Motor", "AWD Sistem", "X-MODE", "Yüksek Yerden Yükseklik"],
      fuelType: "Hibrit",
      transmission: "CVT",
      year: "2025"
    }
  ];

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modeller</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subaru Model Ailesi</Text>
          <Text style={styles.sectionSubtitle}>2025 model yılı araçlarımızı keşfedin</Text>
          
          {vehicles.map((vehicle, index) => (
            <TouchableOpacity
              key={index}
              style={styles.vehicleCard}
              onPress={() => onVehicleSelect(vehicle)}
            >
              <Image
                source={vehicle.image}
                style={styles.vehicleImage}
                contentFit="cover"
              />
              
              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleHeader}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <View style={styles.yearBadge}>
                    <Text style={styles.yearText}>{vehicle.year}</Text>
                  </View>
                </View>
                
                <Text style={styles.vehicleDescription}>{vehicle.description}</Text>
                
                <View style={styles.vehicleSpecs}>
                  <View style={styles.specItem}>
                    <Ionicons name="flash" size={16} color={SUBARU_BLUE} />
                    <Text style={styles.specText}>{vehicle.fuelType}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="settings" size={16} color={SUBARU_BLUE} />
                    <Text style={styles.specText}>{vehicle.transmission}</Text>
                  </View>
                </View>
                
                <View style={styles.featuresContainer}>
                  {vehicle.features.slice(0, 2).map((feature, idx) => (
                    <View key={idx} style={styles.featureTag}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.priceContainer}>
                  <View style={styles.priceRow}>
                    <Text style={styles.originalPrice}>{vehicle.originalPrice}</Text>
                    <View style={styles.campaignBadge}>
                      <Text style={styles.campaignText}>KAMPANYA</Text>
                    </View>
                  </View>
                  <Text style={styles.campaignPrice}>{vehicle.campaignPrice}</Text>
                </View>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.detailsText}>Detayları Görüntüle</Text>
                  <Ionicons name="chevron-forward" size={20} color={SUBARU_BLUE} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginBottom: 25,
    textAlign: 'center',
  },
  vehicleCard: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
    padding: 0,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  vehicleInfo: {
    padding: 20,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    flex: 1,
  },
  yearBadge: {
    backgroundColor: SUBARU_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  yearText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: fontFamilies.bold,
  },
  vehicleDescription: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    lineHeight: 22,
    marginBottom: 15,
  },
  vehicleSpecs: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 20,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  specText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  featureTag: {
    backgroundColor: 'rgba(0, 51, 160, 0.2)',
    borderWidth: 1,
    borderColor: SUBARU_BLUE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureText: {
    color: SUBARU_BLUE,
    fontSize: 12,
    fontFamily: fontFamilies.medium,
  },
  priceContainer: {
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  originalPrice: {
    color: '#999',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    textDecorationLine: 'line-through',
  },
  campaignBadge: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  campaignText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: fontFamilies.bold,
  },
  campaignPrice: {
    color: SUBARU_BLUE,
    fontSize: 22,
    fontFamily: fontFamilies.bold,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  detailsText: {
    color: SUBARU_BLUE,
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
}); 