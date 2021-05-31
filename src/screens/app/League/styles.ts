import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const ViewTitle = styled.View`
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const ViewTitleText = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  text-align: center;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-vertical: 5px;
  height: 30px;
  justify-content: space-between;
`;

export const ButtomStyle = styled.TouchableOpacity`
  height: 30px;
  width: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextButtom = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textWhite};
  fontfamily: SairaSemiCondensed-Medium;
`;

export const ViewButtonStyle = styled.View`
  height: 30px;
  width: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  elevation: 0;
`;

export const CardStyle = styled.View`
  height: 70px;
  width: 100%;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  margin-vertical: 10px;
  border-radius: 20px;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardText = styled.Text`
  font-size: 14px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const TextDefault = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textGray3};
  fontfamily: SairaSemiCondensed-Medium;
`;
