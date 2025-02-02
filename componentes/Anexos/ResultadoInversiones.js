// ResultadoInversiones.js
import React, { useState, useEffect } from "react";
import { Share, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import Anuncio from "./Anuncio";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultadoInversiones({ route }) {
  const navigation = useNavigation();
  const { principal, rate, time, contributions, tipoInteres, unidadPeriodo } =
    route.params;
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";
  const [result, setResult] = useState(null);
  const [totalIntereses, setTotalIntereses] = useState(""); // Agrega este estado
  const [totalPagado, setTotalPagado] = useState("");
  const [rendimientoAcumulado, setRendimientoAcumulado] = useState("");
  const [ganancia, setGanancia] = useState("");

  const calculateInvestment = () => {
    const principalAmount = parseFloat(principal);
    const ratePercentage = parseFloat(rate) / 100;
    const timePeriod = parseFloat(time);
    const annualContributions = parseFloat(contributions);

    let totalIntereses = 0;
    let totalPagado = principalAmount; // Empieza con el capital inicial
    let rendimientoAcumulado = 0;

    if (tipoInteres === "anual" && unidadPeriodo === "años") {
      // Caso de interés anual y período en años
      for (let i = 0; i < timePeriod; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions + interest;
      }
    } else if (tipoInteres === "anual" && unidadPeriodo === "meses") {
      // Caso de interés anual y período en meses
      const totalMonths = timePeriod;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * (ratePercentage / 12);
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    } else if (tipoInteres === "mensual" && unidadPeriodo === "años") {
      const totalMonths = timePeriod * 12; // Convertir años a meses
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    } else if (tipoInteres === "mensual" && unidadPeriodo === "meses") {
      // Caso de interés mensual y período en meses
      const totalMonths = timePeriod;
      for (let i = 0; i < totalMonths; i++) {
        const interest = totalPagado * ratePercentage;
        totalIntereses += interest;
        totalPagado += annualContributions / 12 + interest;
      }
    }

    rendimientoAcumulado = totalPagado - principalAmount;

    setResult(totalPagado.toFixed(2));
    setTotalIntereses(totalIntereses.toFixed(2));
    setTotalPagado(totalPagado.toFixed(2));
    setRendimientoAcumulado(rendimientoAcumulado.toFixed(2));
    setGanancia(rendimientoAcumulado.toFixed(2));
  };

  // Llama a calculateInvestment en useEffect para calcular al renderizar el componente
  useEffect(() => {
    calculateInvestment();
  }, [navigation]);

  const AccesoTabla = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const c = parseFloat(contributions);

    const periodo = unidadPeriodo === "años" ? 12 : 1;
    const n = unidadPeriodo === "años" ? t : t / 12; // Ajusta el cálculo para meses

    const periodicRate =
      tipoInteres === "anual" ? r / 100 : Math.pow(1 + r / 100, 12) - 1;

    let saldoPendiente = p;
    let rendimientoTotal = 0;
    const data = [];

    for (let i = 1; i <= n; i++) {
      const interesPeriodo = saldoPendiente * periodicRate;
      const valorFuturo = saldoPendiente + interesPeriodo + c;
      const rendimientoPeriodo = valorFuturo - saldoPendiente - c;

      data.push({
        periodo: i,
        saldo: valorFuturo.toFixed(2),
        rendimientoPeriodo: rendimientoPeriodo.toFixed(2),
        rendimientoAcumulado: (rendimientoTotal + rendimientoPeriodo).toFixed(
          2
        ),
      });

      rendimientoTotal += rendimientoPeriodo;
      saldoPendiente = valorFuturo;
    }

    // Asegúrate de pasar unidadPeriodo correctamente
    navigation.navigate("TablaInversion", {
      data,
      unidadPeriodo: unidadPeriodo,
      rendimientoAcumulado,
      totalIntereses: totalIntereses, // Si es necesario, coloca el valor correcto aquí
      totalPagado: totalPagado, // Si es necesario, coloca el valor correcto aquí
    });
  };

  const volver = () => {
    navigation.navigate("Home");
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
    <View>
      <Anuncio />
      <Text style={styles.enunciado}>Dados inseridos</Text>
      <TouchableOpacity onPress={shareApp} style={styles.shareIcon}>
        <MaterialCommunityIcons
          name="share-variant"
          size={24}
          color="#007BFF"
        />
      </TouchableOpacity>
      <Text style={styles.labelText}>
        Capital: <Text style={styles.resultText}>{principal}</Text>
      </Text>
      <Text style={styles.labelText}>
        Taxa de juro: <Text style={styles.resultText}>{rate}%</Text>
      </Text>
      <Text style={styles.labelText}>
        Período:{" "}
        <Text style={styles.resultText}>
          {time} {unidadPeriodo}
        </Text>
      </Text>
      <Text style={styles.labelText}>
        Contribuições anuais:{" "}
        <Text style={styles.resultText}>{contributions} </Text>
      </Text>
      <Text style={styles.enunciado}>Resultado</Text>
      <Text style={styles.labelText}>
        Valor futuro: <Text style={styles.resultText}>{result}</Text>
      </Text>
      <Text style={styles.labelText}>
        Retorno do Inverstimento:{" "}
        <Text style={styles.resultText}>{ganancia}</Text>
      </Text>

      <TouchableOpacity onPress={AccesoTabla} style={styles.touchableButton}>
        <Text style={styles.buttonText}>Acceso á mesa</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={volver} style={styles.touchableButtonV}>
        <Text style={styles.buttonText}>RETORNAR</Text>
      </TouchableOpacity>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fffbde",
  },

  input: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  resultTextr: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },

  enunciado: {
    marginTop: 40,
    fontSize: 25,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
  },

  label: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#28a745",
  },
  labelText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "#555ff7",
    paddingHorizontal: 5,
    marginTop: 100,
    borderRadius: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    position: "relative",
  },
  shareIcon: {
    position: "absolute",
    right: 20,
    top: 40,
  },
});
