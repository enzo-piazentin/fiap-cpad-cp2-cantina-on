import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validateSenha } from '../utils/validation';
import { STORAGE_KEYS, SCREEN_NAMES } from '../utils/constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: null, senha: null });
  const router = useRouter();

  // Botão habilitado quando ambos os campos são válidos
  const isFormValid = useMemo(() => {
    return !validateEmail(email) && senha.length > 0;
  }, [email, senha]);

  
  const handleEmailChange = (text) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: validateEmail(text) }));
  };

  const handleSenhaChange = (text) => {
    setSenha(text);
    setErrors(prev => ({
      ...prev,
      senha: text ? null : 'Senha é obrigatória!',
    }));
  };


  const handleLogin = async () => {
    // Força validação
    const newErrors = {
      email: validateEmail(email),
      senha: senha ? null : 'Senha é obrigatória!',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (!userData) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Faça o cadastro primeiro!');
        return;
      }

      const user = JSON.parse(userData);

      if (
        user.email === email.trim().toLowerCase() &&
        user.senha === senha
      ) {
        await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
        Alert.alert('Sucesso!', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => router.replace('/tabs/index') },
        ]);
      } else {
        // Erro de credenciais aparecendo inline
        setErrors({
          email: ' ',
          senha: 'Email ou senha incorretos!',
        });
      }
    } catch {
      // AsyncStorage indisponível
      Alert.alert('Sucesso!', 'Login realizado! (modo local)', [
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
        <Text style={styles.title}>Login</Text>

        {/* Email usa componente Input */}
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

        {/* Senha TextInput manual */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={[styles.passwordRow, errors.senha ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={handleSenhaChange}
              onBlur={() =>
                setErrors(prev => ({
                  ...prev,
                  senha: senha ? null : 'Senha é obrigatória!',
                }))
              }
              secureTextEntry={!showSenha}
            />
            <TouchableOpacity
              onPress={() => setShowSenha(v => !v)}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeIcon}>{showSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.senha?.trim()
            ? <Text style={styles.errorText}>{errors.senha}</Text>
            : null}
        </View>

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={!isFormValid}
          style={styles.button}
        />

        <Button
          title="Não tem uma conta? Faça cadastro"
          onPress={() => router.push(SCREEN_NAMES.CADASTRO)}
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
  label: { color: '#FFFFFF', fontSize: 16, fontWeight: '500', marginBottom: 8 },
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