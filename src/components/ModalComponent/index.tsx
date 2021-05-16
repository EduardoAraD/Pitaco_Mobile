import React from 'react';
import { Modal } from 'react-native';

import {
  ContainerView,
  Title,
  TextStyle,
  ScrollViewStyle,
  OpenButton,
  ModalView,
  // ModalText,
  TextScroll,
} from './styles';

interface Props {
  visible: boolean;
  setVisible: Function;
}

export default function ModalComponent({ visible, setVisible }: Props) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <ContainerView>
        <ModalView>
          <OpenButton onPress={() => setVisible(!visible)}>
            <TextStyle>X</TextStyle>
          </OpenButton>

          <Title>Termos de Contrato</Title>
          <ScrollViewStyle>
            <TextScroll>
              ljnalkjsdnalskdjasdfjknsdaf askldbsfdkbsadf askldbsadjfhbsafd
              inadjahtektjkçkafdkavsdhasfdçasd
            </TextScroll>
          </ScrollViewStyle>
        </ModalView>
      </ContainerView>
    </Modal>
  );
}
