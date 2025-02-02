import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const CalculadoraRentaInmediata = () => {
  const [capital, setCapital] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [periodo, setPeriodo] = useState("");
  const navigation = useNavigation();

  const calcularRentaInmediata = () => {
    if (!capital || !taxaJuros || !periodo) {
      alert("Por favor, complete todos los campos.");
    } else {
      navigation.navigate("ResultadoRentaInmediata", {
        capital,
        taxaJuros,
        periodo,
      });
    }
  };

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Calculadora de Renda Imediata</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Capital Inicial</Text>
            <Input
              keyboardType="numeric"
              value={capital}
              onChangeText={setCapital}
              containerStyle={styles.input}
              inputStyle={styles.inputText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Taxa de Juros (%)</Text>
            <Input
              keyboardType="numeric"
              value={taxaJuros}
              onChangeText={setTaxaJuros}
              containerStyle={styles.input}
              inputStyle={styles.inputText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Período de Pagamento (meses)</Text>
            <Input
              keyboardType="numeric"
              value={periodo}
              onChangeText={setPeriodo}
              containerStyle={styles.input}
              inputStyle={styles.inputText}
            />
          </View>

          <TouchableOpacity
            onPress={calcularRentaInmediata}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Calcular Renda</Text>
          </TouchableOpacity>

          <View style={styles.bannerContainer}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f8f8",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 8,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  inputText: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Para Android
    marginTop: 20,
    width: "70%",
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default CalculadoraRentaInmediata;
