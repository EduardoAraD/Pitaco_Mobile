import React from 'react';

import { ButtonContainer, TextButton } from './styles';

interface Props {
  onPress: Function;
}

export default function ContinuarComponent(props: Props) {
  return (
    <ButtonContainer onPress={() => props.onPress()}>
      <TextButton>Continuar</TextButton>
    </ButtonContainer>
  );
}
