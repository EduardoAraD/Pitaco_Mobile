import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-vertical: 4px;
`;

export const Label = styled.Text`
  font-family: SairaSemiCondensed-Light;
  padding-bottom: 3px;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const Input = styled.TextInput`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  height: 56px;
  border-width: 1px;
  font-size: 20px;
  font-family: SairaSemiCondensed-Medium;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  color: ${(props) => props.theme.colors.textGray2};
  border-color: ${(props) => props.theme.colors.textGray3};
`;
