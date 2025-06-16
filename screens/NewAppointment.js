import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function NewAppointment({ onBack }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
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

  // Randevu Bilgileri
  const [appointmentInfo, setAppointmentInfo] = useState({
    selectedDate: "",
    selectedTime: "",
    selectedService: "",
    selectedDealer: "",
    selectedCity: ""
  });

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

  const services = [
    "Periyodik Bakım",
    "Genel Kontrol", 
    "Fren Kontrolü",
    "Lastik Değişimi",
    "Motor Bakımı",
    "Klima Servisi"
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
    if (!appointmentInfo.selectedCity) {
      return nearbyDealers;
    }
    return dealersByCity[appointmentInfo.selectedCity] || [];
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Randevu oluştur
      Alert.alert(
        "Randevu Oluşturuldu",
        `Randevunuz başarıyla oluşturuldu.\n\nTarih: ${appointmentInfo.selectedDate}\nSaat: ${appointmentInfo.selectedTime}\nServis: ${appointmentInfo.selectedService}\nBayi: ${appointmentInfo.selectedDealer}`,
        [{ text: "Tamam", onPress: onBack }]
      );
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      onBack();
    }
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
    return appointmentInfo.selectedDate && appointmentInfo.selectedTime &&
           appointmentInfo.selectedService && appointmentInfo.selectedDealer;
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
        <Text style={styles.headerTitle}>Yeni Randevu</Text>
        <View style={styles.placeholder} />
      </View>

             {/* Progress Indicator */}
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

             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {currentStep === 1 ? (
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
            {/* Servis Seçimi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Servis Türü</Text>
              <View style={styles.optionsGrid}>
                {services.map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.optionCard, appointmentInfo.selectedService === service && styles.selectedOption]}
                    onPress={() => setAppointmentInfo({...appointmentInfo, selectedService: service})}
                  >
                    <Text style={[styles.optionText, appointmentInfo.selectedService === service && styles.selectedOptionText]}>
                      {service}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bayi Seçimi */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bayi Seçimi</Text>
              
              {/* İl Seçimi */}
              <View style={styles.citySelection}>
                <TouchableOpacity
                  style={[styles.cityButton, !appointmentInfo.selectedCity && styles.selectedCityButton]}
                  onPress={() => setAppointmentInfo({...appointmentInfo, selectedCity: "", selectedDealer: ""})}
                >
                  <Text style={[styles.cityButtonText, !appointmentInfo.selectedCity && styles.selectedCityButtonText]}>
                    Yakınlar
                  </Text>
                </TouchableOpacity>
                {cities.map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.cityButton, appointmentInfo.selectedCity === city && styles.selectedCityButton]}
                    onPress={() => setAppointmentInfo({...appointmentInfo, selectedCity: city, selectedDealer: ""})}
                  >
                    <Text style={[styles.cityButtonText, appointmentInfo.selectedCity === city && styles.selectedCityButtonText]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Bayi Listesi */}
              <View style={styles.dealerList}>
                <Text style={styles.dealerListTitle}>
                  {!appointmentInfo.selectedCity ? "Size En Yakın Bayiler" : `${appointmentInfo.selectedCity} Bayileri`}
                </Text>
                {getCurrentDealers().map((dealer, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dealerCard, appointmentInfo.selectedDealer === dealer.name && styles.selectedDealer]}
                    onPress={() => setAppointmentInfo({...appointmentInfo, selectedDealer: dealer.name})}
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
                      {appointmentInfo.selectedDealer === dealer.name && (
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
                    style={[styles.dateCard, appointmentInfo.selectedDate === date && styles.selectedDate]}
                    onPress={() => setAppointmentInfo({...appointmentInfo, selectedDate: date})}
                  >
                    <Text style={[styles.dateText, appointmentInfo.selectedDate === date && styles.selectedDateText]}>
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
                    style={[styles.timeCard, appointmentInfo.selectedTime === time && styles.selectedTime]}
                    onPress={() => setAppointmentInfo({...appointmentInfo, selectedTime: time})}
                  >
                    <Text style={[styles.timeText, appointmentInfo.selectedTime === time && styles.selectedTimeText]}>
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
                     style={[styles.nextButton, 
             (currentStep === 1 ? !isStep1Valid() : 
              currentStep === 2 ? !isStep2Valid() : !isStep3Valid()) && styles.disabledButton
           ]}
           onPress={handleNext}
           disabled={currentStep === 1 ? !isStep1Valid() : 
                    currentStep === 2 ? !isStep2Valid() : !isStep3Valid()}
        >
                     <Text style={styles.nextButtonText}>
             {currentStep === 1 ? 'İleri' : currentStep === 2 ? 'İleri' : 'Randevu Oluştur'}
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
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: SUBARU_BLUE,
    backgroundColor: 'rgba(0, 51, 160, 0.1)',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: SUBARU_BLUE,
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