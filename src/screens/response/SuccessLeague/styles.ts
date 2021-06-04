import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  justify-content: space-evenly;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.greenPrimary};
`;

export const TextStyle = styled.Text`
  font-size: 20px;
  text-align: center;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  height: 64px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;
