import { useContext } from 'react';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

const { colors } = useContext(ThemeContext);

export function messageSnackbar(message: string, color: string) {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: color,
    textColor: colors.textWhite,
    fontFamily: 'SairaSemiCondensed-Medium',
  });
}
