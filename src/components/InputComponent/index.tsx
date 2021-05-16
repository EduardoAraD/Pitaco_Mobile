import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ThemeContext } from 'styled-components';

import { Container, Input, Label } from './styles';

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
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        value={value}
        onChangeText={(text) => onChange(text)}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textGray5}
        secureTextEntry={password}
      />
    </Container>
  );
}
