import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import Anuncio from "./Anuncio";

const ResultadosRendaImediata = ({ route }) => {
  const { capital, taxaJuros, periodo } = route.params;
  const [rendaMensal, setRendaMensal] = useState(null);
  const navigation = useNavigation();
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";
  const calcularRendaMensal = () => {
    const capitalFloat = parseFloat(capital || "0");
    const taxaJurosFloat = parseFloat(taxaJuros || "0") / 100;
    const periodoFloat = parseFloat(periodo || "0");

    // Fórmula de renda imediata mensal
    const rendaMensalCalculada =
      (capitalFloat * taxaJurosFloat) /
      (1 - Math.pow(1 + taxaJurosFloat, -periodoFloat));

    return isNaN(rendaMensalCalculada) ? 0 : rendaMensalCalculada;
  };

  useEffect(() => {
    if (capital && taxaJuros && periodo) {
      const renda = calcularRendaMensal();
      setRendaMensal(renda);
    }
  }, [capital, taxaJuros, periodo]);

  const voltar = () => {
    navigation.navigate("Home");
  };

  const compartilharApp = async () => {
    try {
      await Share.share({
        message:
          "Baixe o app Finanças Fácil: Simulador e otimize seus cálculos financeiros. Clique aqui para baixar! https://play.google.com/store/apps/details?id=com.sigleto.Ferramentas",
      });
    } catch (error) {
      console.error("Erro ao compartilhar", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Anuncio />
      <View style={styles.header}>
        <Text style={styles.enunciado}>Dados Inseridos</Text>
        <TouchableOpacity onPress={compartilharApp} style={styles.shareIcon}>
          <MaterialCommunityIcons
            name="share-variant"
            size={24}
            color="#007BFF"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.labelText}>
        Capital Inicial: <Text style={styles.resultText}>{capital}</Text>
      </Text>
      <Text style={styles.labelText}>
        Taxa de Juros: <Text style={styles.resultText}>{taxaJuros}%</Text>
      </Text>
      <Text style={styles.labelText}>
        Período: <Text style={styles.resultText}>{periodo} meses</Text>
      </Text>

      <Text style={styles.enunciadoR}>Resultado</Text>
      <Text style={styles.labelText}>
        Renda Mensal:{" "}
        <Text style={styles.resultText}>{rendaMensal?.toFixed(2)}</Text>
      </Text>

      <TouchableOpacity onPress={voltar} style={styles.touchableButton}>
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fffbde",
  },

  touchableButton: {
    marginVertical: 20,
    backgroundColor: "#555ff7",
    paddingHorizontal: 27,
    marginTop: 40,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 24,
    color: "#f4f8f8",
    textAlign: "center",
    fontWeight: "bold",
  },

  resultText: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
  },

  enunciado: {
    marginTop: 140,
    fontSize: 30,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 20,
    marginLeft: "16%",
  },
  enunciadoR: {
    marginTop: 140,
    fontSize: 30,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 20,
  },

  labelText: {
    fontSize: 30,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  shareIcon: {
    position: "absolute", // Añade esta línea
    right: 20, // Ajusta según necesites
    top: 80, // Alinea con la parte superior
  },
});

export default ResultadosRendaImediata;
