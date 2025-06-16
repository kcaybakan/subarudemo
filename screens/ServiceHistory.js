import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function ServiceHistory({ onBack }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const serviceData = [
    { date: "Ocak 2023", km: "60.000", cost: "₺1.250" },
    { date: "Ocak 2024", km: "75.000", cost: "₺1.450" },
    { date: "Ocak 2025", km: "90.000", cost: "₺1.680" },
  ];

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
        <Text style={styles.headerTitle}>Servis Geçmişi</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/testdrive/Yeni Forester e-BOXER.webp')}
          style={styles.vehicleImage}
          contentFit="cover"
        />
      </View>

      {/* Service History Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.serviceSection}>
          <Text style={styles.sectionTitle}>Araç Servis Geçmişi</Text>
          <Text style={styles.sectionSubtitle}>Forester e-BOXER - 2023 Model</Text>
          
          <View style={styles.vehicleInfo}>
            <View style={styles.infoCard}>
              <Ionicons name="speedometer" size={24} color={SUBARU_BLUE} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Toplam Kilometre</Text>
                <Text style={styles.infoValue}>90.000 km</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="calendar" size={24} color={SUBARU_BLUE} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Son Bakım</Text>
                <Text style={styles.infoValue}>Ocak 2025</Text>
              </View>
            </View>
          </View>

          {/* Service History Cards */}
          <View style={styles.serviceHistory}>
            <Text style={styles.historyTitle}>Bakım Geçmişi</Text>
            {serviceData.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <View style={styles.serviceIconContainer}>
                    <Ionicons name="construct" size={20} color={SUBARU_BLUE} />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceDate}>{service.date}</Text>
                    <Text style={styles.serviceKm}>{service.km} km</Text>
                  </View>
                  <Text style={styles.serviceCost}>{service.cost}</Text>
                </View>
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceDescription}>
                    Periyodik bakım ve kontroller tamamlandı
                  </Text>
                  <View style={styles.serviceStatus}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.statusText}>Tamamlandı</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Next Service Info */}
          <View style={styles.nextServiceCard}>
            <View style={styles.nextServiceHeader}>
              <Ionicons name="time" size={24} color="#FF9800" />
              <Text style={styles.nextServiceTitle}>Sonraki Bakım</Text>
            </View>
            <Text style={styles.nextServiceText}>
              Bir sonraki periyodik bakımınız 105.000 km'de veya Temmuz 2025'te yapılmalıdır.
            </Text>
            <TouchableOpacity style={styles.appointmentButton}>
              <Text style={styles.appointmentButtonText}>Randevu Al</Text>
            </TouchableOpacity>
          </View>
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
  placeholder: {
    width: 40,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#2A2A2A',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceSection: {
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginBottom: 25,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    marginBottom: 4,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
  serviceHistory: {
    marginBottom: 25,
  },
  historyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    marginBottom: 15,
  },
  serviceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 51, 160, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    marginBottom: 2,
  },
  serviceKm: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  serviceCost: {
    color: SUBARU_BLUE,
    fontSize: 18,
    fontFamily: fontFamilies.bold,
  },
  serviceDetails: {
    paddingLeft: 55,
  },
  serviceDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginBottom: 8,
  },
  serviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    marginLeft: 6,
  },
  nextServiceCard: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
    marginBottom: 30,
  },
  nextServiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextServiceTitle: {
    color: '#FF9800',
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    marginLeft: 12,
  },
  nextServiceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    lineHeight: 20,
    marginBottom: 15,
  },
  appointmentButton: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  appointmentButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.bold,
  },
}); 