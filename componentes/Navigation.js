import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CalculadoraAhorros from "./enlaces/CalculadoraAhorros";
import RentabilidadAcciones from "./enlaces/RentabilidadAcciones";
import SimuladorJubilacion from "./enlaces/SimuladorJubilacion";
import CalculadoraPrestamos from "./enlaces/CalculadoraPrestamo";
import ConversorDivisas from "./enlaces/ConversorDivisas";
import Herramientas from "./Herramientas";
import TablaAmortizacion from "./Anexos/TablasAmortizacion/TablaPrestamo";
import Home from "./Home";
import DiasJubilacion from "./Anexos/DiasJubilacion";
import PoliticaPrivacidad from "./Anexos/PoliticaPrivacidad";
import DescargoResponsabilidad from "./Anexos/DescargoResponsabilidad";
import CalculadoraInversiones from "./enlaces/CalculadoraInversiones";
import ResultadosPrestamo from "./Anexos/ResultadosPrestamo";
import ResultadoJubilación from "./Anexos/ResultadoJubilación";
import ResultadoInversiones from "./Anexos/ResultadoInversiones";
import ResultadoAhorro from "./Anexos/ResultadoAhorro";
import TablaInversion from "./Anexos/TablasAmortizacion/TablaInversion";
import CalculadoraRentaInmediata from "./enlaces/CalculadoraRentaInmediata";
import ResultadosRendaImediata from "./Anexos/ResultadoRentaInmediata";

import SimuladoresHipotecarios from "./enlaces/SimuladoresHipotecarios";
import CalculadoraHipotecaria from "./enlaces/CalculadoraHipoteca";
import CalculadoraCarencia from "./enlaces/CalculadoraCarencia";
import CalculadoraAmortAntecipada from "./enlaces/CalculadoraAmortAnticipada";
import ResultadoHipoteca from "./Anexos/ResultadoHipoteca";
import ResultadoCarencia from "./Anexos/ResultadoCarencia";
import ResultadoAmortizacaoAntecipada from "./Anexos/ResultadoAmortAnticipada";
import TabelaAmortizacaoParcela from "./Anexos/TablasAmortizacion/TablaAmortCuota";
import TabelaAmortizacaoPrazo from "./Anexos/TablasAmortizacion/TablaAmortPlazo";

const Stack = createStackNavigator();

export function HerramientasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HerramientasStack"
        component={Herramientas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Prestamo"
        component={CalculadoraPrestamos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ahorros"
        component={CalculadoraAhorros}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Divisa"
        component={ConversorDivisas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Jubilacion"
        component={SimuladorJubilacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acciones"
        component={RentabilidadAcciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabla"
        component={TablaAmortizacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiasJubilacion"
        component={DiasJubilacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PoliticaPrivacidad"
        component={PoliticaPrivacidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DescargoResponsabilidad"
        component={DescargoResponsabilidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculadoraInversiones"
        component={CalculadoraInversiones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadosPrestamo"
        component={ResultadosPrestamo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoJubilacion"
        component={ResultadoJubilación}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoInversiones"
        component={ResultadoInversiones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoAhorro"
        component={ResultadoAhorro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TablaInversion"
        component={TablaInversion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculadoraRentaInmediata"
        component={CalculadoraRentaInmediata}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoRentaInmediata"
        component={ResultadosRendaImediata}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SimuladoresHipotecarios"
        component={SimuladoresHipotecarios}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculadoraHipoteca"
        component={CalculadoraHipotecaria}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculadoraCarencia"
        component={CalculadoraCarencia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalculadoraAmortAnticipada"
        component={CalculadoraAmortAntecipada}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoHipoteca"
        component={ResultadoHipoteca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoCarencia"
        component={ResultadoCarencia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultadoAmortAnticipada"
        component={ResultadoAmortizacaoAntecipada}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TablaAmortCuota"
        component={TabelaAmortizacaoParcela}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TablaAmortPlazo"
        component={TabelaAmortizacaoPrazo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function PrincipalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Herramientas"
        component={HerramientasStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Descargo"
        component={DescargoResponsabilidad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Politica"
        component={PoliticaPrivacidad}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
