import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const DescargoResponsabilidad = () => {
  const navegacion = useNavigation();

  const salto = () => { navegacion.navigate("Home") }

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Hoja de Descargo de Responsabilidad:</Text>
        <Text style={styles.parrafo}>
          {"Este aplicativo é uma ferramenta de simulação financeira e não deve ser utilizado como serviço financeiro. Não substitui o aconselhamento financeiro profissional.\n\n" +
          "Este aplicativo não oferece empréstimos pessoais nem está vinculado a nenhuma empresa terceirizada que ofereça empréstimos. Também não oferece taxa percentual anual (APR) ou taxas ou outros custos. . Os cálculos são apenas estimativas e podem não ser precisos.\n\n" +
          "As recomendações nesta aplicação podem não ser apropriadas para sua situação financeira e preferências de risco e retorno. Você deve sempre consultar um consultor financeiro profissional antes de tomar qualquer decisão financeira importante.\n\n" +
          "Adições específicas ao seu aplicativo\n\n" +
          "Cálculo do empréstimo:\n" +
          "Este aplicativo não leva em consideração suas circunstâncias individuais, como histórico de crédito, receitas ou despesas.\n" +
          "Os cálculos neste aplicativo são baseados em suposições e podem não ser exatos.\n" +
          "Planejamento de aposentadoria:\n" +
          "Este aplicativo não leva em consideração suas metas individuais de aposentadoria, como quanto dinheiro você deseja economizar ou quando deseja se aposentar.\n" +
          "Os cálculos neste aplicativo são baseados em suposições e podem não ser exatos.\n" +
          "Cálculo de possíveis lucros em ações:\n" +
          "Este aplicativo não leva em consideração o risco associado ao investimento em ações.\n" +
          "Os cálculos neste aplicativo são baseados em suposições e podem não ser exatos.\n" +
          "Conversor de moeda:\n" +
          "As taxas de câmbio usadas neste aplicativo são apenas estimativas e podem não ser precisas.\n" +
          "Cálculo dos rendimentos dos produtos:\n" +
          "Esta aplicação não leva em consideração o risco associado ao investimento em produtos financeiros.\n" +
          "Os cálculos nesta aplicação são baseados em suposições e podem não ser exatos."

}
        </Text>
      </SharedElement>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
    color: '#007BFF', // Color del título
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333', // Color del texto
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: '#007BFF', // Color del botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
  },
});

export default DescargoResponsabilidad;
