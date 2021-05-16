import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  height: 64px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextButton = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.whitePrimary};
`;
