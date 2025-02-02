import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Anuncio from "../Anuncio";
import { useNavigation } from "@react-navigation/native";

export default function TabelaAmortizacaoParcela({ route }) {
  const navigation = useNavigation();
  const data = route.params.data || [];

  const voltar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Anuncio />
      <TouchableOpacity onPress={voltar} style={styles.touchableButtonV}>
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.columnHeader}>Período</Text>
        <Text style={styles.columnHeader}>Parcela</Text>
        <Text style={styles.columnHeader}>Juros</Text>
        <Text style={styles.columnHeader}>Amortiz.</Text>
        <Text style={styles.columnHeader}>Sdo. Dev.</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.periodo.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.periodo}</Text>
            <Text style={styles.column}>{item.cuota}€</Text>
            <Text style={styles.column}>{item.interes}€</Text>
            <Text style={styles.column}>{item.amortizacion}€</Text>
            <Text style={styles.column}>{item.saldoPendiente}€</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fffbde",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: "bold",
    flex: 1,
    marginTop: 40,
    backgroundColor: "#4df25c",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "#61d8eb",
    paddingHorizontal: 5,
    marginTop: 36,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#f4f8f8",
    fontWeight: "bold",
  },
});
