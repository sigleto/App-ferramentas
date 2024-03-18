import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const Herramientas = () => {
  const navigation = useNavigation();
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6921150380725872/5522660465';
  const navigateToHerramientas = (ruta) => {
    navigation.navigate(ruta);
  };

  const opciones = [
    { nombre: 'CALCULADORA DE EMPRÉSTIMO', ruta: 'Prestamo' },
    { nombre: 'CALCULADORA DE POUPANÇA', ruta: 'Ahorros' },
    { nombre: 'CALCULADORA DE INVESTIMENTO', ruta: 'CalculadoraInversiones' },
    { nombre: 'CONVERSOR DE MOEDA', ruta: 'Divisa' },
    { nombre: 'DESEMPENHO DE APOSENTADORIA', ruta: 'Jubilacion' },
    
    
    
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloOrg}>Escolha a ferramenta a ser usada</Text>
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
      <View style={styles.organismos}>
        {opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion.ruta}
            style={styles.opcion}
            onPress={() => navigateToHerramientas(opcion.ruta)}
          >
            <Text style={styles.opcionTexto}>{opcion.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  tituloOrg: {
    fontSize: 24,
    marginBottom: 20,
    marginTop:70,
    textAlign:'center',
    color:'#54722e',
    textDecorationLine:'underline'
  },
  organismos: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  opcion: {
    display:'flex',
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width:250,
    alignItems:'center'
  },
  opcionTexto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Herramientas;

