import React, { useContext } from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from 'styled-components';

import { ItemStanding } from '../../models/ItemStanding';

import {
  AreaText,
  ImageContent,
  // AreaVariacao,
  TextValor,
  TextPos,
  TextName,
  Container,
  AreaValor,
} from './styles';

interface Props {
  item: ItemStanding;
}

export default function ItemStandingComplete({ item }: Props) {
  const { colors } = useContext(ThemeContext);

  /* function textVariacao(num: number) {
    if (num > 0)
      return (
        <View style={styles.areaVariacao}>
          <Icon name="chevron-up-box" size={13} color={theme.greenSecundary} />
          <Text
            style={[
              styles.textValor,
              { color: theme.textGray2, width: 15, textAlign: 'center' },
            ]}
          >
            {num}
          </Text>
        </View>
      );
    if (num === 0)
      return (
        <View style={styles.areaVariacao}>
          <Icon name="square" size={12} color={theme.bluePrimary} />
          <Text
            style={[
              styles.textValor,
              { color: theme.textGray2, width: 15, textAlign: 'center' },
            ]}
          >
            {num}
          </Text>
        </View>
      );
    return (
      <View style={styles.areaVariacao}>
        <Icon name="chevron-down-box" size={13} color={theme.textRed} />
        <Text
          style={[
            styles.textValor,
            { color: theme.textGray2, width: 15, textAlign: 'center' },
          ]}
        >
          {num * -1}
        </Text>
      </View>
    );
  } */

  function colorBorderLeft() {
    switch (item.status) {
      case 'L':
        return colors.bluePrimary;
      case 'LQ':
        return colors.blueSecundary;
      case 'S':
        return colors.yellowPrimary;
      case 'R':
        return colors.textRed;
      default:
        return colors.whitePrimary;
    }
  }

  return (
    <Container color={colorBorderLeft()}>
      <TextPos>{item.position}.</TextPos>
      <ImageContent resizeMode="contain" source={{ uri: item.clube.logo }} />
      <AreaValor>
        <TextName>{item.clube.name}</TextName>
        <AreaText>
          {/* textVariacao(0) */}
          <TextValor>{item.points}</TextValor>
          <TextValor>{item.matchs}</TextValor>
          <TextValor>{item.wins}</TextValor>
          <TextValor>{item.draw}</TextValor>
          <TextValor>{item.defeat}</TextValor>
          <TextValor>{item.golsDiff}</TextValor>
          <TextValor>{item.golsScore}</TextValor>
          <TextValor>{item.golsConceded}</TextValor>
          <TextValor style={{ width: 30 }}>
            {item.porcentage.toFixed(1)}
          </TextValor>
        </AreaText>
      </AreaValor>
    </Container>
  );
}
