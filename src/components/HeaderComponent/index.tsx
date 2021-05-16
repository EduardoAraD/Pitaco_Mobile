import React, { useContext } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { ThemeContext } from 'styled-components';
import { Header, HeaderTitle } from './styles';

interface HeaderProps {
  title: string;
  back?: boolean;
  border?: boolean;
}

export default function HeaderComponent({
  title,
  back = false,
  border = false,
}: HeaderProps) {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <Header border={border}>
      {back ? (
        <BorderlessButton onPress={navigation.goBack}>
          <Icon name="arrow-left" size={30} color={colors.whitePrimary} />
        </BorderlessButton>
      ) : (
        <BorderlessButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="menu" size={30} color={colors.whitePrimary} />
        </BorderlessButton>
      )}
      <HeaderTitle>{title}</HeaderTitle>
    </Header>
  );
}
