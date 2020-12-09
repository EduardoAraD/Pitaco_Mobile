import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useAuth } from '../../contexts/auth'

import CardTitle from '../../components/CardTitle'
import CardTitlePage from '../../components/CardTitlePage'
import ItemStanding from '../../components/ItemStanding'
import ItemMatch from '../../components/ItemMatch'

import { Match } from '../../models/Match'

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

export default function Dashboard() {
    const { theme } = useAuth()
    
    return (
        <View style={[styles.container,{backgroundColor: theme.backgroundWhite}]}>
            <CardTitlePage title='25° Rodada - Fecha as 02/12/2020' />
            <ScrollView style={styles.scroll}>
                <View style={[styles.card,{backgroundColor: theme.whitePrimary}]}>
                    <View style={[styles.cardPerfil,{borderColor: theme.textGray4}]}>
                        <View style={styles.cardUser}>
                            <Image style={styles.cardImg} resizeMode='contain'
                                source={require('../../assets/images/logoPitaco.png')} />
                            <Text style={[styles.cardTextName,{color: theme.textGray1}]}>SourhT</Text>
                        </View>
                        <View style={[styles.cardInfo,{borderColor: theme.textGray4}]}>
                            <Text style={[styles.cardTextName,{color: theme.textGray2}]}>Parcial</Text>
                            <View style={styles.cardInfoContent}>
                                <Text style={[styles.cardInfoTextDestaque,{color: theme.greenPrimary}]}>28</Text>
                                <Text style={[styles.cardInfoText,{color: theme.textGray3}]}>pontos</Text>
                            </View>
                            <View style={styles.cardInfoContent}>
                                <Text style={[styles.cardInfoTextSemi,{color: theme.textGray2}]}>2</Text>
                                <Text style={[styles.cardInfoText,{color: theme.textGray3}]}>cravados</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardAction}>
                        <Text style={{fontWeight: '600',color: theme.greenPrimary}}>Faça seus Pitacos da 25° Rodada</Text>
                        <Link to='/Pitaco' >
                            <TouchableOpacity style={[styles.cardActionButton,{backgroundColor: theme.greenSecundary}]} >
                                <Icon name='arrow-right' size={20} color={theme.whitePrimary} />
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                <CardTitle title='Classificação'>
                    <ItemStanding position={1} name='Flamengo' points={39} wins={11}
                        saldo={14} golsDone={56} matchs={21} variacao={0} />
                    <ItemStanding position={2} name='Botaagua FC' points={38} wins={11}
                        saldo={10} golsDone={40} matchs={21} variacao={1} />
                    <ItemStanding position={3} name='Ferroviário AC' points={37} wins={11}
                        saldo={12} golsDone={45} matchs={21} variacao={-1} />
                    <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='dots-vertical' color={theme.textGray3} />
                    </View>
                </CardTitle>
                <CardTitle title='Jogos de Hoje'>
                    { data2.map( (match, index) => 
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
