import styled from 'styled-components/native';

interface Props {
  principal?: boolean;
  darkMode?: boolean;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const ViewButtomAction = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonAction = styled.TouchableOpacity<Props>`
  height: 30px;
  width: 130px;
  margin-vertical: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  elevation: 2;
  background-color: ${(props) =>
    props.principal
      ? props.theme.colors.greenSecundary
      : props.theme.colors.textRed};
`;

export const ButtonActionText = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const CardLeagueStyle = styled.View`
  height: 90px;
  width: 100%;
  flex-direction: row;
  padding: 10px;
  margin-vertical: 20px;
  border-radius: 20px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImgStyle = styled.Image`
  height: 70px;
  width: 70px;
`;

export const CardLeagueInfo = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: 10px;
`;

export const CardLeagueInfoDescrip = styled.Text`
  font-size: 14px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardLeagueInfoDono = styled.Text<Props>`
  font-size: 14px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) =>
    props.principal
      ? props.theme.colors.yellowPrimary
      : props.theme.colors.greenSecundary};
`;

export const ViewPoint = styled.View`
  margin-vertical: 10px;
  width: 100%;
  elevation: 2;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardStandingStyle = styled.View`
  margin-vertical: 20px;
  width: 100%;
  min-height: 120px;
  border-radius: 20px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardStandingTitle = styled.View`
  height: 40px;
  padding-horizontal: 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  flex-direction: row;
  border-color: ${(props) => props.theme.colors.textGray3};
`;

export const CardStandingTitleText = styled.Text`
  font-size: 14px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const PickerStyle = styled.TouchableOpacity`
  width: 100px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentItensPicker = styled.View<Props>`
  position: absolute;
  width: 110px;
  height: 80px;
  right: 10px;
  top: 41px;
  z-index: 999;
  elevation: 5;
  background-color: ${(props) =>
    props.darkMode
      ? props.theme.colors.textGray4
      : props.theme.colors.whitePrimary};
`;

export const ItemPicker = styled.TouchableOpacity`
  justify-content: center;
  height: 40px;
  border-bottom-width: 1px;
  padding-horizontal: 4px;
  border-bottom-color: ${(props) => props.theme.colors.textGray2};
`;
