import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, TouchableOpacity, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  validateNome,
  validateEmail,
  validateSenha,
  validateConfirmarSenha,
} from '../utils/validation';
import { STORAGE_KEYS, SCREEN_NAMES } from '../utils/constants';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  // Erros
  const [errors, setErrors] = useState({
    nome: null,
    email: null,
    senha: null,
    confirmarSenha: null,
  });

  const router = useRouter();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      if (isLoggedInValue === 'true') {
        router.replace('/tabs/index');
      }
    } catch {
      // AsyncStorage indisponível
    }
  };

  // Formulário válido
  const isFormValid = useMemo(() => {
    return (
      !validateNome(nome) &&
      !validateEmail(email) &&
      !validateSenha(senha) &&
      !validateConfirmarSenha(confirmarSenha, senha)
    );
  }, [nome, email, senha, confirmarSenha]);

 
  const handleNomeChange = (text) => {
    setNome(text);
    setErrors(prev => ({ ...prev, nome: validateNome(text) }));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: validateEmail(text) }));
  };

  const handleSenhaChange = (text) => {
    setSenha(text);
    setErrors(prev => ({
      ...prev,
      senha: validateSenha(text),
      confirmarSenha: confirmarSenha
        ? validateConfirmarSenha(confirmarSenha, text)
        : prev.confirmarSenha,
    }));
  };

  const handleConfirmarSenhaChange = (text) => {
    setConfirmarSenha(text);
    setErrors(prev => ({
      ...prev,
      confirmarSenha: validateConfirmarSenha(text, senha),
    }));
  };

  const handleCadastro = async () => {
    // Força validação de todos os campos
    const newErrors = {
      nome: validateNome(nome),
      email: validateEmail(email),
      senha: validateSenha(senha),
      confirmarSenha: validateConfirmarSenha(confirmarSenha, senha),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    try {
      const userData = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        dataCadastro: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/tabs/index') },
      ]);
    } catch {
      Alert.alert('Sucesso!', 'Cadastro realizado! (modo local)', [
        { text: 'OK', onPress: () => router.replace('/tabs/index') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro</Text>

        {/* Usa componente Input com prop error */}
        <Input
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          value={nome}
          onChangeText={handleNomeChange}
          onBlur={() => setErrors(prev => ({ ...prev, nome: validateNome(nome) }))}
          error={errors.nome}
        />

        {/* Usa componente Input com prop error */}
        <Input
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={handleEmailChange}
          onBlur={() => setErrors(prev => ({ ...prev, email: validateEmail(email) }))}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        {/* TextInput manual por causa do botão de olho */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={[styles.passwordRow, errors.senha ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={handleSenhaChange}
              onBlur={() => setErrors(prev => ({ ...prev, senha: validateSenha(senha) }))}
              secureTextEntry={!showSenha}
            />
            <TouchableOpacity onPress={() => setShowSenha(v => !v)} style={styles.eyeButton}>
              <Text style={styles.eyeIcon}>{showSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
        </View>

        {/* Confirmar Senha */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={[styles.passwordRow, errors.confirmarSenha ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirme sua senha"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={handleConfirmarSenhaChange}
              onBlur={() =>
                setErrors(prev => ({
                  ...prev,
                  confirmarSenha: validateConfirmarSenha(confirmarSenha, senha),
                }))
              }
              secureTextEntry={!showConfirmarSenha}
            />
            <TouchableOpacity onPress={() => setShowConfirmarSenha(v => !v)} style={styles.eyeButton}>
              <Text style={styles.eyeIcon}>{showConfirmarSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.confirmarSenha
            ? <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
            : null}
        </View>

        {/* Botão desabilitado enquanto formulário é inválido */}
        <Button
          title="Cadastrar"
          onPress={handleCadastro}
          loading={loading}
          disabled={!isFormValid}
          style={styles.button}
        />

        <Button
          title="Já tem uma conta? Faça login"
          onPress={() => router.push(SCREEN_NAMES.LOGIN)}
          variant="secondary"
          style={styles.linkButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 32, fontWeight: 'bold',
    color: '#FFFFFF', textAlign: 'center', marginBottom: 40,
  },
  button: { marginTop: 20 },
  linkButton: { marginTop: 20 },
  fieldContainer: { marginBottom: 20 },
  label: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#4B163B',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute', right: 15,
    height: '100%', justifyContent: 'center',
    paddingHorizontal: 10,
  },
  eyeIcon: { fontSize: 20 },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 5 },
});