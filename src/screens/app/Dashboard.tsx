import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from 'react-native-snackbar'

import { useAuth } from '../../contexts/auth'

import CardTitle from '../../components/CardTitle'
import CardTitlePage from '../../components/CardTitlePage'
import ItemStandingComponent from '../../components/ItemStanding'
import ItemMatch from '../../components/ItemMatch'

import { ItemStanding } from '../../models/ItemStanding'
import { Rodada } from '../../models/Rodada'

import * as servicesChampionship from '../../services/championship'

export default function Dashboard() {
    const { theme, user, championship, currentRodadaChampionship } = useAuth()
    const [standing, setStanding] = useState<ItemStanding[]>([])
    const [rodada, setRodada] = useState<Rodada>({} as Rodada)

    useEffect(()=> {
        loadingData()
    }, [])

    async function loadingData(){
        const standingResponse = await servicesChampionship.getStandingChampionship(championship)
        if(standingResponse.error === ''){
            setStanding( standingResponse.standing.filter((item, index) => index < 6 ))
        } else {
            Snackbar.show({ text: standingResponse.error, duration: Snackbar.LENGTH_LONG,
                backgroundColor: theme.textRed, textColor: theme.textWhite
            });
        }
        const matchResponse = await servicesChampionship.getCurrentRodada(championship)
        if(matchResponse.error === ''){
            setRodada( matchResponse.rodada )
            currentRodadaChampionship(matchResponse.rodada.number)
        } else {
            Snackbar.show({ text: matchResponse.error, duration: Snackbar.LENGTH_LONG,
                backgroundColor: theme.textRed, textColor: theme.textWhite
            });
        }
    }
    
    return (
        <View style={[styles.container,{backgroundColor: theme.backgroundWhite}]}>
            <CardTitlePage title={ rodada.name? `${rodada.name || ''}° Rodada - Fecha as ${rodada.matchs[0].date || ''}` : ''} />
            <ScrollView style={styles.scroll}>
                <View style={[styles.card,{backgroundColor: theme.whitePrimary}]}>
                    <View style={[styles.cardPerfil,{borderColor: theme.textGray4}]}>
                        <View style={styles.cardUser}>
                            <Image style={styles.cardImg} resizeMode='contain'
                                source={{ uri: user?.avatar }} />
                            <Text style={[styles.cardTextName,{color: theme.textGray1}]}>{user?.name}</Text>
                        </View>
                        <View style={[styles.cardInfo,{borderColor: theme.textGray4}]}>
                            <Text style={[styles.cardTextName,{color: theme.textGray2}]}>Parcial</Text>
                            <View style={styles.cardInfoContent}>
                                <Text style={[styles.cardInfoTextDestaque,{color: theme.greenPrimary}]}>{user?.points[0].points}</Text>
                                <Text style={[styles.cardInfoText,{color: theme.textGray3}]}>pontos</Text>
                            </View>
                            <View style={styles.cardInfoContent}>
                                <Text style={[styles.cardInfoTextSemi,{color: theme.textGray2}]}>{user?.points[0].exactScore}</Text>
                                <Text style={[styles.cardInfoText,{color: theme.textGray3}]}>cravados</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardAction}>
                        <Text style={{fontWeight: '600',color: theme.greenPrimary}}>Faça seus Pitacos para os próximos jogos</Text>
                        <Link to='/Pitaco' >
                            <TouchableOpacity style={[styles.cardActionButton,{backgroundColor: theme.greenSecundary}]} >
                                <Icon name='arrow-right' size={20} color={theme.whitePrimary} />
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                <CardTitle title='Classificação'>
                    { standing.map((item, index) => (
                        <ItemStandingComponent key={index} position={item.position} clube={item.clube}
                            points={item.points} wins={item.wins} golsScore={item.golsScore} matchs={item.matchs}
                            golsDiff={item.golsDiff} positionVariation={item.positionVariation} />
                    ))}
                    <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='dots-vertical' color={theme.textGray3} />
                    </View>
                </CardTitle>
                <CardTitle title='Jogos de Hoje'>
                    { rodada.matchs?.map( (match, index) => 
                        <ItemMatch key={index} match={match} />
                    )}
                </CardTitle>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        paddingHorizontal: 20
    },
    card: {
        height: 200,
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 20,
        elevation: 2
    },
    cardPerfil: {
        height: 160,
        borderBottomWidth: 2,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardUser: {
        flex: 1,
        alignItems: 'center'
    },
    cardImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    cardTextName: {
        marginTop: 7,
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardInfo: {
        width: 140,
        height: 140,
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardInfoContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end'
    },
    cardInfoText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 4
    },
    cardInfoTextSemi: {
        fontWeight: 'bold',
        fontSize: 20
    },
    cardInfoTextDestaque: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    cardAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardActionTextUndone: {
        fontWeight: '600',
        //color: theme.textRed
    },
    cardActionButton: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
})
