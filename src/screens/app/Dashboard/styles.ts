import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  colorP?: boolean;
  colorVal?: number;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const Card = styled.View`
  height: 200px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardPerfil = styled.View`
  height: 160px;
  border-bottom-width: 2px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardUser = styled.View`
  flex: 1px;
  align-items: center;
`;

export const CardImg = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

export const CardTextName = styled.Text<Props>`
  margin-top: 7px;
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) =>
    props.colorP ? props.theme.colors.textGray1 : props.theme.colors.textGray2};
`;

export const CardInfo = styled.View`
  width: 140px;
  height: 140px;
  padding: 10px;
  border-width: 1px;
  border-radius: 20px;
  align-items: center;
  justify-content: space-around;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardInfoContent = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const CardInfoText = styled.Text`
  font-size: 17px;
  font-family: SairaSemiCondensed-Light;
  margin-left: 4px;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const CardInfoTextSemi = styled.Text`
  font-family: SairaSemiCondensed-Bold;
  font-size: 20px;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardInfoTextDestaque = styled.Text`
  font-size: 30px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardAction = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CardActionTextUndone = styled.Text`
  font-family: SairaSemiCondensed-Light;
`;

export const CardActionButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextSelect = styled.Text<Props>`
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.colorVal === 1
      ? props.theme.colors.greenPrimary
      : props.colorVal === 2
      ? props.theme.colors.textRed
      : props.theme.colors.textGray1};
`;

export const RefreshStyle = styled.RefreshControl`
  color: ${(props) => props.theme.colors.greenSecundary};
`;

export const IconWhite = styled(Icon)`
  color: ${(props) => props.theme.colors.whitePrimary};
  size: 20px;
`;

export const IconGray3 = styled(Icon)`
  color: ${(props) => props.theme.colors.textGray3};
  size: 20px;
`;
