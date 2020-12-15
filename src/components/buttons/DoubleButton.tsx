import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    height: 50,
    elevation: 2,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonLeft: {
    flex: 1,
    width: 140,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRight: {
    flex: 1,
    width: 140,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

interface Props {
  nameOption1: string;
  nameOption2: string;
  option: boolean;
  setOption: Function;
}

export default function DoubleButtom({
  nameOption1,
  nameOption2,
  option,
  setOption,
}: Props) {
  const { theme } = useAuth();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.buttonLeft,
          {
            backgroundColor: option ? theme.whitePrimary : theme.greenSecundary,
          },
        ]}
        onPress={() => setOption(false)}
      >
        <Text
          style={[
            styles.buttonText,
            { color: option ? theme.textGray3 : theme.textWhite },
          ]}
        >
          {nameOption1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonRight,
          {
            backgroundColor: option ? theme.greenSecundary : theme.whitePrimary,
          },
        ]}
        onPress={() => setOption(true)}
      >
        <Text
          style={[
            styles.buttonText,
            { color: option ? theme.textWhite : theme.textGray3 },
          ]}
        >
          {nameOption2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
