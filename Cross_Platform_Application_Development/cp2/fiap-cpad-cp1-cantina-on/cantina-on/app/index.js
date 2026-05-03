import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const imagem = {
    source: require('../img/MascoteOn.png')
  };

  return (
    <View style={styles.container}>
      <Image
        source={imagem.source}
        style={styles.avatar}
      />

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/carrinho')}>
          <Text style={styles.menuItemText}>🛒 Meu Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/addSaldo')}>
          <Text style={styles.menuItemText}>💰 Adicionar Saldo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ajuda')}>
          <Text style={styles.menuItemText}>❓ Ajuda e Suporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#000000' 
  },
  titulo: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 24,
    color: '#FFFFFF'
  },
  botaoTexto: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  menuContainer: {
    backgroundColor: '#0D0D0D',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#424242',
  },
  menuItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  menuItemSair: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  menuItemTextSair: {
    fontSize: 18,
    color: '#FF007F', 
    fontWeight: 'bold',
  },
});