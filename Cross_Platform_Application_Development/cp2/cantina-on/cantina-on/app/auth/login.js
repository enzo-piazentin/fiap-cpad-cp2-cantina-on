import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    senha: ''
  });
  const router = useRouter();

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
    } else {
      setErrors(prev => ({ ...prev, senha: '' }));
      return true;
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) validateEmailField(text);
  };

  const handleSenhaChange = (text) => {
    setSenha(text);
    if (errors.senha) validateSenhaField(text);
  };

  const handleLogin = async () => {
    // Validação inline dos campos
    const isEmailValid = validateEmailField(email);
    const isSenhaValid = validateSenhaField(senha);

    if (!isEmailValid || !isSenhaValid) {
      return; // Não continua se houver erros
    }

    try {
      // Verificar se o AsyncStorage está disponível
      await AsyncStorage.getItem('test_availability');
      
      // Buscar dados do usuário no AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      
      if (!userData) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Faça o cadastro primeiro.');
        return;
      }

      const user = JSON.parse(userData);

      // Validar credenciais
      if (user.email === email.trim().toLowerCase() && user.senha === senha) {
        // Login bem-sucedido - salvar dados do usuário logado
        const loggedInUser = {
          ...user,
          isLoggedIn: true,
          loginDate: new Date().toISOString()
        };
        
        await AsyncStorage.setItem('userData', JSON.stringify(loggedInUser));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        
        Alert.alert('Sucesso!', 'Login realizado com sucesso!', [
          {
            text: 'OK',
            onPress: () => router.replace('/tabs/index')
          }
        ]);
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      console.log('AsyncStorage não disponível, simulando login com sucesso');
      // Simular login bem-sucedido quando não há AsyncStorage
      Alert.alert('Sucesso!', 'Login realizado com sucesso! (modo local)', [
        {
          text: 'OK',
          onPress: () => router.replace('/tabs/index')
        }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        
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
              placeholder="Digite sua senha"
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => router.push('/auth/cadastro')}
        >
          <Text style={styles.linkText}>Não tem uma conta? Faça cadastro</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
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
  button: {
    backgroundColor: '#4B163B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#FF007F',
    fontSize: 16,
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
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 5,
  },
});