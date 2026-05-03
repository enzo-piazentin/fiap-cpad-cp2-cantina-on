import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAsyncStorageAvailable, setIsAsyncStorageAvailable] = useState(true);

  useEffect(() => {
    checkAsyncStorageAvailability();
  }, []);

  const checkAsyncStorageAvailability = async () => {
    try {
      // Testa se o AsyncStorage está disponível
      await AsyncStorage.getItem('test');
      setIsAsyncStorageAvailable(true);
      loadCartItems();
    } catch (error) {
      console.log('AsyncStorage não disponível, usando estado local apenas');
      setIsAsyncStorageAvailable(false);
    }
  };

  const loadCartItems = async () => {
    if (!isAsyncStorageAvailable) return;
    
    try {
      const storedCart = await AsyncStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  const saveCartItems = async (items) => {
    // Sempre atualiza o estado local
    setCartItems(items);
    
    // Só tenta salvar no AsyncStorage se estiver disponível
    if (!isAsyncStorageAvailable) return;
    
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
      // Se falhar, desabilita o AsyncStorage para futuras operações
      setIsAsyncStorageAvailable(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCartItems(updatedItems);
    } else {
      const newItems = [...cartItems, { ...product, quantity: 1 }];
      saveCartItems(newItems);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedItems = cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      saveCartItems(updatedItems);
    }
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    saveCartItems(updatedItems);
  };

  const clearCart = () => {
    saveCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        loadCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
