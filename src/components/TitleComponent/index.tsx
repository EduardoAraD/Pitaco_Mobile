import React from 'react';

import { Container, TextStyle } from './styles';

interface Props {
  text: string;
}

export default function TitleComponent({ text }: Props) {
  return (
    <Container>
      <TextStyle>{text}</TextStyle>
    </Container>
  );
}
