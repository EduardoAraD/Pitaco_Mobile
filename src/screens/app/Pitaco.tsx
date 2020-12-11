import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Snackbar from 'react-native-snackbar'

import { useAuth } from '../../contexts/auth'

import ButtomConfirm from '../../components/buttons/BottonConfirmComponent'
import DoubleConfirm from '../../components/buttons/DoubleButton'
import CardTitlePage from '../../components/CardTitlePage'
import InputMatch from '../../components/InputMatch'

import { Match } from '../../models/Match'
import { Pitaco } from '../../models/Pitaco'

import * as servicesPitaco from '../../services/pitaco'

interface PitacoMatch {
    match: Match,
    pitaco: Pitaco
}

interface RodadaPitaco {
    rodada: number,
    matchs: PitacoMatch[]
}

const allRodadas: RodadaPitaco[] = []

export default function PitacoScreen() {
    const { theme, user, championshipId, currentRodada } = useAuth()
    const [viewRodada, setViewRodada] = useState(true)
    const [numberRodada, setNumberRodada] = useState(currentRodada)
    const [arrayMatchs, setArrayMatchs] = useState<PitacoMatch[]>([])
    const [arrayMatchsToday, setArrayMatchsToday] = useState<PitacoMatch[]>([])

    async function loadingData() {
        const responseToday = await servicesPitaco.getPitacoMatchToday(user?.email || '')
        if(responseToday.data != [] ) {
            setArrayMatchsToday(responseToday.data)
        } else {
            Snackbar.show({ text: responseToday.error, duration: Snackbar.LENGTH_LONG,
                backgroundColor: theme.textRed, textColor: theme.textWhite
            });
        }
        const responseRodada = await servicesPitaco.getPitacoMatchRodada(user?.email || '', championshipId, currentRodada)
        if(responseRodada.data != [] ) {
            setArrayMatchs(responseRodada.data)
            setNumberRodada(currentRodada)
            allRodadas.push({ rodada: currentRodada, matchs: responseRodada.data })
        } else {
            Snackbar.show({ text: responseRodada.error, duration: Snackbar.LENGTH_LONG,
                backgroundColor: theme.textRed, textColor: theme.textWhite
            });
        }
    }

    useEffect(() => {
        loadingData()
    }, [])

    async function handleUpdateNumberRodada(val: number){
        const newNumber = numberRodada + val
        if(newNumber >= 1 && newNumber <= 38) {
            setNumberRodada(newNumber)
            const rodada = allRodadas.find(item => item.rodada === newNumber )
            if (rodada) {
                setArrayMatchs( rodada.matchs )
            } else {
                const responseRodada = await servicesPitaco.getPitacoMatchRodada(user?.email || '',
                    championshipId, newNumber)
                if(responseRodada.data != [] ) {
                    setArrayMatchs(responseRodada.data)
                    allRodadas.push({ rodada: newNumber, matchs: responseRodada.data })
                } else {
                    Snackbar.show({ text: responseRodada.error, duration: Snackbar.LENGTH_LONG,
                        backgroundColor: theme.textRed, textColor: theme.textWhite
                    });
                }
            }
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

    function showMatchs() {
        const matchs = viewRodada ? arrayMatchs : arrayMatchsToday
        return matchs.map((item, index) => (
            <InputMatch key={index} index={index}
                golsHome={item.pitaco.golsHome}
                setGolsHome={handleGolsHomeArray}
                golsAway={item.pitaco.golsAway}
                setGolsAway={handleGolsAwayArray}
                match={item.match} />
        ))
    }

    function handleGolsHomeArray(text: string, index: number){
        if(text.length <= 2) {
            if(viewRodada){
                const arrayUpdate = arrayMatchs.map(match => match)
                if(text.length === 0){
                    arrayUpdate[index].pitaco.golsHome = ''
                } else {
                    arrayUpdate[index].pitaco.golsHome = text.replace(/[^0-9]/g, '')
                }
                setArrayMatchs( arrayUpdate )
            } else {
                const arrayUpdate = arrayMatchsToday[index]
                if(text.length === 0){
                    arrayUpdate.pitaco.golsHome = ''
                } else {
                    arrayUpdate.pitaco.golsHome = text.replace(/[^0-9]/g, '')
                }
                arrayMatchsToday.splice(index, 1, arrayUpdate)
                setArrayMatchs([...arrayMatchsToday])
            }
        }
    }

    function handleGolsAwayArray(text: string, index: number) {
        if(text.length <= 2) {
            if(viewRodada){
                const arrayUpdate = arrayMatchs.map(match => match)
                if(text.length === 0){
                    arrayUpdate[index].pitaco.golsAway = ''
                } else {
                    arrayUpdate[index].pitaco.golsAway = text.replace(/[^0-9]/g, '')
                }
                setArrayMatchs( arrayUpdate )
            } else {
                const arrayUpdate = arrayMatchsToday[index]
                if(text.length === 0){
                    arrayUpdate.pitaco.golsAway = ''
                } else {
                    arrayUpdate.pitaco.golsAway = text.replace(/[^0-9]/g, '')
                }
                arrayMatchsToday.splice(index, 1, arrayUpdate)
                setArrayMatchs([...arrayMatchsToday])
            }
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
                    { showMatchs() }
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
