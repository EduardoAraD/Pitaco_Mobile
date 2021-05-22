import React from 'react';
import { View } from 'react-native';

import {
  SearchAction,
  ViewSearch,
  TitleText,
  SearchText,
  SearchInputStyle,
  SearchButtonText,
  SearchButton,
} from './styles';

interface Props {
  value: string;
  title: string;
  setValue: Function;
  onPress: Function;
}

export default function SearchInput({
  value,
  title,
  setValue,
  onPress,
}: Props) {
  return (
    <>
      <ViewSearch>
        <SearchText>Procurar</SearchText>
        <SearchAction>
          <SearchInputStyle
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <View style={{ width: 20 }} />
          <SearchButton onPress={() => onPress()}>
            <SearchButtonText>Buscar</SearchButtonText>
          </SearchButton>
        </SearchAction>
      </ViewSearch>
      <TitleText>{title}</TitleText>
    </>
  );
}
