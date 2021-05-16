import styled from 'styled-components/native';

export const TitleCard = styled.View`
  height: 50px;
  elevation: 5;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whitePrimary};
`;

export const TextTitle = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray2};
`;
