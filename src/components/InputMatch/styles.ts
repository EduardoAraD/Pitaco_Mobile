import styled from 'styled-components/native';

interface StyleProps {
  bool?: boolean;
  notFinish?: boolean;
  update?: boolean;
  borderColor?: string;
}

export const CardView = styled.View`
  width: 100%;
  padding-vertical: 2px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardContainerView = styled.View`
  flex-direction: row;
`;

export const CardClube = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const CardClubeText = styled.Text`
  font-size: 17px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardClubeImage = styled.Image`
  height: 30px;
  width: 30px;
  margin-horizontal: 5px;
`;

export const InputStyle = styled.TextInput<StyleProps>`
  width: 30px;
  border-bottom-width: ${(props) => (props.notFinish ? 3 : 0)};
  padding: 0px;
  text-align: center;
  font-size: 25px;
  font-family: SairaSemiCondensed-Bold;
  background-color: ${(props) =>
    props.notFinish
      ? props.theme.colors.whitePrimary
      : props.theme.colors.textGray5};
  border-bottom-color: ${(props) => props.borderColor};
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.notFinish
      ? props.update
        ? props.theme.colors.blueSecundary
        : props.theme.colors.greenSecundary
      : props.theme.colors.textGray3};
`;

export const InputDisableStyle = styled.TextInput`
  width: 30px;
  padding: 0px;
  text-align: center;
  font-size: 25px;
  font-family: SairaSemiCondensed-Bold;
`;

export const TextCardStadium = styled.Text`
  font-size: 8px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const TextCardPlacar = styled.Text<StyleProps>`
  font-size: 25px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) =>
    props.bool
      ? props.theme.colors.blueSecundary
      : props.theme.colors.greenSecundary};
`;

export const CardAction = styled.View`
  margin-horizontal: 2px;
  justify-content: space-between;
  align-items: center;
`;

export const CardPoints = styled.View<StyleProps>`
  height: 15px;
  min-width: 15px;
  border-width: 2px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  border-color: ${(props) => props.borderColor};
`;

export const CardPointsText = styled.Text`
  font-size: 11px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ButtonShowTouch = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const CardVisible = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  bordee-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const CardVisibleName = styled.Text`
  flex: 1;
  font-size: 10px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardVisiblePlacar = styled.Text<StyleProps>`
  font-size: 11px;
  font-family: SairaSemiCondensed-Bold;
  margin-horizontal: 3px;
  color: ${(props) =>
    props.bool ? props.theme.colors.textBlue : props.theme.colors.textGray1};
`;
