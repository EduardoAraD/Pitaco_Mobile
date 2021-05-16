import styled from 'styled-components/native';

export const SafeContent = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundWhite};
`;

export const UserInfoSectionTouch = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const UserInfoImage = styled.Image`
  height: 45px;
  width: 45px;
  margin-right: 8px;
`;

export const UserInfo = styled.View`
  flex: 1px;
  justify-content: space-between;
`;

export const UserInfoName = styled.Text`
  font-size: 18px;
  font-family: SairaSemiCondensed-Bold;
  color: ${(props) => props.theme.colors.textGray1};
`;

export const UserInfoClube = styled.Text`
  font-size: 13px;
  font-family: SairaSemiCondensed-Light;
  color: ${(props) => props.theme.colors.textGray3};
`;

export const DrawerSection = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textGray4};
`;

export const ButtonDrawerSection = styled.View`
  margin-bottom: 15px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.textGray4};
`;

export const PreferenceView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 12px;
  padding-horizontal: 16px;
`;

export const TextPreference = styled.Text`
  font-family: SairaSemiCondensed-Bold;
  margin-left: 15px;
  margin-top: 4px;
  color: ${(props) => props.theme.colors.textGray3};
`;
