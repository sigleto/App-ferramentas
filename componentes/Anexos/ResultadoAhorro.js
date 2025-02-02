import React, { useState, useEffect } from "react";
import { Share, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import Anuncio from "./Anuncio";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResultadoAhorro({ route }) {
  const navigation = useNavigation();
  const { meta, tasaInteres, periodo, tipoInteres, unidadPeriodo } =
    route.params;
  const [ahorroNecesario, setAhorroNecesario] = useState("");
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/5522660465";
  const calcularAhorroNecesario = () => {
    const metaFloat = parseFloat(meta);
    const tasaInteresFloat = parseFloat(tasaInteres) / 100; // Tasa de interés anual
    const periodoFloat = parseFloat(periodo); // Periodo en años

    const tasaInteresMensual =
      tipoInteres === "anual"
        ? Math.pow(1 + tasaInteresFloat, 1 / 12) - 1
        : tasaInteresFloat;

    const ahorroNecesarioCalculado =
      metaFloat /
      ((Math.pow(1 + tasaInteresMensual, periodoFloat * 12) - 1) /
        tasaInteresMensual);

    setAhorroNecesario(
      isNaN(ahorroNecesarioCalculado)
        ? "0"
        : ahorroNecesarioCalculado.toFixed(2).toString()
    );
  };

  useEffect(() => {
    calcularAhorroNecesario();
  }, [navigation]);

  const volver = () => {
    navigation.navigate("Home");
  };

  // Datos para el gráfico
  const intervaloEtiquetas = 5; // Mostrar una etiqueta para cada cinco períodos

  const labels = Array.from({ length: parseFloat(periodo) }, (_, i) => {
    if ((i + 1) % intervaloEtiquetas === 0 || i === parseFloat(periodo) - 1) {
      return (i + 1).toString();
    } else {
      return "";
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: Array.from({ length: parseFloat(periodo) }, (_, i) => {
          const ahorroCalculado = parseFloat(ahorroNecesario * 12) * (i + 1);
          return parseFloat(ahorroCalculado.toFixed(2));
        }),
      },
    ],
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
    <View style={styles.container}>
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
        Meta de poupança: <Text style={styles.resultText}>{meta}</Text>
      </Text>
      <Text style={styles.labelText}>
        Taxa de juros: <Text style={styles.resultText}>{tasaInteres} %</Text>
      </Text>
      <Text style={styles.labelText}>
        Período:{" "}
        <Text style={styles.resultText}>
          {periodo} {unidadPeriodo}
        </Text>
      </Text>
      <Text style={styles.enunciado}>Resultado</Text>
      <Text style={styles.labelText}>
        Poupança mensal necessária:{" "}
        <Text style={styles.resultText}>
          {parseFloat(ahorroNecesario).toFixed(2)}
        </Text>
      </Text>
      {ahorroNecesario ? (
        <View>
          <LineChart
            data={data}
            width={350}
            height={220}
            yAxisLabel="Ahorro acumulado"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.labelXAxis}>Anos</Text>
        </View>
      ) : (
        <Text>Não há dados disponíveis para exibir o gráfico.</Text>
      )}
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
  resultText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
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
  labelText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  labelXAxis: {
    alignSelf: "center",
    marginTop: 10,
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "#555ff7",
    paddingHorizontal: 20,

    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#f4f8f8",
    textAlign: "center",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    position: "relative", // Añade esta línea
  },
  shareIcon: {
    position: "absolute", // Añade esta línea
    right: 20, // Ajusta según necesites
    top: 80, // Alinea con la parte superior
  },
});
