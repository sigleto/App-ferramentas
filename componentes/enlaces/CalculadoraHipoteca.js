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

export default function CalculadoraHipotecaria() {
  const [capital, setCapital] = useState("");
  const [prazo, setPrazo] = useState("");
  const [juros, setJuros] = useState("");
  const [erro, setErro] = useState("");
  const navigation = useNavigation();

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  const validarEntradas = () => {
    if (!capital || !prazo || !juros) {
      setErro("Por favor, preencha todos os campos.");
      return false;
    }
    if (isNaN(capital) || isNaN(prazo) || isNaN(juros)) {
      setErro("Por favor, insira valores numéricos válidos.");
      return false;
    }
    if (capital <= 0 || prazo <= 0 || juros <= 0) {
      setErro("Por favor, insira valores positivos.");
      return false;
    }
    setErro("");
    return true;
  };

  const calcularParcela = () => {
    if (!validarEntradas()) return;

    navigation.navigate("ResultadoHipoteca", {
      capital,
      prazo,
      juros,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Capital do empréstimo (€)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setCapital(text)}
            value={capital}
            placeholder="Ex: 200000"
            autoFocus={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Prazo (anos)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setPrazo(text)}
            value={prazo}
            placeholder="Ex: 30"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Taxa de juros anual (%)</Text>
          <Input
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => setJuros(text)}
            value={juros}
            placeholder="Ex: 2.5"
          />
        </View>

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <TouchableOpacity
          onPress={calcularParcela}
          style={styles.touchableButton}
        >
          <Text style={styles.buttonText}>Calcular Parcela</Text>
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
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
