import styled from 'styled-components/native';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const ViewTitle = styled.View`
  margin-top: 30px;
  margin-horizontal: 20px;
  padding-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const TextTitle = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.greenPrimary};
`;

export const TitleButton = styled.TouchableOpacity`
  height: 30px;
  width: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const TitleButtonText = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const ScrollStyle = styled.ScrollView`
  padding-horizontal: 20px;
`;
