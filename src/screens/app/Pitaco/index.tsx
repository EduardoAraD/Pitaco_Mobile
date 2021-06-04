import React, { useState, useEffect, useContext } from 'react';
import { View, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import ButtomConfirm from '../../../components/ButtonConfirm';
import DoubleConfirm from '../../../components/DoubleButton';
import CardTitlePage from '../../../components/CardTitlePage';
import InputMatch from '../../../components/InputMatch';
import LoadingResponse from '../../../components/LoadingResponse';

import { Match } from '../../../models/Match';
import { Pitaco } from '../../../models/Pitaco';

import * as servicesPitaco from '../../../services/pitaco';

import {
  ActivityStyle,
  CardStyle,
  CardTitle,
  CardTitleText,
  ContainerSafe,
  LoadingStyle,
  // ScrollButtonContainer,
  // ScrollButtonLeft,
  // ScrollButtonRigth,
  // ScrollButtonText,
  ScrollStyle,
  TextNotMatch,
} from './styles';

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
  const { user, championship, currentRodada } = useAuth();
  const { colors } = useContext(ThemeContext);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [viewRodada, setViewRodada] = useState(true);
  const [numberRodada, setNumberRodada] = useState(currentRodada);
  const [arrayMatchs, setArrayMatchs] = useState<PitacoMatch[]>([]);
  const [arrayMatchsToday, setArrayMatchsToday] = useState<PitacoMatch[]>([]);

  function messageSnackbarError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.textRed,
      textColor: colors.textWhite,
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
      const pitacosMatch: PitacoMatch[] = [];
      for (let i = 0; i < responseRodada.data.length; i += 1) {
        let add = false;
        const pitacoMatchRodada = responseRodada.data[i];
        for (let j = 0; j < responseToday.data.length; j += 1) {
          const pitacoMatchToday = responseToday.data[j];
          if (pitacoMatchToday.match.id === pitacoMatchRodada.match.id) {
            pitacosMatch.push(pitacoMatchToday);
            add = true;
            break;
          }
        }
        if (!add) {
          pitacosMatch.push(pitacoMatchRodada);
        }
      }
      setArrayMatchs(pitacosMatch);
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
          const pitacosMatch: PitacoMatch[] = [];
          for (let i = 0; i < responseRodada.data.length; i += 1) {
            let add = false;
            const pitacoMatchRodada = responseRodada.data[i];
            for (let j = 0; j < arrayMatchsToday.length; j += 1) {
              const pitacoMatchToday = arrayMatchsToday[j];
              if (pitacoMatchToday.match.id === pitacoMatchRodada.match.id) {
                pitacosMatch.push(pitacoMatchToday);
                add = true;
                break;
              }
            }
            if (!add) {
              pitacosMatch.push(pitacoMatchRodada);
            }
          }
          setArrayMatchs(pitacosMatch);
          allRodadas.push({ rodada: newNumber, matchs: pitacosMatch });
        } else {
          messageSnackbarError(responseRodada.error);
        }
      }
    }
  }

  function titleCard() {
    const date = new Date();
    return viewRodada ? (
      <CardTitle>
        <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
          <Icon name="chevron-left" size={30} color={colors.greenSecundary} />
        </TouchableOpacity>
        <CardTitleText>{numberRodada}° Rodada</CardTitleText>
        <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
          <Icon name="chevron-right" size={30} color={colors.greenSecundary} />
        </TouchableOpacity>
      </CardTitle>
    ) : (
      <CardTitle style={{ justifyContent: 'center' }}>
        <CardTitleText>
          Jogos de Hoje (
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`})
        </CardTitleText>
      </CardTitle>
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
        <TextNotMatch>Sem Jogos</TextNotMatch>
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
        backgroundColor: colors.greenPrimary,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    } else {
      messageSnackbarError(error);
    }
    setLoadingResponse(false);
  }

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return (
    <ContainerSafe>
      {loadingResponse ? <LoadingResponse /> : <View />}
      <CardTitlePage title="Pitacos encerram 2h antes do jogo" />
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <DoubleConfirm
          nameOption1="Hoje"
          nameOption2="Rodada"
          option={viewRodada}
          setOption={setViewRodada}
        />
        <CardStyle>
          {titleCard()}
          {loading ? (
            <LoadingStyle>
              <ActivityStyle size="large" />
            </LoadingStyle>
          ) : (
            showMatchs()
          )}
        </CardStyle>
        <View style={{ margin: 5 }} />
        <ButtomConfirm onPress={handleConfirm} />
      </ScrollStyle>
    </ContainerSafe>
  );
}
