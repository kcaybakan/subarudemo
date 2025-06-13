import React, { useState } from "react";
import { View, Text } from "react-native";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Subaru App'e Hoş Geldiniz!</Text>
    </View>
  );
}
