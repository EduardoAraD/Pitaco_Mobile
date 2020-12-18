import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
    paddingBottom: 3,
  },
  input: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    height: 56,
    borderWidth: 1,
    fontSize: 20,
  },
});

interface PropsInput {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?:
    | 'email-address'
    | 'default'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  password?: boolean;
  onChange: Function;
}

export default function InputComponent({
  label,
  value,
  placeholder,
  keyboardType = 'default',
  password = false,
  onChange,
}: PropsInput) {
  const { theme } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textGray2 }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.whitePrimary,
            color: theme.textGray2,
            borderColor: theme.textGray3,
          },
        ]}
        value={value}
        onChangeText={(text) => onChange(text)}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={theme.textGray5}
        secureTextEntry={password}
      />
    </View>
  );
}
