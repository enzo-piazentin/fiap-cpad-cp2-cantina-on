import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { APP_COLORS } from '../utils/constants';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,           
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'sentences',
  multiline = false,
  error,            // string de erro ou null
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
      />
      {/* Mensagem de erro inline */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: APP_COLORS.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: APP_COLORS.inputBackground,
    borderWidth: 1,
    borderColor: APP_COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: APP_COLORS.text,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;
