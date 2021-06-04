import styled from 'styled-components/native';

interface ButtonProps {
  option?: boolean;
  left?: boolean;
}

export const ButtonsView = styled.View`
  margin-top: 10px;
  height: 50px;
  elevation: 2;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  flex: 1;
  width: 140px;
  border-top-left-radius: ${(props) => (props.left ? '20px' : '0px')};
  border-bottom-left-radius: ${(props) => (props.left ? '20px' : '0px')};
  border-top-right-radius: ${(props) => (props.left ? '0px' : '20px')};
  border-bottom-right-radius: ${(props) => (props.left ? '0px' : '20px')};
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.option
      ? props.theme.colors.greenSecundary
      : props.theme.colors.whitePrimary};
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) =>
    props.option ? props.theme.colors.textWhite : props.theme.colors.textGray3};
`;
