import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useAuth } from '../../contexts/auth'

import DoubleButtom from '../../components/buttons/DoubleButton'
import ItemStandingComplete from '../../components/ItemStandingComplete'
import ItemMatch from '../../components/ItemMatch'

import { ItemStanding } from '../../models/ItemStanding'
import { Match } from '../../models/Match'

export default function Championship() {
    const { theme } = useAuth()
    const [viewOptionStandingMatch, setViewOptionStandingMatch] = useState(true)
    const [itemsStanding, setItemsStanding] = useState<ItemStanding[]>([])
    const [numberRodada, setNumberRodada] = useState(1)
    const [matchs, setMatchs] = useState<Match[]>([])

    function test() {
        const data = [
            {   position: 1, 
                clube: { name: 'Ferroviário AC', shortName: 'FER',
                logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'},
                points: 39, wins: 11, draws: 6, defeats: 2, matchs: 19,
                golsDone: 56, golsConceded: 35, golsDiff: 21,
                positionVariation: 0, utilization: (39/(19*3) * 100)
            } as ItemStanding,
            {   position: 2, 
                clube: { name: 'Ceará SC', shortName: 'CEA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'},
                points: 38, wins: 11, draws: 5, defeats: 3, matchs: 19,
                golsDone: 50, golsConceded: 38, golsDiff: 12,
                positionVariation: 1, utilization: (38/(19*3) * 100)
            } as ItemStanding,
            {   position: 3, 
                clube: { name: 'Fortaleza EC', shortName: 'FOR',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Escudo_do_Fortaleza_EC.png'},
                points: 37, wins: 10, draws: 7, defeats: 2, matchs: 19,
                golsDone: 54, golsConceded: 42, golsDiff: 12,
                positionVariation: -1, utilization: (37/(19*3) * 100)
            } as ItemStanding
        ]
        setItemsStanding(data)
        const data2 = [
            {   idMatch: 102,
                clubeHome: { name: 'Ferroviário AC', shortName: 'FER',
                    logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'},
                clubeAway: { name: 'Ceará SC', shortName: 'CEA',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'},
                date: '27/02/2020', hour: '16:00', golsHome: 0,
                golsAway: 1, stadium: 'Arena Castelão', status: 'init'
            } as Match,
            {   idMatch: 102,
                clubeHome: { name: 'Ferroviário AC', shortName: 'FER',
                    logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'},
                clubeAway: { name: 'Ceará SC', shortName: 'CEA',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'},
                date: '27/02/2020', hour: '16:00', golsHome: 0,
                golsAway: 1, stadium: 'Arena Castelão', status: 'init'
            } as Match,
            {   idMatch: 102,
                clubeHome: { name: 'Ferroviário AC', shortName: 'FER',
                    logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'},
                clubeAway: { name: 'Ceará SC', shortName: 'CEA',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'},
                date: '27/02/2020', hour: '16:00', golsHome: 0,
                golsAway: 1, stadium: 'Arena Castelão', status: 'init'
            } as Match
        ]
        setMatchs(data2)
    }

    useEffect(() => {
        test()
    }, [])

    function handleUpdateNumberRodada(val: number){
        const newNumber = numberRodada + val
        if(newNumber >= 1 && newNumber <= 38) {
            setNumberRodada(newNumber)
        }
    }

    function content(){
        return viewOptionStandingMatch ? (
            <View style={[styles.cardStanding,{backgroundColor: theme.whitePrimary}]}>
                <View style={styles.cardTitleStanding}>
                    <Text style={[styles.cardTitleText,{color: theme.textGray3}]}>Classificação - Brasileiro A 20/21</Text>
                    <View style={[styles.cardSubs,{backgroundColor: theme.greenPrimary}]}>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>P</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>J</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>V</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>E</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>D</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>S</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>GF</Text>
                        <Text style={[styles.cardSubsText,{color: theme.whitePrimary}]}>GS</Text>
                        <Text style={[[styles.cardSubsText,{color: theme.whitePrimary}], { width: 32 }]}>%</Text>
                    </View>
                </View>
                { itemsStanding.map( (item, index) => 
                    <ItemStandingComplete key={index} item={item} />
                )}
            </View>
        ) : (
            <View style={[styles.cardStanding,{backgroundColor: theme.whitePrimary}]}>
                <View style={[styles.cardTitleMatch,{borderColor: theme.textGray4}]}>
                    <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
                        <Icon name='chevron-left' size={30} color={theme.greenSecundary} />
                    </TouchableOpacity>
                    <Text style={[styles.cardTitleMatchText,{color: theme.greenPrimary}]}>{numberRodada}° Rodada</Text>
                    <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
                        <Icon name='chevron-right' size={30} color={theme.greenSecundary} />
                    </TouchableOpacity>
                </View>
                { matchs.map( (match, index) => 
                    <ItemMatch key={index} match={match} />
                )}
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <ScrollView style={styles.scroll}>
                <DoubleButtom nameOption1='Jogos' nameOption2='Tabela'
                    option={viewOptionStandingMatch} setOption={setViewOptionStandingMatch} />
                { content() }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20
    },
    cardStanding: {
        marginTop: 10,
        width: '100%',
        borderRadius: 20,
        elevation: 2
    },
    cardTitleStanding: {
        height: 40
    },
    cardTitleText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        alignContent: 'center',
        margin: 3,
        marginLeft: 10
    },
    cardSubs:{
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
        borderBottomWidth: 1
    },
    cardTitleMatchText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})