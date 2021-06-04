import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ViewSearch = styled.View`
  flex: 1;
`;

export const TitleText = styled.Text`
  margin: 20px;
  margin-bottom: 0px;
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const ScrollStyle = styled.ScrollView`
  margin-horizontal: 20px;
`;

export const CardTouch = styled.TouchableOpacity`
  height: 40px;
  padding: 5px;
  margin-vertical: 5px;
  align-items: center;
  border-radius: 10px;
  flex-direction: row;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImg = styled.Image`
  height: 30px;
  width: 30px;
  margin-horizontal: 5px;
`;

export const CardText = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ViewInfo = styled.View`
  margin-horizontal: 20px;
  border-top-width: 1px;
`;

export const TitleTextInfo = styled.View`
  margin-top: 10px;
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
`;

export const LoadingStyle = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
