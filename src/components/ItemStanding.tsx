import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../assets/colors'

interface Props {
    position: number,
    name: string,
    variacao: number,
    points: number,
    wins: number,
    saldo: number,
    golsDone: number,
    matchs: number
}

export default function ItemStanding(props: Props) {

    function textVariacao(num: number) {
        if (num > 0)
            return (
                <View style={styles.areaVariacao}>
                    <Icon name='chevron-up-box' size={13} color={colors.greenSecundary} />
                    <Text style={styles.textValor}>{num}</Text>
                </View>)
        else if (num === 0)
            return <View style={styles.areaVariacao}>
                <Icon name='square' size={12} color={colors.bluePrimary} />
                <Text style={styles.textValor}>{num}</Text>
            </View>
        else
            return <View style={styles.areaVariacao}>
                <Icon name='chevron-down-box' size={13} color={colors.textRed} />
                <Text style={styles.textValor}>{num * -1}</Text>
            </View>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPos}>{props.position}.</Text>
            <Image style={styles.img} resizeMode='contain'
                source={require('../assets/images/logoPitaco.png')} />
            <View style={styles.areaValor}>
                <Text style={styles.textNome}>{props.name || 'not clube'}</Text>
                <View style={styles.areaText}>
                    {textVariacao(props.variacao)}
                    <Text style={styles.textValor}>{props.points || 0}</Text>
                    <Text style={styles.textValor}>{props.matchs || 0}</Text>
                    <Text style={styles.textValor}>{props.wins || 0}</Text>
                    <Text style={styles.textValor}>{(props.saldo) || 0}</Text>
                    <Text style={styles.textValor}>{props.golsDone || 0}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.whitePrimary,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',

        borderBottomWidth: 1,
        borderBottomColor: colors.textGray4,

        borderLeftWidth: 3,
        borderLeftColor: colors.bluePrimary
    },
    textPos: {
        color: colors.textGray2,
        width: 25,
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold'
    },
    img: {
        margin: 3,
        height: 34,
        width: 34,
        alignSelf: 'center',
    },
    areaValor: {
        display: 'flex',
        flexDirection: 'column',
        height: 40,
        width: '100%',
    },
    areaVariacao: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%'
    },
    textNome: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textGray2,
    },
    areaText: {
        flex: 1,
        flexDirection: 'row',
    },
    textValor: {
        width: 20,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: colors.textGray2,
    }
})
