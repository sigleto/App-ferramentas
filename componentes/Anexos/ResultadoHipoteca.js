import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import Anuncio from "./Anuncio";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultadoHipoteca({ route }) {
  const navigation = useNavigation();
  const { capital, prazo, juros } = route.params;
  const [parcelaMensal, setParcelaMensal] = useState(0);
  const [totalJuros, setTotalJuros] = useState(0);
  const [totalPago, setTotalPago] = useState(0);
  const [amortizacao, setAmortizacao] = useState([]);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  useEffect(() => {
    calcularParcela();
  }, []);

  const calcularParcela = () => {
    const capitalInicial = parseFloat(capital);
    const prazoMeses = parseInt(prazo) * 12;
    const taxaJurosMensal = parseFloat(juros) / 100 / 12;

    const parcela =
      (capitalInicial *
        taxaJurosMensal *
        Math.pow(1 + taxaJurosMensal, prazoMeses)) /
      (Math.pow(1 + taxaJurosMensal, prazoMeses) - 1);

    setParcelaMensal(parcela.toFixed(2));
    setTotalPago((parcela * prazoMeses).toFixed(2));
    setTotalJuros((parcela * prazoMeses - capitalInicial).toFixed(2));

    // Calcular la amortización completa
    let saldo = capitalInicial;
    const amortizacaoArray = [];
    for (let i = 0; i < prazoMeses; i++) {
      const jurosMensal = saldo * taxaJurosMensal;
      const capitalMensal = parcela - jurosMensal;
      saldo -= capitalMensal;
      amortizacaoArray.push({
        periodo: i + 1,
        cuota: parcela.toFixed(2),
        interes: jurosMensal.toFixed(2),
        amortizacion: capitalMensal.toFixed(2),
        saldoPendiente: saldo.toFixed(2),
      });
    }
    setAmortizacao(amortizacaoArray);
  };

  const voltar = () => {
    navigation.goBack();
  };

  const verTabelaAmortizacao = () => {
    navigation.navigate("Tabla", { data: amortizacao });
  };

  const compartilharApp = async () => {
    try {
      await Share.share({
        message:
          "Baixe o app Finanzas Fácil: Simulador e otimize seus cálculos financeiros. Clique aqui para baixá-lo! https://play.google.com/store/apps/details?id=com.sigleto.Ferramentas",
      });
    } catch (error) {
      console.error("Erro ao compartilhar", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Anuncio />
      <TouchableOpacity onPress={compartilharApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>

      <Text style={styles.title}>Resultado do Cálculo</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Parcela mensal: {parcelaMensal}€</Text>
        <Text style={styles.resultText}>Total juros: {totalJuros}€</Text>
        <Text style={styles.resultText}>Total a pagar: {totalPago}€</Text>
      </View>

      <TouchableOpacity
        onPress={verTabelaAmortizacao}
        style={styles.touchableButton}
      >
        <Text style={styles.buttonText}>Ver Tabela de Amortização</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={voltar} style={styles.touchableButtonV}>
        <Text style={styles.buttonTextA}>VOLTAR</Text>
      </TouchableOpacity>

      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fffbde",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#28a745",
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  touchableButton: {
    backgroundColor: "#555ff7",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    color: "#f4f8f8",
    fontWeight: "bold",
  },
  buttonTextA: {
    fontSize: 18,
    color: "#f4f8f8",
    textAlign: "center",
    fontWeight: "bold",
  },
  shareIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "#555ff7",
    paddingHorizontal: 5,
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 50,
  },
});
