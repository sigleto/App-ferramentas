import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const Herramientas = () => {
  const navigation = useNavigation();
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-6921150380725872/2360831572";

  const navigateToHerramientas = (rota) => {
    navigation.navigate(rota);
  };

  const opcoes = [
    {
      nome: "CALCULADORA DE EMPRÉSTIMOS",
      rota: "Prestamo",
      icone: "calculator",
    },
    {
      nome: "CALCULADORA DE POUPANÇA",
      rota: "Ahorros",
      icone: "piggy-bank",
    },
    {
      nome: "CALCULADORA DE INVESTIMENTOS",
      rota: "CalculadoraInversiones",
      icone: "chart-line",
    },
    {
      nome: "CONVERSOR DE MOEDAS",
      rota: "Divisa",
      icone: "currency-usd",
    },
    {
      nome: "COTAÇÃO DE AÇÕES NY",
      rota: "Acciones",
      icone: "finance",
    },
    {
      nome: "RENDIMENTO PARA APOSENTADORIA",
      rota: "Jubilacion",
      icone: "cash-multiple",
    },
    {
      nome: "RENDA IMEDIATA",
      rota: "CalculadoraRentaInmediata",
      icone: "cash-multiple",
    },
    {
      nome: "SIMULADORES HIPOTECÁRIOS",
      rota: "SimuladoresHipotecarios",
      icone: "cash-multiple",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.tituloOrg}>Ferramentas Financeiras</Text>
        </View>

        <View style={styles.organismos}>
          {opcoes.map((opcao) => (
            <TouchableOpacity
              key={opcao.rota}
              style={styles.opcao}
              onPress={() => navigateToHerramientas(opcao.rota)}
            >
              <MaterialCommunityIcons
                name={opcao.icone}
                size={24}
                color="#fff"
                style={styles.opcaoIcone}
              />
              <Text style={styles.opcaoTexto}>{opcao.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          style={styles.bannerAd}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  tituloOrg: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  bannerAd: {
    marginBottom: 20,
    alignSelf: "center",
  },
  organismos: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  opcaoIcone: {
    marginRight: 15,
  },
  opcaoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    flexWrap: "wrap",
  },
});

export default Herramientas;
