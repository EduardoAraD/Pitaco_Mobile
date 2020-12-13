import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useAuth } from '../contexts/auth'

import { Match } from '../models/Match'

interface Props {
    index: number,
    update: boolean,
    golsHome: string,
    setGolsHome: Function,
    golsAway: string,
    setGolsAway: Function,
    notFinishPitaco: boolean,
    match: Match
}

export default function InputMatch({ index, update, golsHome, setGolsHome, golsAway, setGolsAway, notFinishPitaco, match}: Props) {
    const { theme } = useAuth()
    const [visible, setVisible] = useState(false)

    function visibleView(visible: boolean) {
        if(visible) {
            return (
            <View style={[styles.cardVisible,{borderTopColor: theme.greenSecundary}]}>
                <Text style={[styles.cardVisibleName, { textAlign: 'right', color: theme.textGray2}]}>{match.clubeHome.name}</Text>
                <Text style={[styles.cardVisiblePlacar,{color: theme.textGray1}]}>{ match.status === 'finished' ? 
                    `${match.golsHome} - ${match.golsAway}` : ' - '}</Text>
                <Text style={[styles.cardVisibleName,{color: theme.textGray2}]}>{match.clubeAway.name}</Text>
                <View style={{ width: 25}} />
            </View>
        )}
    }
    
    return (
        <View style={[styles.card,{borderColor: theme.textGray4}]}>
            <View style={styles.cardContainer}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.textCardStadium,{color: theme.textGray2}]}>{`${match.stadium} - ${match.date} - ${match.hour}`}</Text>
                    <View style={styles.cardInput}>
                        <View style={[styles.cardClube, { justifyContent: 'flex-end'}]}>
                            <Text style={[styles.cardClubeText,{color: theme.textGray2}]}>{match.clubeHome.shortCode}</Text>
                            <Image style={styles.cardClubeImg} resizeMode='contain'
                                source={{ uri: match.clubeHome.logo }} />
                        </View>
                        <TextInput style={ notFinishPitaco ?
                            [styles.input,{ borderBottomColor: update? theme.blueSecundary : (golsHome.length > 0 ? theme.greenSecundary: theme.textGray3),
                                color: update? theme.blueSecundary : theme.greenSecundary }] : 
                            [styles.inputDisable,{backgroundColor: theme.textGray5, color: theme.textGray3}] } 
                            editable={notFinishPitaco}
                            value={golsHome} keyboardType='numeric'
                            onChangeText={text => setGolsHome(text, index)} />
                        <Text style={[styles.textCardPlacar,{color: update? theme.blueSecundary : theme.greenSecundary}]}>-</Text>
                        <TextInput style={ notFinishPitaco ?
                            [styles.input,{ borderBottomColor: update? theme.blueSecundary : (golsAway.length > 0 ? theme.greenSecundary: theme.textGray3),
                                color: update? theme.blueSecundary : theme.greenSecundary }] : 
                            [styles.inputDisable,{backgroundColor: theme.textGray5, color: theme.textGray3}] } 
                            editable={notFinishPitaco}
                            value={golsAway} keyboardType='numeric'
                            onChangeText={(text) => setGolsAway(text, index)} />
                        <View style={[styles.cardClube, { justifyContent: 'flex-start'}]}>
                            <Image style={styles.cardClubeImg} resizeMode='contain'
                                source={{ uri: match.clubeAway.logo }} />
                            <Text style={[styles.cardClubeText,{color: theme.textGray2}]}>{match.clubeAway.shortCode}</Text>
                        </View>       
                    </View>
                </View>
                <View style={styles.cardAction}>
                    <View style={[styles.cardPoints,{backgroundColor: theme.whitePrimary,borderColor: theme.textGray4}]}>
                        <Text style={[styles.cardPointsText,{color: theme.textGray4}]}>0</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonShow}
                        onPress={() => setVisible(!visible)} >
                        <Icon name={ visible ? 'chevron-up' : 'chevron-down'} color={theme.textGray1} size={18} />
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
        borderTopWidth: 1,
    },
    cardContainer: {
        flexDirection: 'row'
    },
    cardInput: {
        flexDirection: 'row',
        width: '100%'
    },
    cardClube: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardClubeText: {
        fontSize: 17,
        fontWeight: 'bold',
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
        fontWeight: 'bold'
    },
    inputDisable: {
        width: 30,
        padding: 0,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textCardStadium: {
        fontSize: 8,
        fontWeight: '600'
    },
    textCardPlacar: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    cardAction: {
        marginHorizontal: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardPoints: {
        height: 15,
        minWidth: 15,
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    cardPointsText: {
        fontSize: 11,
        fontWeight: '600'
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
        borderTopWidth: 1
    },
    cardVisibleName: {
        flex: 1,
        fontSize: 10
    },
    cardVisiblePlacar: {
        fontSize: 11,
        fontWeight: 'bold',
        marginHorizontal: 3
    }
})