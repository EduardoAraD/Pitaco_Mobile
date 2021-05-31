import styled from 'styled-components/native';

interface Props {
  escolhido: boolean;
}

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;

export const InputTextView = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-vertical: 5px;
`;

export const LabelView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 3px;
`;

export const TextDefault = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.colors.textGray3};
  font-family: SairaSemiCondensed-Medium;
`;

export const LabelNota = styled.Text`
  font-size: 10px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const InputStyle = styled.TextInput`
  width: 100%;
  border-radius: 20px;
  height: 100px;
  border-width: 1px;
  font-size: 20px;
  font-family: SairaSemiCondensed-Medium;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  color: ${(props) => props.theme.colors.textGray2};
  border-color: ${(props) => props.theme.colors.textGray3};
`;

export const ImgStyle = styled.Image`
  height: 100px;
  width: 100px;
`;

export const TouchStyle = styled.TouchableOpacity<Props>`
  border-color: ${(props) => props.theme.colors.textGray3};
  border-width: 1px;
  background-color: ${(props) =>
    props.escolhido
      ? props.theme.colors.yellowPrimary
      : props.theme.colors.backgroundWhite};
`;
