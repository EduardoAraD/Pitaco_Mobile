import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;
