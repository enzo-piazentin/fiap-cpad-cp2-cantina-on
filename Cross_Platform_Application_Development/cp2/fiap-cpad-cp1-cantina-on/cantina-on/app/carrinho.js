import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Carrinho() {
  const router = useRouter();

  const [produtosCarrinho, setProdutosCarrinho] = useState([
    {
      id: 1,
      nome: 'Coxinha de Frango',
      preco: 8.50,
      source: require('../img/Coxinha.png'),
      quantidade: 1
    },
    {
      id: 2,
      nome: 'Coca-Cola 350ml',
      preco: 3.00,
      source: require('../img/coca.png'),
      quantidade: 1
    }
  ]);

  const aumentarQuantidade = (id) => {
    setProdutosCarrinho(produtosCarrinho.map(produto =>
      produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
    ));
  };

  const diminuirQuantidade = (id) => {
    setProdutosCarrinho(produtosCarrinho.map(produto =>
      produto.id === id ? { ...produto, quantidade: Math.max(1, produto.quantidade - 1)} : produto
    ));
  };


  const calcularTotal = () => {
    return produtosCarrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Text style={styles.titulo}>Meu Carrinho</Text>
        {produtosCarrinho.map((produto) => (
          <View key={produto.id} style={styles.produtoContainer}>
            <TouchableOpacity style={styles.imagemContainer}>
              <Image
                source={produto.source}
                style={styles.produtoImagem}
                defaultSource={require('../img/MascoteOn.png')}
              />
            </TouchableOpacity>
            <View style={styles.produtoInfo}>
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              <Text style={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</Text>
              <View style={styles.quantidadeContainer}>
                <TouchableOpacity
                  style={styles.botaoQuantidade}
                  onPress={() => diminuirQuantidade(produto.id)}
                >
                  <Text style={styles.botaoQuantidadeTexto}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantidadeTexto}>{produto.quantidade}</Text>
                <TouchableOpacity
                  style={styles.botaoQuantidade}
                  onPress={() => aumentarQuantidade(produto.id)}
                >
                  <Text style={styles.botaoQuantidadeTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {produtosCarrinho.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total: R$ {calcularTotal().toFixed(2)}</Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  carrinhoVazio: {
    textAlign: 'center',
    fontSize: 18,
    color: '#BDBDBD',
    marginTop: 50,
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