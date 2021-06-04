import React from 'react';

import { ButtonsView, ButtonText, ButtonContainer } from './styles';

interface Props {
  nameOption1: string;
  nameOption2: string;
  option: boolean;
  setOption: Function;
}

export default function DoubleButtom({
  nameOption1,
  nameOption2,
  option,
  setOption,
}: Props) {
  return (
    <ButtonsView>
      <ButtonContainer option={!option} left onPress={() => setOption(false)}>
        <ButtonText option={!option}>{nameOption1}</ButtonText>
      </ButtonContainer>
      <ButtonContainer option={option} onPress={() => setOption(true)}>
        <ButtonText option={option}>{nameOption2}</ButtonText>
      </ButtonContainer>
    </ButtonsView>
  );
}
