import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import DoubleButtom from '../../../components/DoubleButton';
import ItemStandingComplete from '../../../components/ItemStandingComplete';
import ItemMatch from '../../../components/ItemMatch';

import { ItemStanding } from '../../../models/ItemStanding';
import { Match } from '../../../models/Match';
import { Rodada } from '../../../models/Rodada';

import * as servicesChampionship from '../../../services/championship';

import {
  ContainerSafe,
  CardStanding,
  CardSubs,
  CardSubsText,
  CardTitleMatch,
  CardTitleMatchText,
  CardTitleStanding,
  CardTitleText,
  LoadingStyle,
  ScrollStyle,
} from './styles';

const allRodadas: Rodada[] = [];

export default function Championship() {
  const { colors } = useContext(ThemeContext);
  const { championship, currentRodada } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [viewOptionStandingMatch, setViewOptionStandingMatch] = useState(true);
  const [itemsStanding, setItemsStanding] = useState<ItemStanding[]>([]);
  const [numberRodada, setNumberRodada] = useState(1);
  const [matchs, setMatchs] = useState<Match[]>([]);

  function snackbarMessageError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.textRed,
      textColor: colors.textWhite,
    });
  }

  async function loadingData() {
    setLoading(true);
    const standingResponse = await servicesChampionship.getStandingChampionship(
      championship
    );
    if (standingResponse.error === '') {
      setItemsStanding(standingResponse.data);
    } else {
      snackbarMessageError(standingResponse.error);
    }
    const matchResponse = await servicesChampionship.getRodada(
      championship,
      currentRodada
    );
    if (matchResponse.error === '') {
      setNumberRodada(matchResponse.data.number);
      setMatchs(matchResponse.data.matchs);
      allRodadas.push(matchResponse.data);
    } else {
      snackbarMessageError(matchResponse.error);
    }
    setLoading(false);
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
          snackbarMessageError(error);
        }
      }
    }
  }

  function content() {
    return viewOptionStandingMatch ? (
      <CardStanding>
        <CardTitleStanding>
          <CardTitleText>Classificação - Brasileiro A 20/21</CardTitleText>
          <CardSubs>
            <CardSubsText>P</CardSubsText>
            <CardSubsText>J</CardSubsText>
            <CardSubsText>V</CardSubsText>
            <CardSubsText>E</CardSubsText>
            <CardSubsText>D</CardSubsText>
            <CardSubsText>S</CardSubsText>
            <CardSubsText>GF</CardSubsText>
            <CardSubsText>GS</CardSubsText>
            <CardSubsText style={{ width: 32 }}>%</CardSubsText>
          </CardSubs>
        </CardTitleStanding>
        {loading ? (
          <LoadingStyle>
            <ActivityIndicator size="large" color={colors.greenPrimary} />
          </LoadingStyle>
        ) : (
          itemsStanding.map((item) => (
            <ItemStandingComplete key={item.position} item={item} />
          ))
        )}
      </CardStanding>
    ) : (
      <CardStanding>
        <CardTitleMatch>
          <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
            <Icon name="chevron-left" size={30} color={colors.greenSecundary} />
          </TouchableOpacity>
          <CardTitleMatchText>{numberRodada}° Rodada</CardTitleMatchText>
          <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
            <Icon
              name="chevron-right"
              size={30}
              color={colors.greenSecundary}
            />
          </TouchableOpacity>
        </CardTitleMatch>
        {matchs.map((match) => (
          <ItemMatch key={match.id} match={match} />
        ))}
      </CardStanding>
    );
  }

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return (
    <ContainerSafe>
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <DoubleButtom
          nameOption1="Jogos"
          nameOption2="Tabela"
          option={viewOptionStandingMatch}
          setOption={setViewOptionStandingMatch}
        />
        {content()}
      </ScrollStyle>
    </ContainerSafe>
  );
}
