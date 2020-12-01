import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CardTitle from '../../components/CardTitle'
import ItemStanding from '../../components/ItemStanding'

import colors from '../../assets/colors'
import ItemMatch from '../../components/ItemMatch'

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <View style={styles.titleCard}>
                <Text style={styles.textTitle}>25° Rodada - Fecha as 02/12/2020</Text>
            </View>
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
                </CardTitle>
                <CardTitle title='Jogos'>
                    <ItemMatch />
                    <ItemMatch />
                    <ItemMatch />
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
    titleCard: {
        backgroundColor: colors.whitePrimary,
        height: 50,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textGray2
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
