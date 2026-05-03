import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Desenvolvimento() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Esta tela está em desenvolvimento 🚧</Text>
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/ajuda')}>
        <Text style={styles.botaoTexto}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  texto: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#FF007F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});