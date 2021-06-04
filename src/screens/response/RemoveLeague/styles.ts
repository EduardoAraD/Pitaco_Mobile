import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  justifycontent: space-evenly;
  background-color: ${(props) => props.theme.colors.backgroundRed};
`;

export const StatusBarStyle = styled.StatusBar`
  background-color: ${(props) => props.theme.colors.backgroundRed};
`;

export const TextStyle = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  text-align: center;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 140px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  height: 42px;
  border-radius: 10px;
  elevation: 3;
  background-color: ${(props) => props.theme.colors.textRed};
`;
