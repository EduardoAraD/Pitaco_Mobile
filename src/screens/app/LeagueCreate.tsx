import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import ContinuarComponent from '../../components/buttons/ContinuarComponent'
import InputComponent from '../../components/InputComponent'

import { League } from '../../models/League'

const simboloData = [
    require('../../assets/images/trophy1.png'),
    require('../../assets/images/trophy2.png'),
    require('../../assets/images/trophy3.png'),
    require('../../assets/images/trophy4.png'),
    require('../../assets/images/trophy5.png'),
    require('../../assets/images/trophy6.png')
]

export default function LeagueCreate() {
    const { user, theme } = useAuth()
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [escudo, setEscudo] = useState(-1)

    function handleContinuar(){
        if( name != '' && description != '' && escudo != -1 ){
            const league = {
                name,
                description,
                logo: simboloData[escudo],
                dono: user,
                points: [{
                    point: 0,
                    exactScore: 0,
                    user
                }]
            } as League
            navigation.navigate('LeagueCreatePreScreen', { league })
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <ScrollView style={styles.scroll}>
                <View style={{ height: 20 }} />
                <InputComponent label='Nome' placeholder='Nome'
                    value={name} onChange={setName} />
                <View style={styles.inputTextView}>
                    <View style={styles.labelView}>
                        <Text style={{fontWeight: '600',color: theme.textGray3}}>Descrição</Text>
                        <Text style={[styles.labelNota,{color: theme.textGray3}]}>{50 - description.length}/50 caracteres</Text>
                    </View>
                    <TextInput style={[styles.input,{backgroundColor: theme.whitePrimary,
                        color: theme.textGray3, borderColor: theme.textGray3}]} value={description}
                        multiline={true} maxLength={50} textAlignVertical='top'
                        onChangeText={text => setDescription(text)} />
                </View>
                <View style={styles.inputTextView}>
                    <Text style={{fontWeight: '600', color: theme.textGray3}}>Escoha um Símbolo para Liga</Text>
                    <ScrollView horizontal={true} >
                        {simboloData.map((simbolo, index) => {
                            const escolhidoColor = {backgroundColor: escudo === index ?
                                theme.yellowPrimary : theme.backgroundWhite }
                            
                            return <TouchableOpacity style={[{borderColor: theme.textGray3,borderWidth: 1}, escolhidoColor]}
                                    key={index} onPress={ () => setEscudo(index)}>
                                    <Image source={simbolo} resizeMode='contain' style={styles.img} />
                                </TouchableOpacity>
                        })}
                    </ScrollView>
                </View>
                <View style={{ height: 50 }} />
                <ContinuarComponent onPress={handleContinuar} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
    },
    inputTextView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 5
    },
    labelView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 3
    },
    labelNota: {
        fontSize: 10,
        fontWeight: '600'
    },
    input: {
        width: '100%',
        borderRadius: 20,
        height: 100,
        borderWidth: 1,
        fontSize: 20
    },
    img: {
        height: 100,
        width: 100,
    }
})