import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import ButtomConfirm from '../../components/buttons/BottonConfirmComponent'
import DoubleConfirm from '../../components/buttons/DoubleButton'
import CardTitlePage from '../../components/CardTitlePage'
import InputMatch from '../../components/InputMatch'

import { Match } from '../../models/Match'

interface ValuesMatch {
    golsHomePitaco: string,
    golsAwayPitaco: string,
    match: Match
}

export default function Pitaco() {
    const { theme } = useAuth()
    const [viewRodada, setViewRodada] = useState(true)
    const [numberRodada, setNumberRodada] = useState(1)
    const [arrayMatchs, setArrayMatchs] = useState<ValuesMatch[]>([])

    function teste() {
        const data = { golsHomePitaco: '', golsAwayPitaco: '',
        match: {
            idMatch: 102,
            clubeHome: { name: 'Ferroviário AC', shortName: 'FER',
                logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'},
             clubeAway: { name: 'Ceará SC', shortName: 'CEA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'},
            date: '27/02/2020',
            hour: '16:00',
            golsHome: 0,
            golsAway: 1,
            stadium: 'Arena Castelão',
            status: 'init'
            } as Match
        } as ValuesMatch

        const newArray: ValuesMatch[] = []
        newArray.push(data)
        newArray.push(JSON.parse(JSON.stringify(data)) as ValuesMatch)
        newArray.push(JSON.parse(JSON.stringify(data)) as ValuesMatch)

        setArrayMatchs( newArray )
    }

    useEffect(() => {
        teste()
    }, [])

    function handleUpdateNumberRodada(val: number){
        const newNumber = numberRodada + val
        if(newNumber >= 1 && newNumber <= 38) {
            setNumberRodada(newNumber)
        }
    }

    function titleCard(){
        return viewRodada ? (
            <View style={[styles.cardTitle,{borderColor: theme.textGray4}]}>
                <TouchableOpacity onPress={() => handleUpdateNumberRodada(-1)}>
                    <Icon name='chevron-left' size={30} color={theme.greenSecundary} />
                </TouchableOpacity>
                <Text style={[styles.cardTitleText,{color: theme.greenPrimary}]}>{numberRodada}° Rodada</Text>
                <TouchableOpacity onPress={() => handleUpdateNumberRodada(1)}>
                    <Icon name='chevron-right' size={30} color={theme.greenSecundary} />
                </TouchableOpacity>
            </View> 
        ) : (
            <View style={[styles.cardTitle, { justifyContent: 'center' }]}>
                <Text style={[styles.cardTitleText,{color: theme.greenPrimary}]}>Jogos de Hoje (27/03/2020)</Text>
            </View>
        );
    }

    function handleGolsHomeArray(text: string, index: number){
        if(text.length <= 2) {
            const arrayUpdate = arrayMatchs.map(match => match)
            if(text.length === 0){
                arrayUpdate[index].golsHomePitaco = ''
            } else {
                arrayUpdate[index].golsHomePitaco = text.replace(/[^0-9]/g, '')
            }
            setArrayMatchs( arrayUpdate )
        }
    }

    function handleGolsAwayArray(text: string, index: number) {
        if(text.length <= 2) {
            const arrayUpdate = arrayMatchs.map(match => match)
            if(text.length === 0){
                arrayUpdate[index].golsAwayPitaco = ''
            } else {
                arrayUpdate[index].golsAwayPitaco = text.replace(/[^0-9]/g, '')
            }
            setArrayMatchs( arrayUpdate )
        }
    }

    function handleConfirm() {
        console.log(arrayMatchs)
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <CardTitlePage title='Pitacos encerram 2h antes do jogo' />
            <ScrollView style={styles.scroll}>
                <DoubleConfirm nameOption1='Hoje' nameOption2='Rodada'
                    option={viewRodada} setOption={setViewRodada} />
                <View style={[styles.card,{backgroundColor: theme.whitePrimary}]}>
                    { titleCard() }
                    { arrayMatchs.map( (match, index) => (
                        <InputMatch key={index} index={index}
                            golsHome={match.golsHomePitaco}
                            setGolsHome={handleGolsHomeArray}
                            golsAway={match.golsAwayPitaco}
                            setGolsAway={handleGolsAwayArray}
                            match={match.match}
                        />
                    ))}
                </View>
                <View style={{ margin: 5}} />
                <ButtomConfirm onPress={handleConfirm} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
    },
    scrollButtonContainer: {
        marginTop: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scrollButtonLeft: {
        height: 50,
        width: 140,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollButtonRight: {
        height: 50,
        width: 140,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollButtonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 20,
        elevation: 3,
    },
    cardTitle: {
        height: 40,
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    cardTitleText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
