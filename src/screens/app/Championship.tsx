import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import DoubleButtom from '../../components/buttons/DoubleButton';
import ItemStandingComplete from '../../components/ItemStandingComplete';
import ItemMatch from '../../components/ItemMatch';

import { ItemStanding } from '../../models/ItemStanding';
import { Match } from '../../models/Match';
import { Rodada } from '../../models/Rodada';

import * as servicesChampionship from '../../services/championship';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  cardStanding: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 20,
    elevation: 2,
  },
  cardTitleStanding: {
    height: 40,
  },
  cardTitleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    alignContent: 'center',
    margin: 3,
    marginLeft: 10,
  },
  cardSubs: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardSubsText: {
    width: 20,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
  },
  cardTitleMatch: {
    height: 40,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  cardTitleMatchText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const allRodadas: Rodada[] = [];

export default function Championship() {
  const { theme, championship } = useAuth();
  const [viewOptionStandingMatch, setViewOptionStandingMatch] = useState(true);
  const [itemsStanding, setItemsStanding] = useState<ItemStanding[]>([]);
  const [numberRodada, setNumberRodada] = useState(1);
  const [matchs, setMatchs] = useState<Match[]>([]);

  async function loadingData() {
    const standingResponse = await servicesChampionship.getStandingChampionship(
      championship
    );
    if (standingResponse.error === '') {
      setItemsStanding(standingResponse.data);
    } else {
      Snackbar.show({
        text: standingResponse.error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
      });
    }
    const matchResponse = await servicesChampionship.getCurrentRodada(
      championship
    );
    if (matchResponse.error === '') {
      setNumberRodada(matchResponse.data.number);
      setMatchs(matchResponse.data.matchs);
      allRodadas.push(matchResponse.data);
    } else {
      Snackbar.show({
        text: matchResponse.error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
      });
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  async function handleUpdateNumberRodada(val: number) {
    const newNumber = numberRodada + val;
    if (newNumber >= 1 && newNumber <= 38) {
      const rodada = allRodadas.find((item) => item.number === newNumber);
      setNumberRodada(newNumber);
      if (rodada) {
        setMatchs(rodada.matchs);
      } else {
        const { data, error } = await servicesChampionship.getRodada(
          championship,
          newNumber
        );
        if (error === '') {
          setMatchs(data.matchs);
          allRodadas.push(data);
        } else {
          Snackbar.show({
            text: error,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: theme.textRed,
            textColor: theme.textWhite,
          });
        }
      }
    }
  }

  function content() {
    return viewOptionStandingMatch ? (
      <View
        style={[styles.cardStanding, { backgroundColor: theme.whitePrimary }]}
      >
        <View style={styles.cardTitleStanding}>
          <Text style={[styles.cardTitleText, { color: theme.textGray3 }]}>
            Classificação - Brasileiro A 20/21
          </Text>
          <View
            style={[styles.cardSubs, { backgroundColor: theme.greenPrimary }]}
          >
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              P
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              J
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              V
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              E
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              D
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              S
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              GF
            </Text>
            <Text style={[styles.cardSubsText, { color: theme.whitePrimary }]}>
              GS
            </Text>
            <Text
              style={[
                styles.cardSubsText,
                { width: 32, color: theme.whitePrimary },
              ]}
            >
              %
            </Text>
          </View>
        </View>
        {itemsStanding.map((item) => (
          <ItemStandingComplete key={item.position} item={item} />
        ))}
      </View>
    ) : (
      <View
        style={[styles.cardStanding, { backgroundColor: theme.whitePrimary }]}
      >
        <View style={[styles.cardTitleMatch, { borderColor: theme.textGray4 }]}>
          <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
            <Icon name="chevron-left" size={30} color={theme.greenSecundary} />
          </TouchableOpacity>
          <Text
            style={[styles.cardTitleMatchText, { color: theme.greenPrimary }]}
          >
            {numberRodada}° Rodada
          </Text>
          <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
            <Icon name="chevron-right" size={30} color={theme.greenSecundary} />
          </TouchableOpacity>
        </View>
        {matchs.map((match) => (
          <ItemMatch key={match.id} match={match} />
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <ScrollView style={styles.scroll}>
        <DoubleButtom
          nameOption1="Jogos"
          nameOption2="Tabela"
          option={viewOptionStandingMatch}
          setOption={setViewOptionStandingMatch}
        />
        {content()}
      </ScrollView>
    </View>
  );
}
