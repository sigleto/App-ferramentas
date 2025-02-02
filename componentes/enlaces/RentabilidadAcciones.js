import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

const MARKETSTACK_API_ACCESS_KEY = process.env.MARKETSTACK_API_ACCESS_KEY;
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
export default function RentabilidadeAcoes() {
  const [symbol, setSymbol] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoCompra, setPrecoCompra] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cotacaoAtual, setCotacaoAtual] = useState(null);
  const [erro, setErro] = useState(null);

  const calcularRentabilidade = async () => {
    try {
      const response = await axios.get(
        `http://api.marketstack.com/v1/tickers/${symbol}/eod/latest?access_key=${MARKETSTACK_API_ACCESS_KEY}&exchange=MADRID`
      );

      if (response.data) {
        const stockData = response.data;
        const precoAtual = stockData.close; // Alterar para a propriedade correta de acordo com a resposta do Marketstack
        setCotacaoAtual(precoAtual);
        const quantidadeAcao = parseInt(quantidade);
        const investimentoTotal = quantidadeAcao * parseFloat(precoCompra);
        const valorAtual = quantidadeAcao * precoAtual;
        const rentabilidade = valorAtual - investimentoTotal;
        console.log(precoAtual);
        setResultado(rentabilidade.toFixed(2).toString());
        setErro(null); // Limpar mensagem de erro se existia anteriormente
      } else {
        setErro("O símbolo da ação não existe.");
      }
    } catch (error) {
      console.error("Erro na solicitação dos dados da ação:", error);
      setErro("Erro ao obter os dados da ação");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Rentabilidade de Ações</Text>

      <TextInput
        style={styles.input}
        placeholder="Símbolo da Ação (exemplo: AAPL)"
        value={symbol}
        onChangeText={(text) => setSymbol(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade de Ações"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={(text) => setQuantidade(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço de Compra por Ação"
        keyboardType="numeric"
        value={precoCompra}
        onChangeText={(text) => setPrecoCompra(text)}
      />

      <Button title="Calcular Rentabilidade" onPress={calcularRentabilidade} />

      {erro && <Text style={styles.error}>{erro}</Text>}

      {resultado !== null && (
        <Text style={styles.result}>
          A rentabilidade estimada é: {resultado}
        </Text>
      )}

      {cotacaoAtual !== null && (
        <Text style={styles.result}>Cotação atual: {cotacaoAtual}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
});
