import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import ButtomConfirm from '../../components/buttons/BottonConfirmComponent';
import DoubleConfirm from '../../components/buttons/DoubleButton';
import CardTitlePage from '../../components/CardTitlePage';
import InputMatch from '../../components/InputMatch';
import LoadingResponse from '../../components/LoadingResponse';

import { Match } from '../../models/Match';
import { Pitaco } from '../../models/Pitaco';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import * as servicesPitaco from '../../services/pitaco';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  scrollButtonContainer: {
    marginTop: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollButtonLeft: {
    height: 50,
    width: 140,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollButtonRight: {
    height: 50,
    width: 140,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollButtonText: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
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
  cardTitleText: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  loading: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface PitacoMatch {
  match: Match;
  pitaco: Pitaco;
}
interface RodadaPitaco {
  rodada: number;
  matchs: PitacoMatch[];
}
interface PitacoRequest {
  golsHome: number;
  golsAway: number;
  id: number;
}

let allRodadas: RodadaPitaco[] = [];

export default function PitacoScreen() {
  const { themeDark, user, championship, currentRodada } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewRodada, setViewRodada] = useState(true);
  const [numberRodada, setNumberRodada] = useState(currentRodada);
  const [arrayMatchs, setArrayMatchs] = useState<PitacoMatch[]>([]);
  const [arrayMatchsToday, setArrayMatchsToday] = useState<PitacoMatch[]>([]);

  function messageSnackbarError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: theme.textRed,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadingData() {
    setLoading(true);
    const responseToday = await servicesPitaco.getPitacoMatchToday(
      user?.email || ''
    );
    if (responseToday.data !== []) {
      setArrayMatchsToday(responseToday.data);
    } else {
      messageSnackbarError(responseToday.error);
    }
    const responseRodada = await servicesPitaco.getPitacoMatchRodada(
      user?.email || '',
      championship,
      currentRodada
    );
    if (responseRodada.data !== []) {
      setArrayMatchs(responseRodada.data);
      setNumberRodada(currentRodada);
      allRodadas.push({ rodada: currentRodada, matchs: responseRodada.data });
    } else {
      messageSnackbarError(responseRodada.error);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, []);

  async function handleUpdateNumberRodada(val: number) {
    const newNumber = numberRodada + val;
    if (newNumber >= 1 && newNumber <= 38) {
      setNumberRodada(newNumber);
      const rodada = allRodadas.find((item) => item.rodada === newNumber);
      if (rodada) {
        setArrayMatchs(rodada.matchs);
      } else {
        const responseRodada = await servicesPitaco.getPitacoMatchRodada(
          user?.email || '',
          championship,
          newNumber
        );
        if (responseRodada.data !== []) {
          setArrayMatchs(responseRodada.data);
          allRodadas.push({ rodada: newNumber, matchs: responseRodada.data });
        } else {
          messageSnackbarError(responseRodada.error);
        }
      }
    }
  }

  function titleCard() {
    const date = new Date();
    return viewRodada ? (
      <View style={[styles.cardTitle, { borderColor: theme.textGray4 }]}>
        <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
          <Icon name="chevron-left" size={30} color={theme.greenSecundary} />
        </TouchableOpacity>
        <Text style={[styles.cardTitleText, { color: theme.greenPrimary }]}>
          {numberRodada}° Rodada
        </Text>
        <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
          <Icon name="chevron-right" size={30} color={theme.greenSecundary} />
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={[
          styles.cardTitle,
          { justifyContent: 'center', borderColor: theme.textGray4 },
        ]}
      >
        <Text style={[styles.cardTitleText, { color: theme.greenPrimary }]}>
          Jogos de Hoje (
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`})
        </Text>
      </View>
    );
  }

  function handleGolsHomeArray(text: string, index: number) {
    if (text.length <= 2) {
      if (viewRodada) {
        const arrayUpdate = arrayMatchs.map((match) => match);
        if (text.length === 0) {
          arrayUpdate[index].pitaco.golsHome = '';
        } else {
          arrayUpdate[index].pitaco.golsHome = text.replace(/[^0-9]/g, '');
        }
        arrayUpdate[index].pitaco.update = true;
        setArrayMatchs(arrayUpdate);
      } else {
        const arrayUpdate = arrayMatchsToday[index];
        if (text.length === 0) {
          arrayUpdate.pitaco.golsHome = '';
        } else {
          arrayUpdate.pitaco.golsHome = text.replace(/[^0-9]/g, '');
        }
        arrayUpdate.pitaco.update = true;
        arrayMatchsToday.splice(index, 1, arrayUpdate);
        setArrayMatchsToday([...arrayMatchsToday]);
      }
    }
  }

  function handleGolsAwayArray(text: string, index: number) {
    if (text.length <= 2) {
      if (viewRodada) {
        const arrayUpdate = arrayMatchs.map((match) => match);
        if (text.length === 0) {
          arrayUpdate[index].pitaco.golsAway = '';
        } else {
          arrayUpdate[index].pitaco.golsAway = text.replace(/[^0-9]/g, '');
        }
        arrayUpdate[index].pitaco.update = true;
        setArrayMatchs(arrayUpdate);
      } else {
        const arrayUpdate = arrayMatchsToday[index];
        if (text.length === 0) {
          arrayUpdate.pitaco.golsAway = '';
        } else {
          arrayUpdate.pitaco.golsAway = text.replace(/[^0-9]/g, '');
        }
        arrayUpdate.pitaco.update = true;
        arrayMatchsToday.splice(index, 1, arrayUpdate);
        setArrayMatchsToday([...arrayMatchsToday]);
      }
    }
  }

  function showMatchs() {
    function notSpentTime(dataNow: Date, data: Date) {
      data.setHours(data.getHours() - 2);
      return dataNow < data;
    }
    const matchs = viewRodada ? arrayMatchs : arrayMatchsToday;
    const dateNow = new Date();
    if (matchs.length > 0) {
      return matchs.map((item, index) => {
        const [day, mount, year] = item.match.date.split('/');
        const dateMatch = new Date(
          `${year}/${mount}/${day} ${item.match.hour}`
        );
        return (
          <InputMatch
            key={item.match.id}
            index={index}
            update={item.pitaco.update}
            golsHome={item.pitaco.golsHome.toString()}
            setGolsHome={handleGolsHomeArray}
            golsAway={item.pitaco.golsAway.toString()}
            setGolsAway={handleGolsAwayArray}
            match={item.match}
            point={item.pitaco.point}
            notFinishPitaco={notSpentTime(dateNow, dateMatch)}
          />
        );
      });
    }
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{ fontSize: 16, color: theme.textGray4, textAlign: 'center' }}
        >
          Sem Jogos
        </Text>
      </View>
    );
  }

  async function handleConfirm() {
    setLoadingResponse(true);
    function pitacoMatchForPitacoRequest(pitMatch: PitacoMatch[]) {
      return pitMatch
        .filter(
          (itemPM) =>
            itemPM.pitaco.update &&
            itemPM.pitaco.golsHome !== '' &&
            itemPM.pitaco.golsAway !== ''
        )
        .map((item) => {
          return {
            golsHome: parseInt(item.pitaco.golsHome, 10),
            golsAway: parseInt(item.pitaco.golsAway, 10),
            id: item.match.id,
          };
        });
    }

    function pitacoForPitacoMatch(pitacos: Pitaco[], pitMatch: PitacoMatch[]) {
      return pitMatch.map((item) => {
        for (let i = 0; i < pitacos.length; i += 1) {
          const pitaco = pitacos[i];
          if (item.match.id === pitaco.match.id) {
            return {
              pitaco: { ...pitaco, update: false },
              match: pitaco.match,
            };
          }
        }
        return item;
      });
    }

    const pitacosReq: PitacoRequest[] = pitacoMatchForPitacoRequest(
      viewRodada ? arrayMatchs : arrayMatchsToday
    );
    if (pitacosReq.length === 0) {
      messageSnackbarError('Nenhum Pitaco foi registrado');
      setLoadingResponse(false);
      return;
    }
    const { pitacos, error } = await servicesPitaco.createPitacoMatch(
      user?.email || '',
      pitacosReq
    );
    if (pitacos !== []) {
      const newArrayMatchs: PitacoMatch[] = pitacoForPitacoMatch(
        pitacos,
        viewRodada ? arrayMatchs : arrayMatchsToday
      );
      if (viewRodada) {
        setArrayMatchs(newArrayMatchs);
        allRodadas = allRodadas.map((item) => {
          if (item.rodada === numberRodada)
            return { rodada: numberRodada, matchs: newArrayMatchs };
          return item;
        });
      } else setArrayMatchsToday(newArrayMatchs);

      Snackbar.show({
        text: 'Pitacos registrados com sucesso',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.greenPrimary,
        textColor: theme.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    } else {
      messageSnackbarError(error);
    }
    setLoadingResponse(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      {loadingResponse ? <LoadingResponse /> : <View />}
      <CardTitlePage title="Pitacos encerram 2h antes do jogo" />
      <ScrollView style={styles.scroll}>
        <DoubleConfirm
          nameOption1="Hoje"
          nameOption2="Rodada"
          option={viewRodada}
          setOption={setViewRodada}
        />
        <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
          {titleCard()}
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={theme.greenPrimary} />
            </View>
          ) : (
            showMatchs()
          )}
        </View>
        <View style={{ margin: 5 }} />
        <ButtomConfirm onPress={handleConfirm} />
      </ScrollView>
    </View>
  );
}
