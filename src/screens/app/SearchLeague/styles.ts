import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const FlatStyle = styled.FlatList`
  padding-horizontal: 20px;
`;

export const LoadingStyle = styled.View`
  height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardTouch = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  flex-direction: row;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  margin-vertical: 5px;
  border-radius: 20px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardInfo = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: 10px;
`;

export const CardImg = styled.Image`
  height: 50px;
  width: 50px;
`;

export const CardInfoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoDono = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;
