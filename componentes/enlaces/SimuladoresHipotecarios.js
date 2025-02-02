import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function SimuladoresHipotecarios() {
  const navigation = useNavigation();

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  const navegarParaSimulador = (tipoSimulador) => {
    switch (tipoSimulador) {
      case "parcelasPadrao":
        navigation.navigate("CalculadoraHipoteca");
        break;
      case "parcelasCarencia":
        navigation.navigate("CalculadoraCarencia");
        break;
      case "parcelasAmortizacao":
        navigation.navigate("CalculadoraAmortAnticipada");
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Simuladores Hipotecários</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navegarParaSimulador("parcelasPadrao")}
      >
        <Text style={styles.buttonText}>Parcela a pagar de um empréstimo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navegarParaSimulador("parcelasCarencia")}
      >
        <Text style={styles.buttonText}>
          Parcela a pagar de um empréstimo com período de carência
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navegarParaSimulador("parcelasAmortizacao")}
      >
        <Text style={styles.buttonText}>
          Parcela ou prazo de um empréstimo se houver amortização antecipada
        </Text>
      </TouchableOpacity>

      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
