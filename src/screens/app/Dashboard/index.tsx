import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Link } from '@react-navigation/native';

import { useAuth } from '../../../contexts/auth';

import LoadingPage from '../../../components/LoadingPage';
import CardTitle from '../../../components/CardTitle';
import ItemStandingComponent from '../../../components/ItemStanding';
import ItemMatch from '../../../components/ItemMatch';

import { ItemStanding } from '../../../models/ItemStanding';
import { initRodada, Rodada } from '../../../models/Rodada';

import * as servicesChampionship from '../../../services/championship';
import { getPitacoMatchToday } from '../../../services/pitaco';

import {
  CardImg,
  Card,
  CardAction,
  CardActionButton,
  CardInfo,
  CardInfoContent,
  CardInfoText,
  CardInfoTextDestaque,
  CardInfoTextSemi,
  CardPerfil,
  CardTextName,
  CardUser,
  ContainerSafe,
  ScrollStyle,
  TextSelect,
  IconWhite,
  IconGray3,
  RefreshStyle,
} from './styles';

export default function Dashboard() {
  const { user, championship, currentRodada } = useAuth();
  const [loading, setLoading] = useState(true);
  const [standing, setStanding] = useState<ItemStanding[]>([]);
  const [rodada, setRodada] = useState<Rodada>(initRodada());
  const [textAction, setTextAction] = useState(0);
  const [refresh, setRefresh] = useState(false);

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
      <TextSelect colorVal={textAction}>
        {textOptionAction(textAction)}
      </TextSelect>
    );
  }

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return !loading ? (
    <ContainerSafe>
      <ScrollStyle
        refreshControl={
          <RefreshStyle
            // colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <Card>
          <CardPerfil>
            <CardUser>
              <CardImg resizeMode="contain" source={{ uri: user?.avatar }} />
              <CardTextName colorP numberOfLines={1}>
                {user?.name}
              </CardTextName>
            </CardUser>
            <CardInfo>
              <CardTextName>Parcial</CardTextName>
              <CardInfoContent>
                <CardInfoTextDestaque>
                  {user?.points[0].points}
                </CardInfoTextDestaque>
                <CardInfoText>pontos</CardInfoText>
              </CardInfoContent>
              <CardInfoContent>
                <CardInfoTextSemi>
                  {user?.points[0].exactScore}
                </CardInfoTextSemi>
                <CardInfoText>cravados</CardInfoText>
              </CardInfoContent>
            </CardInfo>
          </CardPerfil>
          <CardAction>
            {textActionUser()}
            <Link to="/Pitaco">
              <CardActionButton>
                <IconWhite name="arrow-right" />
              </CardActionButton>
            </Link>
          </CardAction>
        </Card>
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
            <IconGray3 name="dots-vertical" />
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
      </ScrollStyle>
    </ContainerSafe>
  ) : (
    <LoadingPage />
  );
}
