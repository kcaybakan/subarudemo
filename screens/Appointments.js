import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { fonts, fontFamilies } from '../assets/fonts';
import NewAppointment from './NewAppointment';

const BLACK = "#000000";
const SUBARU_BLUE = "#0033A0";

export default function Appointments() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const mockCurrentAppointments = [
    {
      id: 1,
      date: "25 Ocak 2025",
      time: "14:00",
      service: "Periyodik Bakım",
      dealer: "Subaru Ankara",
      address: "Çankaya, Ankara",
      status: "Onaylandı"
    },
    {
      id: 2,
      date: "15 Şubat 2025",
      time: "10:30",
      service: "Lastik Değişimi",
      dealer: "Subaru İstanbul",
      address: "Beşiktaş, İstanbul",
      status: "Beklemede"
    }
  ];

  const mockPastAppointments = [
    {
      id: 3,
      date: "10 Aralık 2024",
      time: "16:00",
      service: "Genel Kontrol",
      dealer: "Subaru Ankara",
      address: "Çankaya, Ankara",
      status: "Tamamlandı"
    },
    {
      id: 4,
      date: "05 Kasım 2024",
      time: "11:00",
      service: "Fren Kontrolü",
      dealer: "Subaru İzmir",
      address: "Konak, İzmir",
      status: "İptal Edildi"
    },
    {
      id: 5,
      date: "20 Ekim 2024",
      time: "09:30",
      service: "Motor Bakımı",
      dealer: "Subaru Ankara",
      address: "Çankaya, Ankara",
      status: "Tamamlandı"
    }
  ];

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const handleCancelAppointment = (id) => {
    Alert.alert(
      "Randevu İptali",
      "Bu randevuyu iptal etmek istediğinizden emin misiniz?",
      [
        { text: "Hayır", style: "cancel" },
        { text: "Evet", onPress: () => console.log("Randevu iptal edildi:", id) }
      ]
    );
  };

  const handleEditAppointment = (id) => {
    Alert.alert("Randevu Düzenleme", "Randevu düzenleme özelliği yakında eklenecek.");
  };

  const handleNewAppointment = () => {
    setShowNewAppointment(true);
  };

  const renderAppointmentCard = (appointment, isPast = false) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.appointmentDate}>{appointment.date}</Text>
          <Text style={styles.appointmentTime}>{appointment.time}</Text>
        </View>
        <View style={[styles.statusBadge, 
          appointment.status === 'Onaylandı' && styles.statusConfirmed,
          appointment.status === 'Beklemede' && styles.statusPending,
          appointment.status === 'Tamamlandı' && styles.statusCompleted,
          appointment.status === 'İptal Edildi' && styles.statusCancelled
        ]}>
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentBody}>
        <View style={styles.serviceInfo}>
          <Ionicons name="construct" size={20} color={SUBARU_BLUE} />
          <Text style={styles.serviceText}>{appointment.service}</Text>
          {isPast && appointment.status === 'Tamamlandı' && <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.completedIcon} />}
          {isPast && appointment.status === 'İptal Edildi' && <Ionicons name="close-circle" size={18} color="#F44336" style={styles.completedIcon} />}
        </View>
        
        <View style={styles.dealerInfo}>
          <Ionicons name="location" size={20} color={SUBARU_BLUE} />
          <View style={styles.dealerTextContainer}>
            <Text style={styles.dealerName}>{appointment.dealer}</Text>
            <Text style={styles.dealerAddress}>{appointment.address}</Text>
          </View>
        </View>
      </View>
      
      {!isPast && (
        <View style={styles.appointmentActions}>
                     <TouchableOpacity 
             style={styles.editButton}
             onPress={() => handleEditAppointment(appointment.id)}
           >
             <Ionicons name="create" size={16} color="#4A90E2" />
             <Text style={styles.editButtonText}>Düzenle</Text>
           </TouchableOpacity>
           
           <TouchableOpacity 
             style={styles.cancelButton}
             onPress={() => handleCancelAppointment(appointment.id)}
           >
             <Ionicons name="close" size={16} color="#CCCCCC" />
             <Text style={styles.cancelButtonText}>İptal</Text>
           </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color={SUBARU_BLUE} />
      </View>
    );
  }

  if (showNewAppointment) {
    return <NewAppointment onBack={() => setShowNewAppointment(false)} />;
  }

  return (
    <View style={styles.container}>
      {/* Logo Header */}
      <View style={styles.logoOverlay}>
        <Image
          source={require('../assets/whitelogo.png')}
          style={styles.subaruLogo}
          contentFit="contain"
        />
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            Mevcut Randevular
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Geçmiş Randevular
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* New Appointment Button */}
      {activeTab === 'current' && (
        <View style={styles.newAppointmentContainer}>
          <TouchableOpacity 
            style={styles.newAppointmentButton}
            onPress={handleNewAppointment}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.newAppointmentText}>Yeni Randevu Al</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Appointments List */}
      <ScrollView style={styles.appointmentsList} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'current' ? (
          mockCurrentAppointments.length > 0 ? (
            mockCurrentAppointments.map(appointment => renderAppointmentCard(appointment, false))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={60} color="#666" />
              <Text style={styles.emptyText}>Henüz randevunuz bulunmuyor</Text>
              <Text style={styles.emptySubText}>Yeni randevu almak için yukarıdaki butonu kullanın</Text>
            </View>
          )
        ) : (
          mockPastAppointments.length > 0 ? (
            mockPastAppointments.map(appointment => renderAppointmentCard(appointment, true))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="time-outline" size={60} color="#666" />
              <Text style={styles.emptyText}>Geçmiş randevu bulunmuyor</Text>
            </View>
          )
        )}
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
  tabContainer: {
    flexDirection: 'row',
    marginTop: 140,
    marginHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: SUBARU_BLUE,
  },
  tabText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: fontFamilies.bold,
  },
  newAppointmentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  newAppointmentButton: {
    backgroundColor: SUBARU_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  newAppointmentText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    marginLeft: 8,
  },
  appointmentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: SUBARU_BLUE,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flex: 1,
  },
  appointmentDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.bold,
  },
  appointmentTime: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusConfirmed: {
    backgroundColor: '#4CAF50',
  },
  statusPending: {
    backgroundColor: '#FF9800',
  },
  statusCompleted: {
    backgroundColor: '#666',
  },
  statusCancelled: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: fontFamilies.bold,
  },
  appointmentBody: {
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    marginLeft: 8,
    flex: 1,
  },
  completedIcon: {
    marginLeft: 8,
  },
  dealerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dealerTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  dealerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.medium,
  },
  dealerAddress: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.light,
    marginTop: 2,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    marginLeft: 4,
  },
  cancelButtonText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: fontFamilies.medium,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: fontFamilies.light,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
}); 