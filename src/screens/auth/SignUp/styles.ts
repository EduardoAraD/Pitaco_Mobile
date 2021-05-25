import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const InputContentView = styled.View`
  min-height: 350px;
  flex: 1;
  justify-content: space-around;
`;

export const CheckBoxContextView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
`;

export const CheckBoxText = styled.Text`
  color: ${(props) => props.theme.colors.textGray2};
  font-family: SairaSemiCondensed-Light;
`;
