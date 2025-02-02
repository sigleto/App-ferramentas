import React, { useState, useEffect } from "react";
import {
  Share,
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
import Anuncio from "./Anuncio";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultadoCarencia({ route }) {
  const navigation = useNavigation();
  const { capital, prazo, juros, carencia } = route.params;

  const [parcelaCarencia, setParcelaCarencia] = useState(0);
  const [parcelaNormal, setParcelaNormal] = useState(0);
  const [amortizacao, setAmortizacao] = useState([]);

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";

  useEffect(() => {
    calcularResultados();
  }, []);

  const calcularResultados = () => {
    const capitalInicial = parseFloat(capital);
    const prazoTotalMeses = parseInt(prazo) * 12;
    const periodoCarenciaMeses = parseInt(carencia) * 12;
    const taxaJurosMensal = parseFloat(juros) / 100 / 12;

    const parcelaJuros = capitalInicial * taxaJurosMensal;
    const prazoRestanteMeses = prazoTotalMeses - periodoCarenciaMeses;

    const parcelaNormal =
      (capitalInicial *
        taxaJurosMensal *
        Math.pow(1 + taxaJurosMensal, prazoRestanteMeses)) /
      (Math.pow(1 + taxaJurosMensal, prazoRestanteMeses) - 1);

    setParcelaCarencia(parcelaJuros.toFixed(2));
    setParcelaNormal(parcelaNormal.toFixed(2));

    let saldo = capitalInicial;
    const amortizacaoArray = [];
    for (let i = 0; i < prazoTotalMeses; i++) {
      if (i < periodoCarenciaMeses) {
        const jurosMensal = saldo * taxaJurosMensal;
        amortizacaoArray.push({
          periodo: (i + 1).toString(),
          cuota: parcelaJuros.toFixed(2),
          interes: jurosMensal.toFixed(2),
          amortizacion: "0.00",
          saldoPendiente: saldo.toFixed(2),
        });
      } else {
        const jurosMensal = saldo * taxaJurosMensal;
        const capitalMensal = parcelaNormal - jurosMensal;
        saldo -= capitalMensal;
        amortizacaoArray.push({
          periodo: (i + 1).toString(),
          cuota: parcelaNormal.toFixed(2),
          interes: jurosMensal.toFixed(2),
          amortizacion: capitalMensal.toFixed(2),
          saldoPendiente: saldo.toFixed(2),
        });
      }
    }
    setAmortizacao(amortizacaoArray);
  };

  const voltar = () => {
    navigation.goBack();
  };

  const verTabelaAmortizacao = () => {
    navigation.navigate("Tabla", { data: amortizacao });
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
      <Text style={styles.title}>Resultado do Cálculo</Text>
      <Anuncio />
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>
      <Text style={styles.resultText}>
        Parcela durante o período de carência (apenas juros): {parcelaCarencia}{" "}
        €
      </Text>
      <Text style={styles.resultText}>
        Parcela após o período de carência (normal): {parcelaNormal} €
      </Text>

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
    textAlign: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
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

  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "#555ff7",
    paddingHorizontal: 5,
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
    marginBottom: 50,
  },
  shareIcon: {
    position: "absolute", // Añade esta línea
    right: 20, // Ajusta según necesites
    top: 80, // Alinea con la parte superior
  },
});
