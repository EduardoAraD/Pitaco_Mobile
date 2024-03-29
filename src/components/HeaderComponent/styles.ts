import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  border: boolean;
}

export const Header = styled.View<HeaderProps>`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.greenPrimary};
  elevation: ${(props) => (props.border ? 3 : 0)};
`;

export const HeaderTitle = styled.Text`
  margin-left: 20px;
  font-family: SairaSemiCondensed-Bold;
  font-size: 20px;
  color: ${(props) => props.theme.colors.whitePrimary};
`;

export const IconWhite = styled(Icon)`
  color: ${(props) => props.theme.colors.whitePrimary};
  font-size: 30px;
`;
