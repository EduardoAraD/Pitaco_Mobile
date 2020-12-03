import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../assets/colors'

import { ItemStanding } from '../models/ItemStanding'

interface Props {
    item: ItemStanding
}

export default function ItemStandingComplete({ item }: Props) {

    function textVariacao(num: number) {
        if (num > 0)
            return (
                <View style={styles.areaVariacao}>
                    <Icon name='chevron-up-box' size={13} color={colors.greenSecundary} />
                    <Text style={[styles.textValor, { width: 15, textAlign: 'center'}]}>{num}</Text>
                </View>)
        else if (num === 0)
            return <View style={styles.areaVariacao}>
                <Icon name='square' size={12} color={colors.bluePrimary} />
                <Text style={[styles.textValor, { width: 15, textAlign: 'center'}]}>{num}</Text>
            </View>
        else
            return <View style={styles.areaVariacao}>
                <Icon name='chevron-down-box' size={13} color={colors.textRed} />
                <Text style={[styles.textValor, { width: 15, textAlign: 'center'}]}>{num * -1}</Text>
            </View>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textPos}>{item.position}.</Text>
            <Image style={styles.img} resizeMode='contain'
                source={{ uri: item.clube.logo }} />
            <View style={styles.areaValor}>
                <Text style={styles.textNome}>{ item.clube.name }</Text>
                <View style={styles.areaText}>
                    {textVariacao( item.positionVariation )}
                    <Text style={styles.textValor}>{ item.points }</Text>
                    <Text style={styles.textValor}>{ item.matchs }</Text>
                    <Text style={styles.textValor}>{ item.wins }</Text>
                    <Text style={styles.textValor}>{ item.draws }</Text>
                    <Text style={styles.textValor}>{ item.defeats }</Text>
                    <Text style={styles.textValor}>{ item.golsDiff }</Text>
                    <Text style={styles.textValor}>{ item.golsDone }</Text>
                    <Text style={styles.textValor}>{ item.golsConceded }</Text>
                    <Text style={[styles.textValor, { width: 30 }]}>{ item.utilization.toFixed(1) }</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.whitePrimary,
        paddingHorizontal: 4,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',

        borderTopWidth: 1,
        borderTopColor: colors.textGray4,

        borderLeftWidth: 3,
        borderLeftColor: colors.bluePrimary
    },
    textPos: {
        color: colors.textGray2,
        width: 23,
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
        flex: 1
    },
    areaVariacao: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
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
        fontSize: 11,
        fontWeight: '600',
        color: colors.textGray2,
    }
})
