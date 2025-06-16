import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function RoadsideAssistance({ onBack }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const services = [
    {
      id: 1,
      icon: "car",
      title: "Patlayan Lastiğin Değiştirilmesi",
      description: "Araç ile yolculuk esnasında, aracın bir lastiğinin patlaması durumunda; aracın en yakın yetkili servise veya lastik onarım merkezine çekimi ücretsiz sağlanacaktır.",
      note: "Yedek lastik, malzeme ve lastik onarım masrafları müşteri tarafından karşılanacaktır."
    },
    {
      id: 2,
      icon: "key",
      title: "Kapı Kilit Hizmeti",
      description: "Aracın kapılarının kapalı olması, anahtarlarının kaybedilmesi/unutulması durumunda; kapıların açılması için yarım saate kadar olan işçilik ücretsizdir.",
      note: "Açılamama durumunda en yakın servise nakil 200 TL limit dahilinde yapılacaktır."
    },
    {
      id: 3,
      icon: "speedometer",
      title: "Yakıt Bitmesi",
      description: "Yakıt bitmesi sonucu yola devam edilememesi durumunda; araç, en yakın benzin istasyonuna çekilecektir.",
      note: "250 TL'yi aşan kısım ve yakıt bedeli müşteriye aittir."
    }
  ];

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleCall = () => {
    Alert.alert(
      "Subaru Yol Yardım",
      "Subaru Destek hattını arayacaksınız. Yol yardım için 1'i tuşlayın.",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Ara", 
          onPress: () => Linking.openURL('tel:02123596006')
        }
      ]
    );
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
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yol Yardım</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency Call Section */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="call" size={32} color="#FFFFFF" />
            <Text style={styles.emergencyTitle}>7/24 Yol Yardım</Text>
          </View>
          
          <Text style={styles.emergencyDescription}>
            Subaru yol yardım hizmetlerine, Subaru Destek hattı üzerinden 7/24 ulaşabilirsiniz.
          </Text>
          
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneLabel}>Subaru Destek Hattı</Text>
            <Text style={styles.phoneNumber}>0 212 359 6006</Text>
            <Text style={styles.phoneInstruction}>Yol yardım için 1'i tuşlayın</Text>
          </View>
          
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#FFFFFF" style={styles.callIcon} />
            <Text style={styles.callButtonText}>Şimdi Ara</Text>
          </TouchableOpacity>
        </View>

        {/* Coverage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kapsam Dahilindeki Araçlar</Text>
          <View style={styles.coverageCard}>
            <View style={styles.coverageItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.coverageText}>
                BAYTUR tarafından Türkiye'de satılmış araçlar
              </Text>
            </View>
            <View style={styles.coverageItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.coverageText}>
                3 yıl 100.000 km üretici garantisi içerisindeki araçlar
              </Text>
            </View>
            <View style={styles.coverageItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.coverageText}>
                +1 veya +2 yıl uzatılmış garanti kapsamındaki araçlar
              </Text>
            </View>
            <View style={styles.noteContainer}>
              <Ionicons name="information-circle" size={16} color="#FF9800" />
              <Text style={styles.noteText}>
                Kapsam dışındaki araçlar ücretli olarak hizmet alabilir
              </Text>
            </View>
          </View>
        </View>

        {/* Geographic Coverage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coğrafi Kapsam</Text>
          <View style={styles.geographicCard}>
            <Ionicons name="location" size={24} color={SUBARU_BLUE} />
            <Text style={styles.geographicText}>
              Türkiye Cumhuriyeti coğrafi sınırları dahilinde, 0 kilometreden itibaren geçerlidir.
            </Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yol Yardım Hizmetleri</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceIconContainer}>
                  <Ionicons name={service.icon} size={24} color={SUBARU_BLUE} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
              
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.serviceNote}>
                <Ionicons name="alert-circle" size={16} color="#FF9800" />
                <Text style={styles.serviceNoteText}>{service.note}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hizmet Yönetimi</Text>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={SUBARU_BLUE} />
            <Text style={styles.infoText}>
              Müşteri çağrısının alınmasının ardından, Subaru Yol Yardım hizmetleri tarafından geri arama şeklinde yapılacaktır.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
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
  emergencySection: {
    backgroundColor: SUBARU_BLUE,
    borderRadius: 16,
    padding: 25,
    marginBottom: 25,
    alignItems: 'center',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  emergencyTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    marginLeft: 12,
  },
  emergencyDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    opacity: 0.9,
  },
  phoneContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  phoneLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginBottom: 8,
    opacity: 0.8,
  },
  phoneNumber: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: fontFamilies.bold,
    marginBottom: 5,
    letterSpacing: 2,
  },
  phoneInstruction: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    opacity: 0.8,
  },
  callButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  callIcon: {
    color: SUBARU_BLUE,
    marginRight: 8,
  },
  callButtonText: {
    color: SUBARU_BLUE,
    fontSize: 18,
    fontFamily: fontFamilies.bold,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    marginBottom: 15,
  },
  coverageCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  coverageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  noteText: {
    color: '#FF9800',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginLeft: 8,
    flex: 1,
  },
  geographicCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  geographicText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 15,
    flex: 1,
    lineHeight: 22,
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
  serviceTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    flex: 1,
  },
  serviceDescription: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    lineHeight: 22,
    marginBottom: 12,
  },
  serviceNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  serviceNoteText: {
    color: '#FF9800',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 15,
    flex: 1,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 30,
  },
}); 