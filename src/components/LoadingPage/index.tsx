import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';

export default function LoadingPage() {
  const { colors } = useContext(ThemeContext);

  return (
    <Container>
      <ActivityIndicator size="large" color={colors.greenPrimary} />
    </Container>
  );
}
