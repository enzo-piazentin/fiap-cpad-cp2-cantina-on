import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrinho() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      const storedCart = await AsyncStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log('AsyncStorage não disponível, usando carrinho vazio');
      setCartItems([]); // Carrinho vazio quando não há AsyncStorage
    } finally {
      setIsLoading(false);
    }
  };

  const saveCartItems = async (items) => {
    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.log('AsyncStorage não disponível, atualizando apenas estado local');
      setCartItems(items); // Apenas atualiza estado local
    }
  };

  const aumentarQuantidade = (productId, currentQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: currentQuantity + 1 }
        : item
    );
    saveCartItems(updatedItems);
  };

  const diminuirQuantidade = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const updatedItems = cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: currentQuantity - 1 }
          : item
      );
      saveCartItems(updatedItems);
    } else {
      Alert.alert(
        'Remover Item',
        'Deseja remover este item do carrinho?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Remover',
            style: 'destructive',
            onPress: () => removerItem(productId)
          }
        ]
      );
    }
  };

  const removerItem = (productId) => {
    Alert.alert(
      'Remover Item',
      'Deseja remover este item do carrinho?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            const updatedItems = cartItems.filter(item => item.id !== productId);
            saveCartItems(updatedItems);
          }
        }
      ]
    );
  };

  const getCartTotalValue = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const getImageSource = (productName) => {
    // Try to match product names with available images
    const imageMap = {
      'Coxinha': require('../../assets/imagemCoxinha.png'),
      'Coca-Cola': require('../../img/coca.png'),
      'Sanduíche Natural': require('../../assets/imagemSanduicheNatural.png'),
      'Mini Pães de Queijo': require('../../assets/imagemMiniPaesDeQueijo.png'),
      'Mini Salgado Assado': require('../../assets/imagemSalgado.png'),
      'Bolo de Pote Cookies': require('../../assets/imagemBoloDePote.png'),
      'Barra de Chocolate': require('../../assets/imagemBarraDeChocolate.png'),
      'Água Mineral': require('../../assets/imagemAguaMineral.png'),
      'Café Expresso': require('../../assets/imagemCafe.png'),
      'Suco de Laranja': require('../../assets/imagemSucoDeLaranja.png'),
      'Energético': require('../../assets/imagemEnergetico.png'),
    };
    
    // Return matching image or default placeholder
    return imageMap[productName] || null;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Meu Carrinho</Text>
        
        {cartItems.length === 0 ? (
          <View style={styles.carrinhoVazioContainer}>
            <Text style={styles.carrinhoVazioText}>Seu carrinho está vazio</Text>
            <TouchableOpacity
              style={styles.continuarComprandoButton}
              onPress={() => router.push('/tabs/produtos')}
            >
              <Text style={styles.continuarComprandoText}>Continuar Comprando</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.produtoContainer}>
              <View style={styles.imagemContainer}>
                {getImageSource(item.nome) ? (
                  <Image
                    source={getImageSource(item.nome)}
                    style={styles.produtoImagem}
                  />
                ) : (
                  <View style={styles.imagemPlaceholder}>
                    <Text style={styles.placeholderText}>🍽️</Text>
                  </View>
                )}
              </View>
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoPreco}>{item.preco}</Text>
                <Text style={styles.produtoDescricao}>{item.descricao}</Text>
                <View style={styles.quantidadeContainer}>
                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() => diminuirQuantidade(item.id, item.quantity)}
                  >
                    <Text style={styles.botaoQuantidadeTexto}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantidadeTexto}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() => aumentarQuantidade(item.id, item.quantity)}
                  >
                    <Text style={styles.botaoQuantidadeTexto}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => removerItem(item.id)}
                  >
                    <Text style={styles.botaoRemoverTexto}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total: R$ {getCartTotalValue().toFixed(2).replace('.', ',')}</Text>
          <TouchableOpacity
            style={styles.botaoPagar}
            onPress={() => router.push('/pagamento')}
          >
            <Text style={styles.botaoPagarTexto}>Ir para Pagamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  carrinhoVazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  carrinhoVazioText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#BDBDBD',
    marginBottom: 20,
  },
  continuarComprandoButton: {
    backgroundColor: '#FF007F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continuarComprandoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  produtoContainer: {
    backgroundColor: '#0D0D0D',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#424242',
  },
  imagemContainer: {
    marginRight: 15,
  },
  produtoImagem: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imagemPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#4B163B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 30,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  produtoPreco: {
    fontSize: 14,
    color: '#FF007F',
    fontWeight: '600',
    marginBottom: 5,
  },
  produtoDescricao: {
    fontSize: 12,
    color: '#BDBDBD',
    marginBottom: 10,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoQuantidade: {
    backgroundColor: '#BD1E7C',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoQuantidadeTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantidadeTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  botaoRemover: {
    backgroundColor: '#FF4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  botaoRemoverTexto: {
    fontSize: 16,
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
  botaoPagar: {
    backgroundColor: '#FF007F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoPagarTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});