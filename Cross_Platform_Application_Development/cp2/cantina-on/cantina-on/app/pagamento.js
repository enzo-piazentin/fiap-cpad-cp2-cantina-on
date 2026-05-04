import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Pagamento() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titulo}>Pagamento</Text>

      <View style={styles.opcoesContainer}>
        <TouchableOpacity style={styles.opcao}>
          <Text style={styles.opcaoTexto}>📱 Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao}>
          <Text style={styles.opcaoTexto}>💳 Cartão de Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao}>
          <Text style={styles.opcaoTexto}>💵 Cartão de Débito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao}>
          <Text style={styles.opcaoTexto}>🍽️ Refeição</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total: R$ 8.50</Text>
        <TouchableOpacity
          style={styles.botaoConfirmar}
          onPress={() => alert('Pedido confirmado!')}
        >
          <Text style={styles.botaoTexto}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  opcoesContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  opcao: {
    backgroundColor: '#0D0D0D',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#424242',
  },
  opcaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalContainer: {
    backgroundColor: '#0D0D0D',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#424242',
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  botaoConfirmar: {
    backgroundColor: '#FF007F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});