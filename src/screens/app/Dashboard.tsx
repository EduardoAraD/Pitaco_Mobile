import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../contexts/auth';

import LoadingPage from '../../components/LoadingPage';
import CardTitle from '../../components/CardTitle';
import ItemStandingComponent from '../../components/ItemStanding';
import ItemMatch from '../../components/ItemMatch';

import { ItemStanding } from '../../models/ItemStanding';
import { initRodada, Rodada } from '../../models/Rodada';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import * as servicesChampionship from '../../services/championship';
import { getPitacoMatchToday } from '../../services/pitaco';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  card: {
    height: 200,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 2,
  },
  cardPerfil: {
    height: 160,
    borderBottomWidth: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardUser: {
    flex: 1,
    alignItems: 'center',
  },
  cardImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  cardTextName: {
    marginTop: 7,
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfo: {
    width: 140,
    height: 140,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardInfoText: {
    fontSize: 17,
    fontFamily: 'SairaSemiCondensed-Light',
    marginLeft: 4,
  },
  cardInfoTextSemi: {
    fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 20,
  },
  cardInfoTextDestaque: {
    fontSize: 30,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardActionTextUndone: {
    fontFamily: 'SairaSemiCondensed-Light',
    // color: theme.textRed
  },
  cardActionButton: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default function Dashboard() {
  const { themeDark, user, championship, currentRodada } = useAuth();
  const [loading, setLoading] = useState(true);
  const [standing, setStanding] = useState<ItemStanding[]>([]);
  const [rodada, setRodada] = useState<Rodada>(initRodada());
  const [textAction, setTextAction] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const theme = themeDark ? ThemeDark : ThemeLigth;

  async function loadingData() {
    setLoading(true);
    const standingResponse = await servicesChampionship.getStandingChampionship(
      championship
    );
    if (standingResponse.error === '') {
      setStanding(standingResponse.data.filter((item, index) => index < 6));
    }

    const pitacoResponse = await getPitacoMatchToday(user?.email || '');
    if (pitacoResponse.error === '') {
      const pitacos = pitacoResponse.data;
      if (pitacos.length !== 0) {
        let notPitaco = false;
        const matchs = pitacos.map((item) => {
          if (item.pitaco.golsAway === '' || item.pitaco.golsHome === '')
            notPitaco = true;
          return item.match;
        });
        const rodadaAux: Rodada = {
          matchs,
          name: '',
          number: 0,
          prev: 0,
          prox: 0,
        };
        setRodada(rodadaAux);
        if (notPitaco) setTextAction(2);
        else setTextAction(1);
      } else {
        const matchResponse = await servicesChampionship.getRodada(
          championship,
          currentRodada
        );
        if (matchResponse.error === '') {
          setRodada(matchResponse.data);
          setTextAction(0);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, [user]);

  function colorTextAction(val: number) {
    switch (val) {
      case 1:
        return theme.greenPrimary;
      case 2:
        return theme.textRed;
      default:
        return theme.textGray1;
    }
  }

  function textOptionAction(val: number) {
    switch (val) {
      case 1:
        return 'Tudo pronto, boa sorte pitaqueiro.';
      case 2:
        return 'Faça seus Pitacos para os jogos de hoje.';
      default:
        return 'Os jogos acontecerão em dias, prepare-se.';
    }
  }

  function textActionUser() {
    return (
      <Text
        style={{
          color: colorTextAction(textAction),
          fontFamily: 'SairaSemiCondensed-Medium',
        }}
      >
        {textOptionAction(textAction)}
      </Text>
    );
  }

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return !loading ? (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundWhite }]}
    >
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            colors={[theme.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
          <View style={[styles.cardPerfil, { borderColor: theme.textGray4 }]}>
            <View style={styles.cardUser}>
              <Image
                style={styles.cardImg}
                resizeMode="contain"
                source={{ uri: user?.avatar }}
              />
              <Text
                style={[styles.cardTextName, { color: theme.textGray1 }]}
                numberOfLines={1}
              >
                {user?.name}
              </Text>
            </View>
            <View style={[styles.cardInfo, { borderColor: theme.textGray4 }]}>
              <Text style={[styles.cardTextName, { color: theme.textGray2 }]}>
                Parcial
              </Text>
              <View style={styles.cardInfoContent}>
                <Text
                  style={[
                    styles.cardInfoTextDestaque,
                    { color: theme.greenPrimary },
                  ]}
                >
                  {user?.points[0].points}
                </Text>
                <Text style={[styles.cardInfoText, { color: theme.textGray3 }]}>
                  pontos
                </Text>
              </View>
              <View style={styles.cardInfoContent}>
                <Text
                  style={[styles.cardInfoTextSemi, { color: theme.textGray2 }]}
                >
                  {user?.points[0].exactScore}
                </Text>
                <Text style={[styles.cardInfoText, { color: theme.textGray3 }]}>
                  cravados
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardAction}>
            {textActionUser()}
            <Link to="/Pitaco">
              <TouchableOpacity
                style={[
                  styles.cardActionButton,
                  { backgroundColor: theme.greenSecundary },
                ]}
              >
                <Icon name="arrow-right" size={20} color={theme.whitePrimary} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <CardTitle title="Classificação">
          {standing.map((item) => (
            <ItemStandingComponent
              key={item.position}
              position={item.position}
              clube={item.clube}
              points={item.points}
              wins={item.wins}
              golsScore={item.golsScore}
              matchs={item.matchs}
              golsDiff={item.golsDiff}
              positionVariation={item.positionVariation}
              status={item.status}
            />
          ))}
          <View
            style={{
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="dots-vertical" color={theme.textGray3} />
          </View>
        </CardTitle>
        <CardTitle
          title={
            rodada.number !== 0
              ? `Jogos da ${rodada.number}° rodada`
              : 'Jogos de Hoje'
          }
        >
          {rodada.matchs.map((match) => (
            <ItemMatch key={match.id} match={match} />
          ))}
        </CardTitle>
      </ScrollView>
    </View>
  ) : (
    <LoadingPage />
  );
}
