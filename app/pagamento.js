import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const METODOS = [
  { id: 'pix',     label: '📱 Pix' },
  { id: 'credito', label: '💳 Cartão de Crédito' },
  { id: 'debito',  label: '💵 Cartão de Débito' },
  { id: 'vale',    label: '🍽️ Refeição' },
];

export default function Pagamento() {
  const router = useRouter();
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);
  const [errorMetodo, setErrorMetodo] = useState(null);
  const [pago, setPago] = useState(false);

  const handleSelecionarMetodo = (id) => {
    setMetodoSelecionado(id);
    setErrorMetodo(null);
  };

  const handlePagar = () => {
    if (!metodoSelecionado) {
      setErrorMetodo('Selecione uma forma de pagamento');
      return;
    }
  
    setPago(true);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titulo}>Pagamento</Text>

      <View style={styles.opcoesContainer}>
        {METODOS.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.opcao,
              metodoSelecionado === m.id ? styles.opcaoSelecionada : null,
            ]}
            onPress={() => handleSelecionarMetodo(m.id)}
          >
            <Text style={styles.opcaoTexto}>{m.label}</Text>
            {/* Indicador visual de seleção */}
            {metodoSelecionado === m.id && (
              <Text style={styles.checkIcon}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Erro inline de método não selecionado */}
        {errorMetodo
          ? <Text style={styles.errorText}>{errorMetodo}</Text>
          : null}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total: R$ 8,50</Text>

        {/* Feedback de sucesso inline */}
        {pago && (
          <Text style={styles.sucessoText}>✅ Pedido confirmado! Obrigado.</Text>
        )}

        <TouchableOpacity
          style={[styles.botaoConfirmar, pago ? styles.botaoDesabilitado : null]}
          onPress={handlePagar}
          disabled={pago}
        >
          <Text style={styles.botaoTexto}>{pago ? 'Pago!' : 'Pagar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000000', paddingTop: 50 },
  titulo: {
    fontSize: 24, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 20, color: '#FFFFFF',
  },
  opcoesContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  opcao: {
    backgroundColor: '#0D0D0D', borderRadius: 15, padding: 20,
    marginBottom: 15, borderWidth: 1, borderColor: '#424242',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  opcaoSelecionada: {
    borderColor: '#FF007F',
    backgroundColor: '#1A0011',
  },
  opcaoTexto: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  checkIcon: { fontSize: 18, color: '#FF007F', fontWeight: 'bold' },
  errorText: {
    color: '#FF3B30', fontSize: 13,
    textAlign: 'center', marginTop: 4,
  },
  totalContainer: {
    backgroundColor: '#0D0D0D', padding: 20,
    borderTopWidth: 1, borderTopColor: '#424242',
  },
  totalTexto: {
    fontSize: 20, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 15, color: '#FFFFFF',
  },
  sucessoText: {
    color: '#4CAF50', fontSize: 14,
    textAlign: 'center', marginBottom: 10,
  },
  botaoConfirmar: {
    backgroundColor: '#FF007F', padding: 15,
    borderRadius: 10, alignItems: 'center',
  },
  botaoDesabilitado: { backgroundColor: '#7A0040' },
  botaoTexto: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});