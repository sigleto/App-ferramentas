import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function CalculadoraAmortAntecipada() {
  const [capitalPendente, setCapitalPendente] = useState("");
  const [prazoRestante, setPrazoRestante] = useState("");
  const [juros, setJuros] = useState("");
  const [amortizacaoAntecipada, setAmortizacaoAntecipada] = useState("");
  const navigation = useNavigation();

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  const calcularAmortizacaoAntecipada = () => {
    if (
      !capitalPendente ||
      !prazoRestante ||
      !juros ||
      !amortizacaoAntecipada
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    navigation.navigate("ResultadoAmortAnticipada", {
      capitalPendente,
      prazoRestante,
      juros,
      amortizacaoAntecipada,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fffbde" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Amortização Antecipada</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Capital pendente (€)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setCapitalPendente(text)}
            value={capitalPendente}
            autoFocus={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Prazo restante (meses)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setPrazoRestante(text)}
            value={prazoRestante}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Taxa de juros anual (%)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setJuros(text)}
            value={juros}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Valor a amortizar (€)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setAmortizacaoAntecipada(text)}
            value={amortizacaoAntecipada}
          />
        </View>

        <TouchableOpacity
          onPress={calcularAmortizacaoAntecipada}
          style={styles.touchableButton}
        >
          <Text style={styles.buttonText}>Calcular Amortização</Text>
        </TouchableOpacity>
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fffbde",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  inputStyle: {
    fontSize: 18,
    color: "olive",
  },
  touchableButton: {
    backgroundColor: "#555ff7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#f4f8f8",
    fontWeight: "bold",
  },
});
