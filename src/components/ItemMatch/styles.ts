import styled from 'styled-components/native';

interface StyleProps {
  bool: boolean;
}

export const CardContainer = styled.View`
  width: 100%;
  padding-vertical: 2px;
  padding-horizontal: 4px;
  align-items: center;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardGame = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardGameImage = styled.Image`
  height: 30px;
  width: 30px;
`;

export const CardGameItem = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const CardGamePlacar = styled.View`
  margin-horizontal: 10px;
  align-items: center;
`;

export const TextCardStadium = styled.Text`
  font-size: 9px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const TextCardHour = styled.Text`
  font-size: 7px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const TextCardPlacar = styled.Text<StyleProps>`
  font-size: 25px;
  font-family: SairaSemiCondensed-SemiBold;
  color: ${(props) =>
    props.bool ? props.theme.colors.textBlue : props.theme.colors.textGray1};
`;

export const TextCardName = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;
