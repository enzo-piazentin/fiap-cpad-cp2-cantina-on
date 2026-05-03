import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { APP_COLORS } from '../utils/constants';

const Button = ({ title, onPress, loading = false, disabled = false, variant = 'primary', style = {} }) => {
  const buttonStyle = [
    styles.button,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'danger' && styles.buttonDanger,
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'secondary' && styles.buttonTextSecondary,
    variant === 'danger' && styles.buttonTextDanger,
    disabled && styles.buttonTextDisabled,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={APP_COLORS.text} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: APP_COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
  },
  buttonDanger: {
    backgroundColor: APP_COLORS.danger,
  },
  buttonDisabled: {
    backgroundColor: '#333',
    opacity: 0.6,
  },
  buttonText: {
    color: APP_COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: APP_COLORS.primary,
  },
  buttonTextDanger: {
    color: APP_COLORS.text,
  },
  buttonTextDisabled: {
    color: '#999',
  },
});

export default Button;
