import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAsyncStorageAvailable, setIsAsyncStorageAvailable] = useState(true);

  useEffect(() => {
    checkAsyncStorageAvailability();
  }, []);

  const checkAsyncStorageAvailability = async () => {
    try {
      // Testa se o AsyncStorage está disponível
      await AsyncStorage.getItem('test');
      setIsAsyncStorageAvailable(true);
      checkAuthStatus();
    } catch (error) {
      console.log('AsyncStorage não disponível, usando estado local apenas');
      setIsAsyncStorageAvailable(false);
      setIsLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    if (!isAsyncStorageAvailable) return;
    
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('userData');
      
      if (isLoggedInValue === 'true' && userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    // Sempre atualiza o estado local
    setUser(userData);
    setIsLoggedIn(true);
    
    // Só tenta salvar no AsyncStorage se estiver disponível
    if (!isAsyncStorageAvailable) return;
    
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setIsAsyncStorageAvailable(false);
    }
  };

  const logout = async () => {
    // Sempre atualiza o estado local
    setUser(null);
    setIsLoggedIn(false);
    
    // Só tenta salvar no AsyncStorage se estiver disponível
    if (!isAsyncStorageAvailable) return;
    
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsAsyncStorageAvailable(false);
    }
  };

  const register = async (userData) => {
    // Sempre atualiza o estado local
    setUser(userData);
    setIsLoggedIn(true);
    
    // Só tenta salvar no AsyncStorage se estiver disponível
    if (!isAsyncStorageAvailable) return;
    
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setIsAsyncStorageAvailable(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        login,
        logout,
        register,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
