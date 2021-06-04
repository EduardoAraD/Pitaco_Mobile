import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Header, HeaderTitle, IconWhite } from './styles';

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
  const navigation = useNavigation();

  return (
    <Header border={border}>
      {back ? (
        <BorderlessButton onPress={navigation.goBack}>
          <IconWhite name="arrow-left" />
        </BorderlessButton>
      ) : (
        <BorderlessButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <IconWhite name="menu" />
        </BorderlessButton>
      )}
      <HeaderTitle>{title}</HeaderTitle>
    </Header>
  );
}
