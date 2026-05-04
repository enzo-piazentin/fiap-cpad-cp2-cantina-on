import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSaldo } from './context/SaldoContext';

export default function AddSaldo() {
  const router = useRouter();
  const { adicionarSaldo } = useSaldo();
  const [valor, setValor] = useState('');
  const [errorValor, setErrorValor] = useState(null);


  const parseValor = (str) => {
    const clean = str.replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  };

  const validateValor = (str) => {
    if (!str || !str.trim()) return 'Informe um valor para adicionar';
    if (parseValor(str) <= 0) return 'O valor deve ser maior que R$ 0,00';
    if (parseValor(str) > 9999) return 'Valor máximo: R$ 9.999,00';
    return null;
  };

  // Botão habilitado só quando valor é válido
  const isFormValid = useMemo(() => !validateValor(valor), [valor]);

  const handleValorChange = (text) => {
    setValor(text);
    setErrorValor(validateValor(text));
  };

  const handleQuickValue = (add) => {
    const atual = parseValor(valor);
    const novo = atual + add;
    const novoStr = novo.toFixed(2).replace('.', ',');
    setValor(novoStr);
    setErrorValor(validateValor(novoStr));
  };

  const handleConfirmar = () => {
    const err = validateValor(valor);
    if (err) {
      setErrorValor(err);
      return; 
    }

    adicionarSaldo(parseValor(valor));
    router.push('/perfil');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.push('/perfil')}>
        <Text style={styles.btnVoltarText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Adicionar Saldo</Text>
      <Text style={styles.subtitle}>Quanto você quer colocar na sua conta da cantina?</Text>

      {/* Campo de valor com erro inline */}
      <View style={[styles.inputContainer, errorValor ? styles.inputContainerError : null]}>
        <Text style={styles.currency}>R$</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#424242"
          maxLength={8}
          keyboardType="numeric"
          value={valor}
          onChangeText={handleValorChange}
          onBlur={() => setErrorValor(validateValor(valor))}
        />
      </View>
      {/* Erro inline abaixo do campo */}
      {errorValor
        ? <Text style={styles.errorText}>{errorValor}</Text>
        : null}

      <View style={styles.quickValuesContainer}>
        {[10, 20, 50].map((add) => (
          <TouchableOpacity
            key={add}
            style={styles.quickValueBtn}
            onPress={() => handleQuickValue(add)}
          >
            <Text style={styles.quickValueText}>+ R$ {add}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão desabilitado enquanto inválido */}
      <TouchableOpacity
        style={[styles.btnConfirmar, !isFormValid ? styles.btnConfirmarDisabled : null]}
        onPress={handleConfirmar}
        disabled={!isFormValid}
      >
        <Text style={styles.btnConfirmarText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#000000',
    padding: 20, justifyContent: 'center',
  },
  btnVoltar: {
    position: 'absolute', top: 50, left: 20,
    padding: 10, zIndex: 1,
  },
  btnVoltarText: { fontSize: 16, color: '#FF007F', fontWeight: 'bold' },
  title: {
    fontSize: 28, fontWeight: 'bold', color: '#FFFFFF',
    textAlign: 'center', marginBottom: 10, marginTop: 40,
  },
  subtitle: {
    fontSize: 16, color: '#BDBDBD',
    textAlign: 'center', marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#0D0D0D', borderRadius: 15, padding: 20,
    marginBottom: 6,
    borderWidth: 1, borderColor: '#424242',
  },
  inputContainerError: {
    borderColor: '#FF3B30',  
  },
  errorText: {
    color: '#FF3B30', fontSize: 12,
    textAlign: 'center', marginBottom: 24,
  },
  currency: { fontSize: 32, fontWeight: 'bold', color: '#FF007F', marginRight: 10 },
  input: { fontSize: 40, fontWeight: 'bold', color: '#FFFFFF', width: 150 },
  quickValuesContainer: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40,
  },
  quickValueBtn: {
    backgroundColor: '#4B163B', paddingVertical: 15, paddingHorizontal: 20,
    borderRadius: 10, borderWidth: 1, borderColor: '#BD1E7C',
    flex: 1, marginHorizontal: 5, alignItems: 'center',
  },
  quickValueText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  btnConfirmar: {
    backgroundColor: '#FF007F', padding: 18, borderRadius: 15, alignItems: 'center',
    shadowColor: '#FF007F', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 5,
  },
  btnConfirmarDisabled: {
    backgroundColor: '#7A0040',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnConfirmarText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});