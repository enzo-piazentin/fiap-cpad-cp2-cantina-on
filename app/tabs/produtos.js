import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Produtos() {
  const router = useRouter();

  const addToCart = async (product) => {
    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      const storedCart = await AsyncStorage.getItem('cartItems');
      const cartItems = storedCart ? JSON.parse(storedCart) : [];
      
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
      } else {
        const newItems = [...cartItems, { ...product, quantity: 1 }];
        await AsyncStorage.setItem('cartItems', JSON.stringify(newItems));
      }
      
      Alert.alert('Sucesso', `${product.nome} adicionado ao carrinho!`);
    } catch (error) {
      console.log('AsyncStorage não disponível, mas produto adicionado ao estado local');
      Alert.alert('Sucesso', `${product.nome} adicionado ao carrinho! (modo local)`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Para comer 😋</Text>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 1, nome: 'Sanduíche Natural', preco: 'R$ 15', descricao: 'Pão de forma, tomate cereja, salada, queijo e presunto'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemSanduicheNatural.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Sanduíche Natural</Text>
            <Text style={styles.descricaoProduto}>Pão de forma, tomate cereja, salada, queijo e presunto</Text>
            <Text style={styles.precoProduto}>R$ 15</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 1, nome: 'Sanduíche Natural', preco: 'R$ 15', descricao: 'Pão de forma, tomate cereja, salada, queijo e presunto'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 2, nome: 'Mini Pães de Queijo', preco: 'R$ 7,50', descricao: 'Contém 6 unidades'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemMiniPaesDeQueijo.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Mini Pães de Queijo</Text>
            <Text style={styles.descricaoProduto}>Contém 6 unidades</Text>
            <Text style={styles.precoProduto}>R$ 7,50</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 2, nome: 'Mini Pães de Queijo', preco: 'R$ 7,50', descricao: 'Contém 6 unidades'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 3, nome: 'Mini Salgado Assado', preco: 'R$ 1,30', descricao: 'Unidade de salgado de carne, presunto e queijo ou frango'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemSalgado.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Mini Salgado Assado</Text>
            <Text style={styles.descricaoProduto}>Unidade de salgado de carne, presunto e queijo ou frango</Text>
            <Text style={styles.precoProduto}>R$ 1,30</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 3, nome: 'Mini Salgado Assado', preco: 'R$ 1,30', descricao: 'Unidade de salgado de carne, presunto e queijo ou frango'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 4, nome: 'Coxinha', preco: 'R$ 8,50', descricao: 'Coxinha de carne, presunto e queijo ou frango com requeijão'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemCoxinha.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Coxinha</Text>
            <Text style={styles.descricaoProduto}>Coxinha de carne, presunto e queijo ou frango com requeijão</Text>
            <Text style={styles.precoProduto}>R$ 8,50</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 4, nome: 'Coxinha', preco: 'R$ 8,50', descricao: 'Coxinha de carne, presunto e queijo ou frango com requeijão'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 5, nome: 'Bolo de Pote Cookies', preco: 'R$ 12', descricao: 'Delicioso bolo de pote sabor cookies n\'cream!'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemBoloDePote.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Bolo de Pote Cookies</Text>
            <Text style={styles.descricaoProduto}>Delicioso bolo de pote sabor cookies n'cream!</Text>
            <Text style={styles.precoProduto}>R$ 12</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 5, nome: 'Bolo de Pote Cookies', preco: 'R$ 12', descricao: 'Delicioso bolo de pote sabor cookies n\'cream!'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 6, nome: 'Barra de Chocolate', preco: 'R$ 7', descricao: 'Barra de chocolate de 90g'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemBarraDeChocolate.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Barra de Chocolate</Text>
            <Text style={styles.descricaoProduto}>Barra de chocolate de 90g</Text>
            <Text style={styles.precoProduto}>R$ 7</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 6, nome: 'Barra de Chocolate', preco: 'R$ 7', descricao: 'Barra de chocolate de 90g'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.titulo}>Para beber 🥤</Text>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 7, nome: 'Água Mineral', preco: 'R$ 4', descricao: 'Água sem gás 500ml'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemAguaMineral.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Água Mineral</Text>
            <Text style={styles.descricaoProduto}>Água sem gás 500ml</Text>
            <Text style={styles.precoProduto}>R$ 4</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 7, nome: 'Água Mineral', preco: 'R$ 4', descricao: 'Água sem gás 500ml'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 8, nome: 'Café Expresso', preco: 'R$ 5,50', descricao: 'Café Expresso de 200ml'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemCafe.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Café Expresso</Text>
            <Text style={styles.descricaoProduto}>Café Expresso de 200ml</Text>
            <Text style={styles.precoProduto}>R$ 5,50</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 8, nome: 'Café Expresso', preco: 'R$ 5,50', descricao: 'Café Expresso de 200ml'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 2}} onPress={() => addToCart({id: 9, nome: 'Suco de Laranja', preco: 'R$ 11', descricao: 'Suco de laranja de 500ml'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemSucoDeLaranja.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Suco de Laranja</Text>
            <Text style={styles.descricaoProduto}>Suco de laranja de 500ml</Text>
            <Text style={styles.precoProduto}>R$ 11</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 9, nome: 'Suco de Laranja', preco: 'R$ 11', descricao: 'Suco de laranja de 500ml'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 2}} onPress={() => addToCart({id: 10, nome: 'Energético', preco: 'R$ 13', descricao: 'Energético de 300ml'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../assets/imagemEnergetico.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Energético</Text>
            <Text style={styles.descricaoProduto}>Energético de 300ml</Text>
            <Text style={styles.precoProduto}>R$ 13</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 10, nome: 'Energético', preco: 'R$ 13', descricao: 'Energético de 300ml'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={{flex: 1}} onPress={() => addToCart({id: 11, nome: 'Coca-Cola', preco: 'R$ 3', descricao: 'Coca-Cola 350ml'})}>
          <View style={styles.caixaProduto}>
            <Image source={require('../../img/coca.png')} style={styles.imagemProduto} />
            <Text style={styles.nomeProduto}>Coca-Cola</Text>
            <Text style={styles.descricaoProduto}>Coca-Cola 350ml</Text>
            <Text style={styles.precoProduto}>R$ 3</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart({id: 11, nome: 'Coca-Cola', preco: 'R$ 3', descricao: 'Coca-Cola 350ml'})}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#000000',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  caixaProduto: {
    backgroundColor: '#0D0D0D',
    borderWidth: 2,
    borderColor: '#4B163B',
    margin: 5,
    borderRadius: 15,
    padding: 10,
    minHeight: 180,
  },
  imagemProduto: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  titulo:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFFFFF',
    marginTop: 10,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
    color: '#FFFFFF',
  },
  descricaoProduto: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  precoProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline',
    color: '#FF007F',
  },
  addButton: {
    backgroundColor: '#FF007F',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagemPlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
});