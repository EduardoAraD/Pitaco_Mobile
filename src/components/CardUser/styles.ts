import styled from 'styled-components/native';

export const CardTouch = styled.TouchableOpacity`
  height: 70px;
  padding: 5px;
  padding-horizontal: 10px;
  border-radius: 20px;
  elevation: 2;
  flex-direction: row;
  margin-vertical: 5px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImage = styled.Image`
  height: 60px;
  width: 60px;
  margin-right: 10px;
  border-radius: 50px;
`;

export const CardInfoView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const CardInfoName = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoClube = styled.View`
  flex-direction: row;
`;

export const CardInfoClubeName = styled.View`
  font-size: 14px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const CardInfoClubeImage = styled.Image`
  height: 20px;
  width: 20px;
  margin-horizontal: 3px;
`;
