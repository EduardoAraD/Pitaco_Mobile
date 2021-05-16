import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from 'styled-components';

import { Match } from '../../models/Match';

import {
  ButtonShowTouch,
  CardAction,
  CardClube,
  CardClubeImage,
  CardClubeText,
  CardContainerView,
  CardPoints,
  CardPointsText,
  CardView,
  CardVisible,
  CardVisibleName,
  CardVisiblePlacar,
  InputStyle,
  TextCardPlacar,
  TextCardStadium,
} from './styles';

interface Props {
  index: number;
  update: boolean;
  point: number;
  golsHome: string;
  setGolsHome: Function;
  golsAway: string;
  setGolsAway: Function;
  notFinishPitaco: boolean;
  match: Match;
}

export default function InputMatch({
  index,
  update,
  point,
  golsHome,
  setGolsHome,
  golsAway,
  setGolsAway,
  notFinishPitaco,
  match,
}: Props) {
  const { colors } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  function visibleView() {
    return visible ? (
      <CardVisible>
        <CardVisibleName style={{ textAlign: 'right' }}>
          {match.clubeHome.name}
        </CardVisibleName>
        <CardVisiblePlacar bool={match.status === 'progress'}>
          {match.status !== 'notstarted'
            ? `${match.golsHome} - ${match.golsAway}`
            : ' - '}
        </CardVisiblePlacar>
        <CardVisibleName>{match.clubeAway.name}</CardVisibleName>
        <View style={{ width: 25 }} />
      </CardVisible>
    ) : (
      <View />
    );
  }

  function colorPoint(val: number): string {
    if (match.status !== 'notstarted' && golsAway !== '' && golsHome !== '') {
      switch (val) {
        case 10:
          return colors.greenPrimary;
        case 7:
          return colors.blueSecundary;
        case 5:
          return colors.yellowPrimary;
        default:
          return colors.textRed;
      }
    } else return colors.textGray4;
  }

  function colorInput(): string {
    if (update) return colors.blueSecundary;
    if (golsHome.length > 0 || golsAway.length > 0)
      return colors.greenSecundary;
    return colors.textGray3;
  }

  return (
    <CardView>
      <CardContainerView>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextCardStadium>{`${match.stadium} - ${match.date} - ${match.hour}`}</TextCardStadium>
          <CardContainerView>
            <CardClube style={{ justifyContent: 'flex-end' }}>
              <CardClubeText style={{ color: colors.textGray2 }}>
                {match.clubeHome.shortCode}
              </CardClubeText>
              <CardClubeImage
                resizeMode="contain"
                source={{ uri: match.clubeHome.logo }}
              />
            </CardClube>
            <InputStyle
              notFinish={notFinishPitaco}
              borderColor={colorInput()}
              update={update}
              editable={notFinishPitaco}
              value={golsHome}
              keyboardType="numeric"
              onChangeText={(text) => setGolsHome(text, index)}
            />
            <TextCardPlacar bool={update}>-</TextCardPlacar>
            <InputStyle
              notFinish={notFinishPitaco}
              borderColor={colorInput()}
              update={update}
              editable={notFinishPitaco}
              value={golsAway}
              keyboardType="numeric"
              onChangeText={(text) => setGolsAway(text, index)}
            />
            <CardClube style={{ justifyContent: 'flex-start' }}>
              <CardClubeImage
                resizeMode="contain"
                source={{ uri: match.clubeAway.logo }}
              />
              <CardClubeText>{match.clubeAway.shortCode}</CardClubeText>
            </CardClube>
          </CardContainerView>
        </View>
        <CardAction>
          <CardPoints borderColor={colorPoint(point)}>
            <CardPointsText style={{ color: colorPoint(point) }}>
              {point}
            </CardPointsText>
          </CardPoints>
          <ButtonShowTouch onPress={() => setVisible(!visible)}>
            <Icon
              name={visible ? 'chevron-up' : 'chevron-down'}
              color={colors.textGray1}
              size={18}
            />
          </ButtonShowTouch>
        </CardAction>
      </CardContainerView>
      {visibleView()}
    </CardView>
  );
}
