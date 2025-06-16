import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function TestDriveAppointment({ onBack }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Vehicle selection, 1: Personal info, 2: Vehicle info, 3: Date & time
  
  // Kişisel Bilgiler (Pre-filled)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Çağdaş",
    lastName: "Aybakan",
    email: "cagdasaybakan@gmail.com",
    phone: "0532 123 45 67"
  });

  // Araç Bilgileri (Pre-filled)
  const [vehicleInfo, setVehicleInfo] = useState({
    chassisNo: "JF2SJADC5LH012345",
    plate: "34 ABC 123",
    model: "Forester",
    year: "2023"
  });

  // Test Sürüşü Bilgileri
  const [testDriveInfo, setTestDriveInfo] = useState({
    selectedVehicle: "",
    selectedDate: "",
    selectedTime: "",
    selectedDealer: "",
    selectedCity: ""
  });

  // Test edilecek araçlar
  const testVehicles = [
    {
      id: 1,
      name: "Subaru Forester e-BOXER",
      image: require('../assets/testdrive/Yeni Forester e-BOXER.webp'),
      description: "Hibrit teknolojisiyle güçlü SUV"
    },
    {
      id: 2,
      name: "Subaru Solterra",
      image: require('../assets/testdrive/SOLTERRA.webp'),
      description: "Tamamen elektrikli SUV"
    },
    {
      id: 3,
      name: "Subaru Crosstrek e-BOXER",
      image: require('../assets/testdrive/Crosstrek e-BOXER.webp'),
      description: "Hibrit crossover deneyimi"
    }
  ];

  const availableDates = [
    "25 Ocak 2025",
    "26 Ocak 2025", 
    "27 Ocak 2025",
    "28 Ocak 2025",
    "29 Ocak 2025"
  ];

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", 
    "11:00", "11:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  const cities = ["İstanbul", "Ankara"];

  const nearbyDealers = [
    { name: "Subaru Ataşehir", address: "Ataşehir, İstanbul", distance: "2.5 km", city: "İstanbul" },
    { name: "Subaru Çankaya", address: "Çankaya, Ankara", distance: "3.2 km", city: "Ankara" },
    { name: "Subaru Kadıköy", address: "Kadıköy, İstanbul", distance: "4.1 km", city: "İstanbul" }
  ];

  const dealersByCity = {
    "İstanbul": [
      { name: "Subaru Ataşehir", address: "Ataşehir, İstanbul", distance: "2.5 km", city: "İstanbul" },
      { name: "Subaru Kadıköy", address: "Kadıköy, İstanbul", distance: "4.1 km", city: "İstanbul" },
      { name: "Subaru Beşiktaş", address: "Beşiktaş, İstanbul", distance: "6.8 km", city: "İstanbul" }
    ],
    "Ankara": [
      { name: "Subaru Çankaya", address: "Çankaya, Ankara", distance: "3.2 km", city: "Ankara" },
      { name: "Subaru Kızılay", address: "Kızılay, Ankara", distance: "5.7 km", city: "Ankara" },
      { name: "Subaru Ümitköy", address: "Ümitköy, Ankara", distance: "8.3 km", city: "Ankara" }
    ]
  };

  const getCurrentDealers = () => {
    if (!testDriveInfo.selectedCity) {
      return nearbyDealers;
    }
    return dealersByCity[testDriveInfo.selectedCity] || [];
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Test sürüşü randevusu oluştur
      Alert.alert(
        "Test Sürüşü Randevusu Oluşturuldu",
        `Test sürüşü randevunuz başarıyla oluşturuldu.\n\nAraç: ${testDriveInfo.selectedVehicle}\nTarih: ${testDriveInfo.selectedDate}\nSaat: ${testDriveInfo.selectedTime}\nBayi: ${testDriveInfo.selectedDealer}`,
        [{ text: "Tamam", onPress: onBack }]
      );
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    } else {
      onBack();
    }
  };

  const isStep0Valid = () => {
    return testDriveInfo.selectedVehicle !== "";
  };

  const isStep1Valid = () => {
    return personalInfo.firstName && personalInfo.lastName && 
           personalInfo.email && personalInfo.phone;
  };

  const isStep2Valid = () => {
    return vehicleInfo.chassisNo && vehicleInfo.plate &&
           vehicleInfo.model && vehicleInfo.year;
  };

  const isStep3Valid = () => {
    return testDriveInfo.selectedDate && testDriveInfo.selectedTime &&
           testDriveInfo.selectedDealer;
  };

  const getCurrentStepValid = () => {
    switch (currentStep) {
      case 0: return isStep0Valid();
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return isStep3Valid();
      default: return false;
    }
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Sürüşü</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Indicator - Only show for steps 1-3 */}
      {currentStep > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, currentStep >= 1 && styles.activeStep]}>
              <Text style={[styles.stepNumber, currentStep >= 1 && styles.activeStepText]}>1</Text>
            </View>
            <View style={[styles.progressLine, currentStep >= 2 && styles.activeLine]} />
            <View style={[styles.progressStep, currentStep >= 2 && styles.activeStep]}>
              <Text style={[styles.stepNumber, currentStep >= 2 && styles.activeStepText]}>2</Text>
            </View>
            <View style={[styles.progressLine, currentStep >= 3 && styles.activeLine]} />
            <View style={[styles.progressStep, currentStep >= 3 && styles.activeStep]}>
              <Text style={[styles.stepNumber, currentStep >= 3 && styles.activeStepText]}>3</Text>
            </View>
          </View>
          <View style={styles.stepLabels}>
            <Text style={styles.stepLabel}>Kişisel</Text>
            <Text style={styles.stepLabel}>Araç</Text>
            <Text style={styles.stepLabel}>Randevu</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 0 ? (
          <View>
            {/* Vehicle Selection */}
            <View style={styles.section}>
              <Text style={styles.vehicleSelectionTitle}>Test Etmek İstediğiniz Aracı Seçin</Text>
              <Text style={styles.vehicleSelectionSubtitle}>Subaru'nun en yeni modellerini test edin</Text>
              {testVehicles.map((vehicle, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.vehicleCard, testDriveInfo.selectedVehicle === vehicle.name && styles.selectedVehicle]}
                  onPress={() => setTestDriveInfo({...testDriveInfo, selectedVehicle: vehicle.name})}
                >
                  <Image
                    source={vehicle.image}
                    style={styles.vehicleImage}
                    contentFit="cover"
                  />
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <Text style={styles.vehicleDescription}>{vehicle.description}</Text>
                    {testDriveInfo.selectedVehicle === vehicle.name && (
                      <View style={styles.vehicleCheckIcon}>
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : currentStep === 1 ? (
          <View>
            {/* Kişisel Bilgiler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Ad</Text>
                  <TextInput
                    style={styles.textInput}
                    value={personalInfo.firstName}
                    onChangeText={(text) => setPersonalInfo({...personalInfo, firstName: text})}
                    placeholder="Adınız"
                    placeholderTextColor="#666"
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Soyad</Text>
                  <TextInput
                    style={styles.textInput}
                    value={personalInfo.lastName}
                    onChangeText={(text) => setPersonalInfo({...personalInfo, lastName: text})}
                    placeholder="Soyadınız"
                    placeholderTextColor="#666"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-posta</Text>
                <TextInput
                  style={styles.textInput}
                  value={personalInfo.email}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, email: text})}
                  placeholder="E-posta adresiniz"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Telefon</Text>
                <TextInput
                  style={styles.textInput}
                  value={personalInfo.phone}
                  onChangeText={(text) => setPersonalInfo({...personalInfo, phone: text})}
                  placeholder="Telefon numaranız"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
        ) : currentStep === 2 ? (
          <View>
            {/* Araç Bilgileri */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Araç Bilgileri</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Şasi Numarası</Text>
                <TextInput
                  style={styles.textInput}
                  value={vehicleInfo.chassisNo}
                  onChangeText={(text) => setVehicleInfo({...vehicleInfo, chassisNo: text})}
                  placeholder="Şasi numarası"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Plaka</Text>
                <TextInput
                  style={styles.textInput}
                  value={vehicleInfo.plate}
                  onChangeText={(text) => setVehicleInfo({...vehicleInfo, plate: text})}
                  placeholder="Plaka numarası"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Model</Text>
                  <TextInput
                    style={styles.textInput}
                    value={vehicleInfo.model}
                    onChangeText={(text) => setVehicleInfo({...vehicleInfo, model: text})}
                    placeholder="Model"
                    placeholderTextColor="#666"
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.inputLabel}>Yıl</Text>
                  <TextInput
                    style={styles.textInput}
                    value={vehicleInfo.year}
                    onChangeText={(text) => setVehicleInfo({...vehicleInfo, year: text})}
                    placeholder="Yıl"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {/* Bayi Seçimi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bayi Seçimi</Text>
              
              {/* İl Seçimi */}
              <View style={styles.citySelection}>
                <TouchableOpacity
                  style={[styles.cityButton, !testDriveInfo.selectedCity && styles.selectedCityButton]}
                  onPress={() => setTestDriveInfo({...testDriveInfo, selectedCity: "", selectedDealer: ""})}
                >
                  <Text style={[styles.cityButtonText, !testDriveInfo.selectedCity && styles.selectedCityButtonText]}>
                    Yakınlar
                  </Text>
                </TouchableOpacity>
                {cities.map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.cityButton, testDriveInfo.selectedCity === city && styles.selectedCityButton]}
                    onPress={() => setTestDriveInfo({...testDriveInfo, selectedCity: city, selectedDealer: ""})}
                  >
                    <Text style={[styles.cityButtonText, testDriveInfo.selectedCity === city && styles.selectedCityButtonText]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Bayi Listesi */}
              <View style={styles.dealerList}>
                <Text style={styles.dealerListTitle}>
                  {!testDriveInfo.selectedCity ? "Size En Yakın Bayiler" : `${testDriveInfo.selectedCity} Bayileri`}
                </Text>
                {getCurrentDealers().map((dealer, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dealerCard, testDriveInfo.selectedDealer === dealer.name && styles.selectedDealer]}
                    onPress={() => setTestDriveInfo({...testDriveInfo, selectedDealer: dealer.name})}
                  >
                    <View style={styles.dealerInfo}>
                      <Ionicons name="location" size={20} color={SUBARU_BLUE} />
                      <View style={styles.dealerTextContainer}>
                        <Text style={styles.dealerName}>{dealer.name}</Text>
                        <Text style={styles.dealerAddress}>{dealer.address}</Text>
                      </View>
                    </View>
                    <View style={styles.dealerRightInfo}>
                      <Text style={styles.dealerDistance}>{dealer.distance}</Text>
                      {testDriveInfo.selectedDealer === dealer.name && (
                        <Ionicons name="checkmark-circle" size={20} color={SUBARU_BLUE} style={styles.checkIcon} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tarih Seçimi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tarih Seçimi</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {availableDates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dateCard, testDriveInfo.selectedDate === date && styles.selectedDate]}
                    onPress={() => setTestDriveInfo({...testDriveInfo, selectedDate: date})}
                  >
                    <Text style={[styles.dateText, testDriveInfo.selectedDate === date && styles.selectedDateText]}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Saat Seçimi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saat Seçimi</Text>
              <View style={styles.timeGrid}>
                {availableTimes.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.timeCard, testDriveInfo.selectedTime === time && styles.selectedTime]}
                    onPress={() => setTestDriveInfo({...testDriveInfo, selectedTime: time})}
                  >
                    <Text style={[styles.timeText, testDriveInfo.selectedTime === time && styles.selectedTimeText]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, !getCurrentStepValid() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!getCurrentStepValid()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 0 ? 'İleri' : 
             currentStep === 1 ? 'İleri' : 
             currentStep === 2 ? 'İleri' : 'Test Sürüşü Randevusu Oluştur'}
          </Text>
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStep: {
    backgroundColor: SUBARU_BLUE,
  },
  stepNumber: {
    color: '#666',
    fontSize: 14,
    fontFamily: fontFamilies.bold,
  },
  activeStepText: {
    color: '#FFFFFF',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#333',
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: SUBARU_BLUE,
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  stepLabel: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
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
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    marginBottom: 15,
  },
  vehicleSelectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    marginBottom: 8,
    textAlign: 'center',
  },
  vehicleSelectionSubtitle: {
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
  selectedVehicle: {
    borderColor: SUBARU_BLUE,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 51, 160, 0.05)',
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
  },
  vehicleInfo: {
    padding: 20,
    position: 'relative',
  },
  vehicleName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    marginBottom: 8,
  },
  vehicleDescription: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    lineHeight: 22,
  },
  vehicleCheckIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: SUBARU_BLUE,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputHalf: {
    flex: 0.48,
  },
  inputLabel: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
  citySelection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  cityButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedCityButton: {
    borderColor: SUBARU_BLUE,
    backgroundColor: 'rgba(0, 51, 160, 0.1)',
  },
  cityButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  selectedCityButtonText: {
    color: SUBARU_BLUE,
  },
  dealerList: {
    marginTop: 10,
  },
  dealerListTitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginBottom: 15,
  },
  dealerCard: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDealer: {
    borderColor: SUBARU_BLUE,
    backgroundColor: 'rgba(0, 51, 160, 0.1)',
  },
  dealerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dealerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  dealerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
  dealerAddress: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.light,
    marginTop: 2,
  },
  dealerRightInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dealerDistance: {
    color: SUBARU_BLUE,
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginBottom: 4,
  },
  checkIcon: {
    marginTop: 4,
  },
  dateScroll: {
    marginBottom: 10,
  },
  dateCard: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  selectedDate: {
    borderColor: SUBARU_BLUE,
    backgroundColor: 'rgba(0, 51, 160, 0.1)',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  selectedDateText: {
    color: SUBARU_BLUE,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    width: '23%',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedTime: {
    borderColor: SUBARU_BLUE,
    backgroundColor: 'rgba(0, 51, 160, 0.1)',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  selectedTimeText: {
    color: SUBARU_BLUE,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
});