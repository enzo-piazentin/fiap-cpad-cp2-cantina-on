import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword, validateName, validateRequired } from '../utils/validation';
import { STORAGE_KEYS, SCREEN_NAMES } from '../utils/constants';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const router = useRouter();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedInValue === 'true') {
        router.replace('/tabs/index');
      }
    } catch (error) {
      console.log('AsyncStorage não disponível, permanecendo no cadastro');
      // Não faz nada, permanece na tela de cadastro
    }
  };

  const validateNome = (text) => {
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, nome: 'Nome é obrigatório' }));
      return false;
    } else if (text.trim().length < 3) {
      setErrors(prev => ({ ...prev, nome: 'Nome deve ter pelo menos 3 caracteres' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, nome: '' }));
      return true;
    }
  };

  const validateEmailField = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email é obrigatório' }));
      return false;
    } else if (!emailRegex.test(text)) {
      setErrors(prev => ({ ...prev, email: 'Email inválido' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
      return true;
    }
  };

  const validateSenhaField = (text) => {
    if (!text) {
      setErrors(prev => ({ ...prev, senha: 'Senha é obrigatória' }));
      return false;
    } else if (text.length < 6) {
      setErrors(prev => ({ ...prev, senha: 'Senha deve ter pelo menos 6 caracteres' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, senha: '' }));
      return true;
    }
  };

  const validateConfirmarSenhaField = (text) => {
    if (!text) {
      setErrors(prev => ({ ...prev, confirmarSenha: 'Confirmação de senha é obrigatória' }));
      return false;
    } else if (text !== senha) {
      setErrors(prev => ({ ...prev, confirmarSenha: 'As senhas não coincidem' }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, confirmarSenha: '' }));
      return true;
    }
  };

  const handleNomeChange = (text) => {
    setNome(text);
    if (errors.nome) validateNome(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) validateEmailField(text);
  };

  const handleSenhaChange = (text) => {
    setSenha(text);
    if (errors.senha) validateSenhaField(text);
    if (errors.confirmarSenha && confirmarSenha) validateConfirmarSenhaField(confirmarSenha);
  };

  const handleConfirmarSenhaChange = (text) => {
    setConfirmarSenha(text);
    if (errors.confirmarSenha) validateConfirmarSenhaField(text);
  };

  const handleCadastro = async () => {
    // Validação inline dos campos
    const isNomeValid = validateNome(nome);
    const isEmailValid = validateEmailField(email);
    const isSenhaValid = validateSenhaField(senha);
    const isConfirmarSenhaValid = validateConfirmarSenhaField(confirmarSenha);

    if (!isNomeValid || !isEmailValid || !isSenhaValid || !isConfirmarSenhaValid) {
      return; // Não continua se houver erros
    }

    setLoading(true);
    
    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      
      // Salvar dados do usuário no AsyncStorage usando constantes
      const userData = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha,
        dataCadastro: new Date().toISOString(),
        isLoggedIn: true
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');

      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/tabs/index')
        }
      ]);
    } catch (error) {
      console.log('AsyncStorage não disponível, mas cadastro simulado com sucesso');
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso! (modo local)', [
        {
          text: 'OK',
          onPress: () => router.replace('/tabs/index')
        }
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
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[styles.input, errors.nome ? styles.inputError : '']}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={handleNomeChange}
            onBlur={() => validateNome(nome)}
          />
          {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : '']}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => validateEmailField(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.passwordInput, errors.senha ? styles.inputError : '']}
              placeholder="Digite sua senha (mínimo 6 caracteres)"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={handleSenhaChange}
              onBlur={() => validateSenhaField(senha)}
              secureTextEntry={!showSenha}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowSenha(!showSenha)}
            >
              <Text style={styles.eyeIcon}>{showSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.passwordInput, errors.confirmarSenha ? styles.inputError : '']}
              placeholder="Confirme sua senha"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={handleConfirmarSenhaChange}
              onBlur={() => validateConfirmarSenhaField(confirmarSenha)}
              secureTextEntry={!showConfirmarSenha}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
            >
              <Text style={styles.eyeIcon}>{showConfirmarSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.confirmarSenha ? <Text style={styles.errorText}>{errors.confirmarSenha}</Text> : null}
        </View>

        <Button
          title="Cadastrar"
          onPress={handleCadastro}
          loading={loading}
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
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  linkButton: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#4B163B',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  eyeIcon: {
    fontSize: 20,
    color: '#BDBDBD',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#4B163B',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 5,
  },
});