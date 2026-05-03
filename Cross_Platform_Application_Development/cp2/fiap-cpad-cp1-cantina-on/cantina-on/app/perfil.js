import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSaldo } from './SaldoContext';

export default function Perfil() {
  const router = useRouter();
  const { saldo } = useSaldo();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>Guilherme RM: 565157</Text>
        <Text style={styles.curso}>Curso: Ciência da Computação</Text>
        <Text style={styles.email}>guilherme.califoni@fiap.com.br</Text>
      </View>

      <View style={styles.cardSaldo}>
        <Text style={styles.saldoTitle}>Saldo Disponível</Text>
        <Text style={styles.saldoValue}>{saldo !== undefined ? `R$ ${saldo.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}</Text>
        <TouchableOpacity 
          style={styles.btnSaldo} 
          onPress={() => router.push('/addSaldo')}
        >
          <Text style={styles.btnSaldoText}>+ Adicionar Saldo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/carrinho')}>
          <Text style={styles.menuItemText}>🍔 Meus Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ajuda')}>
          <Text style={styles.menuItemText}>❓ Ajuda e Suporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#0D0D0D',
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FF007F', // Borda neon no avatar
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 14,
    color: '#BDBDBD',
    marginTop: 5,
  },
  curso: {
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 5,
  },
  cardSaldo: {
    backgroundColor: '#4B163B', 
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BD1E7C',
  },
  saldoTitle: {
    color: '#BDBDBD',
    fontSize: 16,
  },
  saldoValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  btnSaldo: {
    backgroundColor: '#FF007F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  btnSaldoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: '#0D0D0D',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#424242',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
  },
  menuItemSair: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  menuItemTextSair: {
    fontSize: 16,
    color: '#FF007F', 
    fontWeight: 'bold',
  },
});