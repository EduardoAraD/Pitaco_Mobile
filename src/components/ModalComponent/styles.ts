import styled from 'styled-components/native';

export const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #33333377;
`;

export const ModalView = styled.View`
  height: 400px;
  width: 280px;
  border-radius: 20px;
  border-width: 2px;
  align-items: center;
  elevation: 5;
  background-color: ${(props) => props.theme.colors.backgroundGreen};
  border-color: ${(props) => props.theme.colors.greenPrimary};
`;

export const OpenButton = styled.TouchableHighlight`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  border-top-right-radius: 20px;
  elevation: 2;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: ${(props) => props.theme.colors.textRed};
`;

export const TextStyle = styled.Text`
  font-family: SairaSemiCondensed-Bold;
  text-align: center;
  font-size: 27px;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
  font-family: SairaSemiCondensed-Medium;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: SairaSemiCondensed-Medium;
  margin: 10px;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const ScrollViewStyle = styled.ScrollView`
  flex: 1;
  margin: 15px;
`;

export const TextScroll = styled.Text`
  font-family: SairaSemiCondensed-Medium;
  color: ${(props) => props.theme.colors.textGray3};
`;
