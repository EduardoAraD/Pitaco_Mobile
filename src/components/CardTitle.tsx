import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  cardTitle: {
    height: 40,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  cardText: {
    fontSize: 17,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardButton: {
    height: 30,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  cardButtonText: {
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function CardTitle({ title, children }: Props) {
  const { theme } = useAuth();

  return (
    <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
      <View style={[styles.cardTitle, { borderColor: theme.textGray4 }]}>
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          {title}
        </Text>
        <Link to="/Championship">
          <TouchableOpacity
            style={[
              styles.cardButton,
              { backgroundColor: theme.greenSecundary },
            ]}
          >
            <Text
              style={[styles.cardButtonText, { color: theme.whitePrimary }]}
            >
              Ver Mais
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      {children}
    </View>
  );
}
