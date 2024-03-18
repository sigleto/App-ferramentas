import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from 'react-native-chart-kit';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function ResultadoJubilación({ route }) {
  const navigation = useNavigation();
  const { edadActual, edadJubilacion, montoActual, tasaInteres } = route.params;
  const [resultado, setResultado] = useState(null);
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6921150380725872/5522660465';
  const calcularJubilacion = () => {
    const tiempoRestante = edadJubilacion - edadActual;
    const montoFinal = montoActual * Math.pow((1 + tasaInteres / 100), tiempoRestante);
    setResultado({ montoFinal });
  };

  useEffect(() => {
    calcularJubilacion();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={DiasJubilacion}>
          <Text style={styles.buttonText}>Quanto tempo até você se aposentar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const DiasJubilacion = () => {
    navigation.navigate('DiasJubilacion');
  };

  const volver = () => {
    navigation.navigate('Home');
  };
  
//Datos gráfico
  const edadActualn = parseFloat(edadActual);
  const edadJubilacionn = parseFloat(edadJubilacion);

  const labels = [];
  for (let i = edadActualn; i <= edadJubilacionn; i += 5) {
    labels.push(i.toString());
  }

  return (
    <View>
      <Text style={styles.enunciado}>Dados inseridos</Text>
      <Text style={styles.labelText}>Idade atual: <Text style={styles.resultText}>{edadActual} años</Text></Text>
      <Text style={styles.labelText}>Idade de aposentadoira: <Text style={styles.resultText}>{edadJubilacion} años</Text></Text>
      <Text style={styles.labelText}>Poupança atual: <Text style={styles.resultText}>{montoActual} </Text></Text>
      <Text style={styles.labelText}>Taxa de juros anual: <Text style={styles.resultText}>{tasaInteres} %</Text></Text>
      <Text style={styles.enunciado}>Resultados</Text>
      <Text style={styles.labelText}> O valor estimado para a aposentadoria é:{" "} <Text style={styles.resultTextr}> {resultado && resultado.montoFinal ? parseFloat(resultado.montoFinal).toFixed(2) : "No disponible"} </Text> </Text>
      {/* Gráfico de rendimiento */}
      <Text style={styles.enunciado}>Gráfico de desempenho</Text>
      <LineChart
        data={{
          labels,
          datasets: [{
            data: Array.from({ length: edadJubilacion - edadActual + 1 }, (_, i) => montoActual * Math.pow((1 + tasaInteres / 100), i)),
          }],
        }}
        xAxisInterval={5}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        xLabelsOffset={-10}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
          xLabelRotation: 45,
          yLabelsOffset: -10,
          xLabel: 'Anos',
          yLabel: 'Dinheiro',
          propsForHorizontalLabels: { fontSize: 10 },
        }}
        bezier
        style={{ marginVertical: 4, borderRadius: 12 }}
        formatLabel={label => label.toString()}
      />
      <TouchableOpacity onPress={DiasJubilacion} style={styles.touchableButton}>
        <Text style={styles.buttonText}>Quanto tempo até você se aposentar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={volver} style={styles.touchableButtonV}>
        <Text style={styles.buttonTextV}>RETORNAR</Text>
      </TouchableOpacity>
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fffbde',
  },

  input: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },

  touchableButton: {
    marginVertical: 10,
    backgroundColor: '#555ff7',
    paddingHorizontal: 27,
    marginTop: 20,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 20,
    color: '#f4f8f8',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  resultText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign:'center'
  },
  resultTextr: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    fontWeight: 'bold',
    textAlign:'center'
  },

  enunciado: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom:20,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#28a745',
  },
  labelText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
   
  },
  touchableButtonV: {
    marginVertical: 10,
    backgroundColor: 'olive',
    paddingHorizontal:5,
    marginTop: 25,
    borderRadius: 10,
    alignSelf: 'center',

  },
   buttonTextV: {
    fontSize: 15,
    color: 'white',
  },
});