import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContainerEmail = styled.View`
  flex: 1;
  justify-content: center;
`;
