import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Anuncio from "../Anexos/Anuncio";
import { useNavigation } from "@react-navigation/native";

const API_KEY = process.env.API_KEY;

const moedas = [
  { codigo: "USD", nome: "Dólar americano" },
  { codigo: "EUR", nome: "Euro" },
  { codigo: "AUD", nome: "Dólar australiano" },
  { codigo: "ARS", nome: "Peso argentino" },
  { codigo: "UYU", nome: "Peso uruguaio" },
  { codigo: "CLP", nome: "Peso chileno" },
  { codigo: "COP", nome: "Peso colombiano" },
  { codigo: "PEN", nome: "Sol peruano" },
  { codigo: "PYG", nome: "Guarani paraguaio" },
  { codigo: "CRC", nome: "Colón costarriquenho" },
  { codigo: "MXN", nome: "Peso mexicano" },
  { codigo: "BGN", nome: "Lev búlgaro" },
  { codigo: "BRL", nome: "Real brasileiro" },
  { codigo: "CAD", nome: "Dólar canadense" },
  { codigo: "CHF", nome: "Franco suíço" },
  { codigo: "CNY", nome: "Yuan chinês" },
  { codigo: "CZK", nome: "Coroa checa" },
  { codigo: "DKK", nome: "Coroa dinamarquesa" },
  { codigo: "GBP", nome: "Libra esterlina" },
  { codigo: "HKD", nome: "Dólar de Hong Kong" },
  { codigo: "HRK", nome: "Kuna croata" },
  { codigo: "HUF", nome: "Florim húngaro" },
  { codigo: "IDR", nome: "Rupia indonésia" },
  { codigo: "ILS", nome: "Novo shekel israelense" },
  { codigo: "INR", nome: "Rupia indiana" },
  { codigo: "ISK", nome: "Coroa islandesa" },
  { codigo: "JPY", nome: "Iene japonês" },
  { codigo: "KRW", nome: "Won sul-coreano" },
  { codigo: "MYR", nome: "Ringgit malaio" },
  { codigo: "NOK", nome: "Coroa norueguesa" },
  { codigo: "NZD", nome: "Dólar neozelandês" },
  { codigo: "PHP", nome: "Peso filipino" },
  { codigo: "PLN", nome: "Złoty polonês" },
  { codigo: "RON", nome: "Leu romeno" },
  { codigo: "RUB", nome: "Rublo russo" },
  { codigo: "SEK", nome: "Coroa sueca" },
  { codigo: "SGD", nome: "Dólar singapuriano" },
  { codigo: "THB", nome: "Baht tailandês" },
  { codigo: "TRY", nome: "Lira turca" },
  { codigo: "ZAR", nome: "Rand sul-africano" },
];

export default function ConversorMoedas() {
  const [moedaOrigem, setMoedaOrigem] = useState("USD");
  const [moedaDestino, setMoedaDestino] = useState("EUR");
  const [taxaCambio, setTaxaCambio] = useState("");
  const [resultado, setResultado] = useState("");
  const [mostrarTelaNumerica, setMostrarTelaNumerica] = useState(true);
  const [quantidadeIntroduzida, setQuantidadeIntroduzida] = useState("");
  const [mensagemEstado, setMensagemEstado] = useState("");
  const [erro, setErro] = useState("");

  const obterTaxaCambio = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${moedaOrigem}`
      );
      const data = await response.json();

      if (response.ok) {
        if (
          data &&
          data.conversion_rates &&
          data.conversion_rates[moedaDestino]
        ) {
          const taxaCambio = data.conversion_rates[moedaDestino];
          setTaxaCambio(taxaCambio.toString());
          setMensagemEstado(
            `Quantidade introduzida: ${quantidadeIntroduzida} ${moedaOrigem}`
          );
          setErro(""); // Limpar qualquer erro anterior
        } else {
          setErro("Erro: A moeda de origem ou destino não está disponível.");
        }
      } else {
        setErro("Erro ao obter a taxa de câmbio");
      }
    } catch (error) {
      setErro("Erro na solicitação da taxa de câmbio");
    }
  };

  const converterMoedas = () => {
    if (taxaCambio === "") {
      setErro("Primeiro você deve obter a taxa de câmbio");
      return;
    }

    setErro(""); // Limpar a mensagem de erro se existir
    const quantidadeFloat = parseFloat(quantidadeIntroduzida);
    const resultadoCalculado = quantidadeFloat * parseFloat(taxaCambio);
    setResultado(resultadoCalculado.toFixed(2).toString());
  };

  const ocultarTelaNumerica = () => {
    setMostrarTelaNumerica(false);
  };

  const navigation = useNavigation();
  const voltar = () => {
    navigation.navigate("Home");
  };
  console.log(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${moedaOrigem}`
  );
  return (
    <View style={styles.container}>
      <Anuncio />
      {mostrarTelaNumerica && (
        <>
          <Text style={styles.label}>Quantidade a converter</Text>
          <Input
            keyboardType="numeric"
            value={quantidadeIntroduzida}
            onChangeText={(text) => setQuantidadeIntroduzida(text)}
            inputStyle={{ fontSize: 20, color: "olive" }}
            style={styles.input}
            autoFocus={true}
          />
        </>
      )}
      <Text style={styles.label}>Moeda de origem</Text>
      <Picker
        style={{ height: 50, width: 200 }}
        selectedValue={moedaOrigem}
        onValueChange={(itemValue) => setMoedaOrigem(itemValue)}
      >
        {moedas.map((moeda) => (
          <Picker.Item
            key={moeda.codigo}
            label={moeda.nome}
            value={moeda.codigo}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Moeda de destino</Text>
      <Picker
        style={{ height: 50, width: 200 }}
        selectedValue={moedaDestino}
        onValueChange={(itemValue) => setMoedaDestino(itemValue)}
      >
        {moedas.map((moeda) => (
          <Picker.Item
            key={moeda.codigo}
            label={moeda.nome}
            value={moeda.codigo}
          />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={() => {
          obterTaxaCambio();
        }}
        style={styles.touchableButton}
      >
        <Text style={styles.buttonText}>Obter Taxa de Câmbio</Text>
      </TouchableOpacity>
      {taxaCambio !== "" && (
        <View>
          <Text style={styles.resultText}>{mensagemEstado}</Text>
          <Text style={styles.resultText}>
            Taxa de Câmbio: 1 {moedaOrigem} = {taxaCambio} {moedaDestino}
          </Text>
        </View>
      )}

      {erro !== "" && <Text style={styles.errorText}>{erro}</Text>}

      <TouchableOpacity
        onPress={converterMoedas}
        style={styles.touchableButton}
      >
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>
      {resultado !== "" && (
        <Text style={styles.resultText}>
          Resultado: {resultado} {moedaDestino}
        </Text>
      )}

      <TouchableOpacity onPress={voltar} style={styles.touchableButtonV}>
        <Text style={styles.buttonTextV}>VOLTAR</Text>
      </TouchableOpacity>
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
    marginBottom: 18,
    textAlign: "center",
    fontSize: 26,
  },
  touchableButton: {
    marginVertical: 10,
    backgroundColor: "#555ff7",
    paddingHorizontal: 27,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 22,
    color: "#f4f8f8",
  },
  buttonTextV: {
    fontSize: 25,
    color: "white",
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: "olive",
    paddingHorizontal: 5,
    marginTop: 25,
    borderRadius: 10,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
