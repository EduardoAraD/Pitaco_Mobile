import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import ContinuarComponent from '../../components/buttons/ContinuarComponent';
import InputComponent from '../../components/InputComponent';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';
import Trophy1Img from '../../assets/images/trophy1.png';
import Trophy2Img from '../../assets/images/trophy2.png';
import Trophy3Img from '../../assets/images/trophy3.png';
import Trophy4Img from '../../assets/images/trophy4.png';
import Trophy5Img from '../../assets/images/trophy5.png';
import Trophy6Img from '../../assets/images/trophy6.png';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  inputTextView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 3,
  },
  labelNota: {
    fontSize: 10,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  input: {
    width: '100%',
    borderRadius: 20,
    height: 100,
    borderWidth: 1,
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Medium',
  },
  img: {
    height: 100,
    width: 100,
  },
});

const simboloData = [
  Trophy1Img,
  Trophy2Img,
  Trophy3Img,
  Trophy4Img,
  Trophy5Img,
  Trophy6Img,
];

export default function LeagueCreate() {
  const { user, themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [escudo, setEscudo] = useState(-1);

  function snackbarMessageError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: theme.textRed,
      textColor: theme.textWhite,
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
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <ScrollView style={styles.scroll}>
        <View style={{ height: 20 }} />
        <InputComponent
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={setName}
        />
        <View style={styles.inputTextView}>
          <View style={styles.labelView}>
            <Text
              style={{
                fontWeight: '600',
                color: theme.textGray3,
                fontFamily: 'SairaSemiCondensed-Medium',
              }}
            >
              Descrição
            </Text>
            <Text style={[styles.labelNota, { color: theme.textGray3 }]}>
              {50 - description.length}/50 caracteres
            </Text>
          </View>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.whitePrimary,
                color: theme.textGray2,
                borderColor: theme.textGray3,
              },
            ]}
            value={description}
            multiline
            maxLength={50}
            textAlignVertical="top"
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.inputTextView}>
          <Text
            style={{
              fontWeight: '600',
              color: theme.textGray3,
              fontFamily: 'SairaSemiCondensed-Medium',
            }}
          >
            Escoha um Símbolo para Liga
          </Text>
          <ScrollView horizontal>
            {simboloData.map((simbolo, index) => {
              const escolhidoColor = {
                backgroundColor:
                  escudo === index
                    ? theme.yellowPrimary
                    : theme.backgroundWhite,
              };

              return (
                <TouchableOpacity
                  style={[
                    { borderColor: theme.textGray3, borderWidth: 1 },
                    escolhidoColor,
                  ]}
                  key={simbolo}
                  onPress={() => setEscudo(index)}
                >
                  <Image
                    source={simbolo}
                    resizeMode="contain"
                    style={styles.img}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ height: 50 }} />
        <ContinuarComponent onPress={handleContinuar} />
      </ScrollView>
    </View>
  );
}
