import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import ContinuarComponent from '../../../components/ButtonContinue';
import InputComponent from '../../../components/InputComponent';

import Trophy1Img from '../../../assets/images/trophy1.png';
import Trophy2Img from '../../../assets/images/trophy2.png';
import Trophy3Img from '../../../assets/images/trophy3.png';
import Trophy4Img from '../../../assets/images/trophy4.png';
import Trophy5Img from '../../../assets/images/trophy5.png';
import Trophy6Img from '../../../assets/images/trophy6.png';

import {
  ContainerSafe,
  ImgStyle,
  InputStyle,
  LabelNota,
  LabelView,
  ScrollStyle,
  TextDefault,
  InputTextView,
  TouchStyle,
} from './styles';

const simboloData = [
  Trophy1Img,
  Trophy2Img,
  Trophy3Img,
  Trophy4Img,
  Trophy5Img,
  Trophy6Img,
];

export default function LeagueCreate() {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [escudo, setEscudo] = useState(-1);

  function snackbarMessageError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.textRed,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  function handleContinuar() {
    if (name === '') {
      snackbarMessageError('Nome Inválido.');
      return;
    }
    if (description === '') {
      snackbarMessageError('Description vazia.');
      return;
    }
    if (escudo === -1) {
      snackbarMessageError('Simbolo inválido, escolha um por favor.');
      return;
    }
    const league = {
      name,
      description,
      logo: simboloData[escudo],
      dono: user,
      points: [
        {
          points: 0,
          exactScore: 0,
          user,
        },
      ],
    };
    navigation.navigate('LeagueCreatePreScreen', { league, escudo });
  }

  return (
    <ContainerSafe>
      <ScrollStyle>
        <View style={{ height: 20 }} />
        <InputComponent
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={setName}
        />
        <InputTextView>
          <LabelView>
            <TextDefault>Descrição</TextDefault>
            <LabelNota>{50 - description.length}/50 caracteres</LabelNota>
          </LabelView>
          <InputStyle
            value={description}
            multiline
            maxLength={50}
            textAlignVertical="top"
            onChangeText={(text) => setDescription(text)}
          />
        </InputTextView>
        <InputTextView>
          <TextDefault>Escoha um Símbolo para Liga</TextDefault>
          <ScrollView horizontal>
            {simboloData.map((simbolo, index) => (
              <TouchStyle
                escolhido={escudo === index}
                key={simbolo}
                onPress={() => setEscudo(index)}
              >
                <ImgStyle source={simbolo} resizeMode="contain" />
              </TouchStyle>
            ))}
          </ScrollView>
        </InputTextView>
        <View style={{ height: 50 }} />
        <ContinuarComponent onPress={handleContinuar} />
      </ScrollStyle>
    </ContainerSafe>
  );
}
