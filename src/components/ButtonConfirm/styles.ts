import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  height: 64px;
  border-radius: 20px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TextButton = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textWhite};
`;
