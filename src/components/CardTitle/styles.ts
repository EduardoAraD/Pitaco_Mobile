import styled from 'styled-components/native';

export const CardView = styled.View`
  width: 100%;
  margin-vertical: 10px;
  border-radius: 20px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const CardTitleView = styled.View`
  height: 40px;
  padding: 5px;
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const CardText = styled.Text`
  font-size: 17px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const CardButtonTouch = styled.TouchableOpacity`
  height: 30px;
  width: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const CardButtonText = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.whitePrimary};
`;
