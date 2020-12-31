import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useAuth } from '../contexts/auth';

import ThemeLigth from '../assets/theme/light';
import ThemeDark from '../assets/theme/dark';

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 20,
  },
});

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
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: theme.greenPrimary },
        border ? { elevation: 3 } : {},
      ]}
    >
      {back ? (
        <BorderlessButton onPress={navigation.goBack}>
          <Icon name="arrow-left" size={30} color={theme.whitePrimary} />
        </BorderlessButton>
      ) : (
        <BorderlessButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="menu" size={30} color={theme.whitePrimary} />
        </BorderlessButton>
      )}
      <Text style={[styles.headerTitle, { color: theme.whitePrimary }]}>
        {title}
      </Text>
    </View>
  );
}
