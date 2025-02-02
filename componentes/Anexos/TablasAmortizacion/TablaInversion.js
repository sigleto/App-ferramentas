import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Anuncio from "../Anuncio";
export default function TablaInversion({ route }) {
  const navigation = useNavigation();
  const data = route.params.data || [];

  const volver = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Anuncio />

      <View style={styles.header}>
        <Text style={styles.columnHeader}>Periodo(Anos) </Text>
        <Text style={styles.columnHeader}>Saldo</Text>
        <Text style={styles.columnHeader}>Desempenho Periodo</Text>
        <Text style={styles.columnHeader}>Desempenho cumulativo</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.periodo.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.periodo}</Text>
            <Text style={styles.column}>{item.saldo}</Text>
            <Text style={styles.column}>{item.rendimientoPeriodo}</Text>
            <Text style={styles.column}>{item.rendimientoAcumulado}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={volver} style={styles.touchableButtonV}>
        <Text style={styles.buttonText}>RETORNAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 81,
  },
  columnHeader: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  touchableButtonV: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
