import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Match } from '../models/Match'

import colors from '../assets/colors'

interface Props {
    index: number,
    golsHome: string,
    setGolsHome: Function,
    golsAway: string,
    setGolsAway: Function
    match: Match
}

export default function InputMatch({ index, golsHome, setGolsHome, golsAway, setGolsAway, match}: Props) {
    const [visible, setVisible] = useState(false)

    function visibleView(visible: boolean) {
        if(visible) {
            return (
            <View style={styles.cardVisible}>
                <Text style={[styles.cardVisibleName, { textAlign: 'right'}]}>{match.clubeHome.name}</Text>
                <Text style={styles.cardVisiblePlacar}>{ match.status === 'finish' ? 
                    `${match.golsHome} - ${match.golsAway}` : ' - '}</Text>
                <Text style={[styles.cardVisibleName]}>{match.clubeAway.name}</Text>
                <View style={{ width: 25}} />
            </View>
        )}
    }
    
    return (
        <View style={styles.card}>
            <View style={styles.cardContainer}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.textCardStadium}>{`${match.stadium} - ${match.date} - ${match.hour}`}</Text>
                    <View style={styles.cardInput}>
                        <View style={[styles.cardClube, { justifyContent: 'flex-end'}]}>
                            <Text style={styles.cardClubeText}>{match.clubeHome.shortName}</Text>
                            <Image style={styles.cardClubeImg} resizeMode='contain'
                                source={{ uri: match.clubeHome.logo }} />
                        </View>
                        <TextInput style={ match.status !== 'finish' ?
                            [styles.input,{ borderBottomColor: golsHome.length > 0 ? colors.greenSecundary: colors.textGray3 }] : 
                            styles.inputDisable }  editable={match.status !== 'finish' ? true : false }
                            value={golsHome} keyboardType='numeric'
                            onChangeText={text => setGolsHome(text, index)} />
                        <Text style={styles.textCardPlacar}>-</Text>
                        <TextInput style={ match.status !== 'finish' ?
                            [styles.input,{ borderBottomColor: golsAway.length > 0 ? colors.greenSecundary: colors.textGray3 }] : 
                            styles.inputDisable }  editable={match.status !== 'finish' ? true : false }
                            value={golsAway} keyboardType='numeric'
                            onChangeText={(text) => setGolsAway(text, index)} />
                        <View style={[styles.cardClube, { justifyContent: 'flex-start'}]}>
                            <Image style={styles.cardClubeImg} resizeMode='contain'
                                source={{ uri: match.clubeAway.logo }} />
                            <Text style={styles.cardClubeText}>{match.clubeAway.shortName}</Text>
                        </View>       
                    </View>
                </View>
                <View style={styles.cardAction}>
                    <View style={styles.cardPoints}>
                        <Text style={styles.cardPointsText}>0</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonShow}
                        onPress={() => setVisible(!visible)} >
                        <Icon name={ visible ? 'chevron-up' : 'chevron-down'} color={colors.textGray1} size={18} />
                    </TouchableOpacity>
                </View>
            </View>
            { visibleView(visible) }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        paddingVertical: 2,

        borderColor: colors.textGray4,
        borderTopWidth: 1,
    },
    cardContainer: {
        flexDirection: 'row'
    },
    cardInput: {
        flexDirection: 'row',
    },
    cardClube: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardClubeText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.textGray2
    },
    cardClubeImg: {
        height: 30,
        width: 30,
        marginHorizontal: 5
    },
    input: {
        width: 30,
        borderBottomWidth: 3,
        padding: 0,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.greenSecundary
    },
    inputDisable: {
        width: 30,
        backgroundColor: colors.textGray5,
        padding: 0,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.textGray3
    },
    textCardStadium: {
        fontSize: 8,
        fontWeight: '600',
        color: colors.textGray2
    },
    textCardPlacar: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.greenSecundary
    },
    cardAction: {
        marginHorizontal: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardPoints: {
        backgroundColor: colors.whitePrimary,
        height: 15,
        minWidth: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: colors.textGray4,
        justifyContent: 'center',
        alignItems: 'center',
        
        elevation: 2,
    },
    cardPointsText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.textGray4
    },
    buttonShow: {
        height: 20,
        width: 20,
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center'
    },
    cardVisible: {
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 2,
        borderTopWidth: 1,
        borderTopColor: colors.greenSecundary
    },
    cardVisibleName: {
        flex: 1,
        fontSize: 10,
        color: colors.textGray2
    },
    cardVisiblePlacar: {
        fontSize: 11,
        fontWeight: 'bold',
        color: colors.textGray1,
        marginHorizontal: 3
    }
})