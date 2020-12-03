import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CardTitle from '../../components/CardTitle'
import ItemStanding from '../../components/ItemStanding'
import ItemMatch from '../../components/ItemMatch'
import CardTitlePage from '../../components/CardTitlePage'

import { Match } from '../../models/Match'

import colors from '../../assets/colors'

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
    return (
        <View style={styles.container}>
            <CardTitlePage title='25° Rodada - Fecha as 02/12/2020' />
            <ScrollView style={styles.scroll}>
                <View style={styles.card}>
                    <View style={styles.cardPerfil}>
                        <View style={styles.cardUser}>
                            <Image style={styles.cardImg} resizeMode='contain'
                                source={require('../../assets/images/logoPitaco.png')} />
                            <Text style={styles.cardTextName}>SourhT</Text>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTextName}>Parcial</Text>
                            <View style={styles.cardInfoContent}>
                                <Text style={styles.cardInfoTextDestaque}>28</Text>
                                <Text style={styles.cardInfoText}>pontos</Text>
                            </View>
                            <View style={styles.cardInfoContent}>
                                <Text style={styles.cardInfoTextSemi}>2</Text>
                                <Text style={styles.cardInfoText}>cravados</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardAction}>
                        <Text style={styles.cardActionTextDone}>Faça seus Pitacos da 25° Rodada</Text>
                        <Link to='/Pitaco' >
                            <TouchableOpacity style={styles.cardActionButton} >
                                <Icon name='arrow-right' size={20} color={colors.whitePrimary} />
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
                        <Icon name='dots-vertical' color={colors.textGray3} />
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
        backgroundColor: colors.backgroundWhite
    },
    scroll: {
        paddingHorizontal: 20
    },
    card: {
        height: 200,
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.whitePrimary,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.textGray4
    },
    cardPerfil: {
        height: 160,
        borderColor: colors.textGray4,
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
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.greenPrimary
    },
    cardTextName: {
        marginTop: 7,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textGray1
    },
    cardInfo: {
        width: 140,
        height: 140,
        padding: 10,
        borderColor: colors.textGray4,
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
        color: colors.textGray4,
        marginLeft: 4
    },
    cardInfoTextSemi: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.textGray2
    },
    cardInfoTextDestaque: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.greenPrimary,
    },
    cardAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardActionTextDone: {
        fontWeight: '600',
        color: colors.greenPrimary
    },
    cardActionTextUndone: {
        fontWeight: '600',
        color: colors.textRed
    },
    cardActionButton: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 15,
        backgroundColor: colors.greenSecundary
    }
})
