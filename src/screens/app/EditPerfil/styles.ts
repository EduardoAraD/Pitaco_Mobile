import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ImgStyle = styled.Image`
  height: 100px;
  width: 100px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const ImgStyleView = styled.View`
  height: 100px;
  width: 100px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const TextImg = styled.Text`
  font-family: SairaSemiCondensed-Regular;
  text-align: center;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const InfoUrl = styled.View`
  flex-direction: row;
  margin-vertical: 20px;
  align-items: center;
`;

export const InfoUrlvalid = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  border-radius: 15px;
  elevation: 3;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextButton = styled.Text`
  font-family: SairaSemiCondensed-Medium;
  font-size: 16px;
  color: ${(props) => props.theme.colors.whitePrimary};
`;
