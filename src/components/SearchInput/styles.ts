import styled from 'styled-components/native';

export const ViewSearch = styled.View`
  margin: 20px;
`;

export const SearchText = styled.Text`
  font-size: 15px;
  font-family: SairaSemiCondensed-Light;
  margin-bottom: 3px;
  color: ${(props) => props.theme.colors.textGray2};
`;

export const SearchAction = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const SearchInputStyle = styled.TextInput`
  border-radius: 10px;
  height: 40px;
  flex: 1;
  border-width: 1px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.whitePrimary};
  color: ${(props) => props.theme.colors.textGray2};
  border-color: ${(props) => props.theme.colors.textGray3};
`;

export const SearchButton = styled.TouchableOpacity`
  height: 40px;
  width: 90px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  elevation: 2;
  background-color: ${(props) => props.theme.colors.greenSecundary};
`;

export const SearchButtonText = styled.Text`
  font-size: 12px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textWhite};
`;

export const TitleText = styled.Text`
  font-size: 20px;
  font-family: SairaSemiCondensed-Bold;
  margin-horizontal: 20px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  color: ${(props) => props.theme.colors.greenPrimary};
  border-bottom-color: ${(props) => props.theme.colors.textGray3};
`;
