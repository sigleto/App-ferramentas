import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const PoliticaPrivacidad = () => {
  const navegacion = useNavigation();

  const salto = () => { navegacion.navigate("Home") }

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Política de privacidad de Herramientas Financieras:</Text>
        <Text style={styles.parrafo}>
          {"O aplicativo Ferramentas Financeiras foi desenvolvido como um aplicativo gratuito. Este SERVIÇO é fornecido gratuitamente e deve ser usado como está. Esta página é usada para informar os visitantes sobre nossas políticas relativas à coleta, uso e divulgação de Informações Pessoais se qualquer pessoa decidir usar meu Serviço. Se você optar por usar nosso Serviço, você concorda com a coleta e uso de informações relacionadas a esta política. As informações pessoais coletadas são usadas para fornecer e melhorar o Serviço. Não faremos isso usar ou compartilhar suas informações com qualquer pessoa, exceto conforme descrito nesta Política de Privacidade. Os termos usados ​​nesta Política de Privacidade têm os mesmos significados que em nossos Termos e Condições, que podem ser acessados ​​em Todo-Trámite, a menos que definido de outra forma nesta Política de Privacidade. \n\n" +
          "Coleta e uso de informações\n\nEste aplicativo não coleta nenhuma informação pessoal.\n\n" +
          "Link para a política de privacidade dos provedores de serviços terceirizados usados ​​pelo aplicativo\n\n" +
          "Google Play Services\nExpo\n\n" +
          "Cookies\n\nCookies são arquivos com uma pequena quantidade de dados que são comumente usados ​​como identificadores únicos anônimos. Eles são enviados para o seu navegador a partir dos sites que você visita e armazenados na memória interna do seu dispositivo. Este Serviço não os utiliza 'cookies' explicitamente. No entanto, o aplicativo pode usar códigos e bibliotecas de terceiros que usam 'cookies' para coletar informações e melhorar seus serviços. Você tem a opção de aceitar ou rejeitar esses cookies e saber quando um cookie é enviado para o seu dispositivo . Se você optar por rejeitar nossos cookies, talvez não consiga usar algumas partes deste Serviço.\n\n" +
          "Provedores de serviços\n\nPodemos contratar empresas e indivíduos terceirizados pelos seguintes motivos:\n\n" +
          "Para facilitar nosso Serviço;\n" +
          "Para fornecer o Serviço em nosso nome;\n" +
          " Para realizar serviços relacionados ao Serviço; ou\n" +
          "Para nos ajudar a analisar como use nosso serviço.\n\n" +
          "Segurança\n\nValorizamos sua confiança ao nos fornecer suas informações pessoais, por isso nos esforçamos para usar meios comercialmente aceitáveis ​​para protegê-las. Mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro e confiável e não podemos garantir sua segurança absoluta.\n\n" +
          "Links para outros sites\n\nEste serviço não contém links para outros sites.\n\n" +
          "Privacidade de Crianças\n\nEsses Serviços não são direcionados a pessoas menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças menores de 13 anos. Caso você descubra que uma criança menor de 13 anos forneceu nos fornecer informações pessoais, nós as excluiremos imediatamente de nossos servidores. Se você é pai ou responsável e sabe que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas cabíveis.\n\n" +
          "Alterações nesta Política de Privacidade\n\nPodemos atualizar nossa Política de Privacidade de tempos em tempos. Portanto, recomendamos que você verifique esta página periodicamente para verificar se há alterações. Iremos notificá-lo sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Esta política entra em vigor a partir de 2023-10-10\n\n" +
          "Entre em contato conosco\n\nSe você tiver alguma dúvida ou sugestão sobre nossa Política de Privacidade, não hesite em nos contatar em trianabaresapp@gmail.com."}


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

export default PoliticaPrivacidad;
