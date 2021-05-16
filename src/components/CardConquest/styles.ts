import styled from 'styled-components/native';

export const CardView = styled.View`
  height: 50px;
  width: 180px;
  margin-right: 10px;
  border-radius: 10px;
  padding: 5px;
  flex-direction: row;
  elevation: 1;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardImage = styled.Image`
  height: 40px;
  width: 40px;
  margin-right: 2px;
`;

export const CardInfoView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const CardInfoName = styled.Text`
  font-size: 13px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.yellowPrimary};
`;

export const CardInfoDesc = styled.Text`
  font-size: 11px;
  margin-right: 5px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const CardInfoPos = styled.Text`
  font-size: 10px;
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray2};
`;
