import React from 'react';

import { Container, TextButton } from './styles';

interface Props {
  onPress: Function;
}

export default function ButtonConfirm(props: Props) {
  return (
    <Container onPress={() => props.onPress()}>
      <TextButton>Confirmar</TextButton>
    </Container>
  );
}
