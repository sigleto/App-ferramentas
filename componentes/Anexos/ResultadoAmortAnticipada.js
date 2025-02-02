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
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import Anuncio from "./Anuncio";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultadoAmortizacaoAntecipada({ route }) {
  const navigation = useNavigation();
  const { capitalPendente, prazoRestante, juros, amortizacaoAntecipada } =
    route.params;

  const [resultadoReducaoParcela, setResultadoReducaoParcela] = useState(null);
  const [resultadoReducaoPrazo, setResultadoReducaoPrazo] = useState(null);
  const [amortizacaoReducaoParcela, setAmortizacaoReducaoParcela] = useState(
    []
  );
  const [amortizacaoReducaoPrazo, setAmortizacaoReducaoPrazo] = useState([]);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  useEffect(() => {
    calcularResultados();
  }, []);

  const calcularResultados = () => {
    const capital = parseFloat(capitalPendente);
    const prazo = parseInt(prazoRestante);
    const taxaJuros = parseFloat(juros) / 100 / 12;
    const amortizacao = parseFloat(amortizacaoAntecipada);

    // Cálculo para redução da parcela
    const novoCapital = capital - amortizacao;
    const novaParcela =
      (novoCapital * taxaJuros * Math.pow(1 + taxaJuros, prazo)) /
      (Math.pow(1 + taxaJuros, prazo) - 1);
    const parcelaOriginal =
      (capital * taxaJuros * Math.pow(1 + taxaJuros, prazo)) /
      (Math.pow(1 + taxaJuros, prazo) - 1);

    setResultadoReducaoParcela({
      novaParcela: novaParcela.toFixed(2),
      reducaoParcela: (parcelaOriginal - novaParcela).toFixed(2),
      economiaTotal: (
        parcelaOriginal * prazo -
        capital -
        (novaParcela * prazo - novoCapital)
      ).toFixed(2),
    });

    // Calcular a amortização para redução da parcela
    let saldoReducaoParcela = novoCapital;
    const amortizacaoArrayReducaoParcela = [];
    for (let i = 0; i < prazo; i++) {
      const jurosMensal = saldoReducaoParcela * taxaJuros;
      const capitalMensal = novaParcela - jurosMensal;
      saldoReducaoParcela -= capitalMensal;
      amortizacaoArrayReducaoParcela.push({
        periodo: (i + 1).toString(),
        cuota: novaParcela.toFixed(2),
        interes: jurosMensal.toFixed(2),
        amortizacion: capitalMensal.toFixed(2),
        saldoPendiente: saldoReducaoParcela.toFixed(2),
      });
    }
    setAmortizacaoReducaoParcela(amortizacaoArrayReducaoParcela);

    // Cálculo para redução do prazo
    let novoPrazoParcial =
      Math.log(parcelaOriginal / (parcelaOriginal - novoCapital * taxaJuros)) /
      Math.log(1 + taxaJuros);
    let novoPrazoParcelas = Math.floor(novoPrazoParcial);
    let ultimaParcela =
      novoCapital * Math.pow(1 + taxaJuros, novoPrazoParcial) -
      (parcelaOriginal * (Math.pow(1 + taxaJuros, novoPrazoParcial) - 1)) /
        taxaJuros;

    setResultadoReducaoPrazo({
      novoPrazoParcelas,
      reducaoPrazo: prazo - novoPrazoParcelas,
      ultimaParcela: ultimaParcela.toFixed(2),
      economiaTotal: (
        parcelaOriginal * prazo -
        capital -
        (parcelaOriginal * novoPrazoParcelas - novoCapital)
      ).toFixed(2),
    });

    // Calcular a amortização para redução do prazo
    let saldoReducaoPrazo = capital;
    const amortizacaoArrayReducaoPrazo = [];
    for (let i = 0; i < novoPrazoParcelas; i++) {
      const jurosMensal = saldoReducaoPrazo * taxaJuros;
      const capitalMensal = parcelaOriginal - jurosMensal;
      saldoReducaoPrazo -= capitalMensal;
      amortizacaoArrayReducaoPrazo.push({
        periodo: (i + 1).toString(),
        cuota: parcelaOriginal.toFixed(2),
        interes: jurosMensal.toFixed(2),
        amortizacion: capitalMensal.toFixed(2),
        saldoPendiente: saldoReducaoPrazo.toFixed(2),
      });
    }
    setAmortizacaoReducaoPrazo(amortizacaoArrayReducaoPrazo);
  };

  const voltar = () => {
    navigation.goBack();
  };

  const verTabelaReducaoParcela = () => {
    navigation.navigate("TablaAmortCuota", {
      data: amortizacaoReducaoParcela,
    });
  };

  const verTabelaReducaoPrazo = () => {
    navigation.navigate("TablaAmortPlazo", {
      data: amortizacaoReducaoPrazo,
    });
  };
  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Baixe o app Finanzas Fácil: Simulador e otimize seus cálculos financeiros. Clique aqui para baixá-lo! https://play.google.com/store/apps/details?id=com.sigleto.Ferramentas",
      });
    } catch (error) {
      console.error("Error al compartir", error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultado da Amortização Antecipada</Text>
      <Anuncio />
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>
      <View style={styles.resultSection}>
        <Text style={styles.subtitle}>Redução da Parcela:</Text>
        <Text style={styles.resultText}>
          Nova parcela mensal: {resultadoReducaoParcela?.novaParcela} €
        </Text>
        <Text style={styles.resultText}>
          Redução da parcela: {resultadoReducaoParcela?.reducaoParcela} €
        </Text>
        <Text style={styles.resultText}>
          Economia total: {resultadoReducaoParcela?.economiaTotal} €
        </Text>
        <TouchableOpacity
          onPress={verTabelaReducaoParcela}
          style={styles.touchableButton}
        >
          <Text style={styles.buttonText}>Ver Tabela de Amortização</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultSection}>
        <Text style={styles.subtitle}>Redução do Prazo:</Text>
        <Text style={styles.resultText}>
          Novo prazo: {resultadoReducaoPrazo?.novoPrazoParcelas} meses
        </Text>
        <Text style={styles.resultText}>
          Redução do prazo: {resultadoReducaoPrazo?.reducaoPrazo} meses
        </Text>
        <Text style={styles.resultText}>
          Última parcela: {resultadoReducaoPrazo?.ultimaParcela} €
        </Text>
        <Text style={styles.resultText}>
          Economia total: {resultadoReducaoPrazo?.economiaTotal} €
        </Text>
        <TouchableOpacity
          onPress={verTabelaReducaoPrazo}
          style={styles.touchableButton}
        >
          <Text style={styles.buttonText}>Ver Tabela de Amortização</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: "#fffbde",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#28a745",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultSection: {
    marginBottom: 20,
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
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
  },
  buttonTextA: {
    fontWeight: "bold",
  },

  shareIcon: {
    position: "absolute", // Añade esta línea
    right: 20, // Ajusta según necesites
    top: 80, // Alinea con la parte superior
  },
});
