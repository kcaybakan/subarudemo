import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";
const { width } = Dimensions.get('window');

export default function VehicleDetail({ vehicle, onBack, onTestDrive }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Forester detaylı bilgileri (PDF'den alınan)
  const foresterDetails = {
    engine: {
      type: "2.0L DOHC 16 Valf e-BOXER",
      power: "150 PS / 5600 rpm",
      torque: "194 Nm / 4000 rpm",
      electricMotor: "13.6 PS",
      transmission: "Lineartronic CVT",
      drivetrain: "Simetrik AWD"
    },
    dimensions: {
      length: "4640 mm",
      width: "1815 mm",
      height: "1715 mm",
      wheelbase: "2670 mm",
      groundClearance: "220 mm",
      trunkCapacity: "509 L"
    },
    performance: {
      fuelConsumption: "6.7 L/100km",
      co2Emission: "154 g/km",
      tankCapacity: "63 L",
      maxSpeed: "188 km/h",
      acceleration: "10.3 sn (0-100 km/h)"
    },
    safety: [
      "EyeSight Sürücü Destek Sistemi",
      "Pre-Collision Braking",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lead Vehicle Start Alert",
      "7 Hava Yastığı",
      "Vehicle Dynamics Control",
      "Hill Descent Control"
    ],
    features: [
      "8.0\" Dokunmatik Ekran",
      "Apple CarPlay & Android Auto",
      "Harman Kardon Premium Ses Sistemi",
      "Panoramik Cam Tavan",
      "Elektrikli Bagaj Kapısı",
      "Keyless Access & Push Start",
      "Dual Zone Klima",
      "X-MODE Arazi Sürüş Modu",
      "Hill Descent Control",
      "Roof Rail & Cross Bar"
    ]
  };

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

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.priceSection}>
        <View style={styles.priceHeader}>
          <Text style={styles.originalPrice}>{vehicle.originalPrice}</Text>
          <View style={styles.campaignBadge}>
            <Text style={styles.campaignText}>KAMPANYA</Text>
          </View>
        </View>
        <Text style={styles.campaignPrice}>{vehicle.campaignPrice}</Text>
        <Text style={styles.savingsText}>100.105 ₺ tasarruf edin!</Text>
      </View>

      <View style={styles.quickSpecs}>
        <View style={styles.specCard}>
          <Ionicons name="flash" size={24} color={SUBARU_BLUE} />
          <Text style={styles.specTitle}>Motor</Text>
          <Text style={styles.specValue}>2.0L e-BOXER</Text>
        </View>
        <View style={styles.specCard}>
          <Ionicons name="speedometer" size={24} color={SUBARU_BLUE} />
          <Text style={styles.specTitle}>Güç</Text>
          <Text style={styles.specValue}>150 PS</Text>
        </View>
        <View style={styles.specCard}>
          <Ionicons name="car" size={24} color={SUBARU_BLUE} />
          <Text style={styles.specTitle}>Şanzıman</Text>
          <Text style={styles.specValue}>CVT</Text>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Öne Çıkan Özellikler</Text>
        {foresterDetails.features.slice(0, 6).map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color={SUBARU_BLUE} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSpecs = () => (
    <View style={styles.tabContent}>
      <View style={styles.specsSection}>
        <Text style={styles.sectionTitle}>Motor & Performans</Text>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Motor Tipi</Text>
          <Text style={styles.specValue}>{foresterDetails.engine.type}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Maksimum Güç</Text>
          <Text style={styles.specValue}>{foresterDetails.engine.power}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Maksimum Tork</Text>
          <Text style={styles.specValue}>{foresterDetails.engine.torque}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Elektrik Motor</Text>
          <Text style={styles.specValue}>{foresterDetails.engine.electricMotor}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Şanzıman</Text>
          <Text style={styles.specValue}>{foresterDetails.engine.transmission}</Text>
        </View>
      </View>

      <View style={styles.specsSection}>
        <Text style={styles.sectionTitle}>Boyutlar</Text>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Uzunluk</Text>
          <Text style={styles.specValue}>{foresterDetails.dimensions.length}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Genişlik</Text>
          <Text style={styles.specValue}>{foresterDetails.dimensions.width}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Yükseklik</Text>
          <Text style={styles.specValue}>{foresterDetails.dimensions.height}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Bagaj Hacmi</Text>
          <Text style={styles.specValue}>{foresterDetails.dimensions.trunkCapacity}</Text>
        </View>
      </View>

      <View style={styles.specsSection}>
        <Text style={styles.sectionTitle}>Yakıt & Emisyon</Text>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Yakıt Tüketimi</Text>
          <Text style={styles.specValue}>{foresterDetails.performance.fuelConsumption}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>CO₂ Emisyonu</Text>
          <Text style={styles.specValue}>{foresterDetails.performance.co2Emission}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Depo Kapasitesi</Text>
          <Text style={styles.specValue}>{foresterDetails.performance.tankCapacity}</Text>
        </View>
      </View>
    </View>
  );

  const renderSafety = () => (
    <View style={[styles.safetySection, styles.tabContent]}>
      <Text style={styles.sectionTitle}>Güvenlik Sistemleri</Text>
      <Text style={styles.sectionSubtitle}>EyeSight ve daha fazlası ile maksimum güvenlik</Text>
      
      {foresterDetails.safety.map((safety, index) => (
        <View key={index} style={styles.safetyItem}>
          <Ionicons name="shield-checkmark" size={20} color={SUBARU_BLUE} />
          <Text style={styles.safetyText}>{safety}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vehicle.name}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
        <Image
          source={vehicle.image}
          style={styles.vehicleImage}
          contentFit="cover"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Genel Bakış
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'specs' && styles.activeTab]}
          onPress={() => setActiveTab('specs')}
        >
          <Text style={[styles.tabText, activeTab === 'specs' && styles.activeTabText]}>
            Teknik Özellikler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'safety' && styles.activeTab]}
          onPress={() => setActiveTab('safety')}
        >
          <Text style={[styles.tabText, activeTab === 'safety' && styles.activeTabText]}>
            Güvenlik
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'specs' && renderSpecs()}
        {activeTab === 'safety' && renderSafety()}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.testDriveButton} onPress={onTestDrive}>
          <Ionicons name="car-sport" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.testDriveText}>Test Sürüşü</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Ionicons name="call" size={20} color={SUBARU_BLUE} style={styles.buttonIcon} />
          <Text style={styles.contactText}>İletişim</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 8,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#2A2A2A',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: SUBARU_BLUE,
  },
  tabText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  activeTabText: {
    color: SUBARU_BLUE,
    fontFamily: fontFamilies.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingTop: 20,
  },
  priceSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  originalPrice: {
    color: '#999',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    textDecorationLine: 'line-through',
  },
  campaignBadge: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campaignText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: fontFamilies.bold,
  },
  campaignPrice: {
    color: SUBARU_BLUE,
    fontSize: 28,
    fontFamily: fontFamilies.bold,
    marginBottom: 5,
  },
  savingsText: {
    color: '#4CAF50',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  quickSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  specCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  specTitle: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    marginTop: 8,
    marginBottom: 4,
  },
  specValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.bold,
  },
  featuresSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    marginBottom: 15,
  },
  sectionSubtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 12,
  },
  specsSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  specLabel: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    flex: 1,
  },
  safetySection: {
    marginBottom: 25,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  safetyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 12,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
    gap: 15,
  },
  testDriveButton: {
    backgroundColor: SUBARU_BLUE,
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: SUBARU_BLUE,
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  testDriveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
  contactText: {
    color: SUBARU_BLUE,
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
}); 