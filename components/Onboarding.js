import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

const { width, height } = Dimensions.get("window");

const SUBARU_BLUE = "#0033A0";
const BLACK = "#111216";
const LIGHT_BLUE = "#4F8EF7";

const pages = [
  {
    title: "Hoş geldiniz",
    subtitle: "Subaru Dünyasına Adım Atın",
    description:
      "Güvenli sürüş, üstün teknoloji ve macera dolu bir yolculuk için Subaru ile tanışın.",
    image: require("../assets/subarulogo.png"),
    button: "Devam Et",
  },
  {
    title: "Simetrik AWD",
    subtitle: "Her Koşulda Güç ve Kontrol",
    description:
      "Subaru'nun simetrik dört çeker sistemiyle her yol koşulunda güvenle ilerleyin.",
    image: require("../assets/icon.png"),
    button: "Devam Et",
  },
  {
    title: "EyeSight Teknolojisi",
    subtitle: "Güvenliğiniz Önceliğimiz",
    description:
      "Gelişmiş sürücü destek sistemleriyle yolculuklarınızda ekstra güvenlik.",
    image: require("../assets/splash-icon.png"),
    button: "Başla",
  },
];

export default function Onboarding({ onFinish }) {
  const [page, setPage] = useState(0);
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BLACK,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={SUBARU_BLUE} />
      </View>
    );
  }

  const handleNext = () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLogoContainer}>
        <Image
          source={require("../assets/subarulogo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.placeholderImage} />
        <Text style={styles.brand}>SUBARU</Text>
        <Text style={styles.slogan}>Farkı Hisset</Text>
        <Text style={styles.title}>{pages[page].title}</Text>
        <Text style={styles.subtitle}>{pages[page].subtitle}</Text>
        <Text style={styles.description}>{pages[page].description}</Text>
        <View style={styles.dotsContainer}>
          {pages.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, page === i && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{pages[page].button}</Text>
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
  headerLogoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 48,
    marginBottom: 8,
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  placeholderImage: {
    width: width * 0.7,
    height: width * 0.35,
    backgroundColor: "#222",
    borderRadius: 20,
    marginBottom: 16,
  },
  brand: {
    color: SUBARU_BLUE,
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    letterSpacing: 2,
  },
  slogan: {
    color: LIGHT_BLUE,
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 16,
  },
  title: {
    color: SUBARU_BLUE,
    fontSize: 32,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: SUBARU_BLUE,
  },
  button: {
    backgroundColor: SUBARU_BLUE,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});
