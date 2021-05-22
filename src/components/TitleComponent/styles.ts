import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const TextStyle = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Medium;
  text-align: center;
  color: ${(props) => props.theme.colors.textGray3};
`;
