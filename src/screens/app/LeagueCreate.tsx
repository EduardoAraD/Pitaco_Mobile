import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'
import ContinuarComponent from '../../components/buttons/ContinuarComponent'
import InputComponent from '../../components/InputComponent'
import { League } from '../../models/League'

import colors from '../../assets/colors'

const simboloData = [
    require('../../assets/images/trophy1.png'),
    require('../../assets/images/trophy2.png'),
    require('../../assets/images/trophy3.png'),
    require('../../assets/images/trophy4.png'),
    require('../../assets/images/trophy5.png'),
    require('../../assets/images/trophy6.png')
]

export default function LeagueCreate() {
    const { user } = useAuth()
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
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={{ height: 20 }} />
                <InputComponent label='Nome' value={name} onChange={setName} />
                <View style={styles.inputTextView}>
                    <View style={styles.labelView}>
                        <Text style={styles.label}>Descrição</Text>
                        <Text style={styles.labelNota}>{50 - description.length}/50 caracteres</Text>
                    </View>
                    <TextInput style={styles.input} value={description}
                        multiline={true} maxLength={50} textAlignVertical='top'
                        onChangeText={text => setDescription(text)} />
                </View>
                <View style={styles.inputTextView}>
                    <Text style={styles.label}>Escoha um Símbolo para Liga</Text>
                    <ScrollView horizontal={true} >
                        {simboloData.map((simbolo, index) => {
                            const escolhidoColor = {backgroundColor: escudo === index ?
                                colors.yellowPrimary : colors.backgroundWhite }
                            
                            return <TouchableOpacity key={index} style={[styles.viewImg, escolhidoColor]}
                                    onPress={ () => setEscudo(index)}>
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
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite
    },
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
    label: {
        fontWeight: '600',
        color: colors.textGray3,
    },
    labelNota: {
        color: colors.textGray3,
        fontSize: 10,
        fontWeight: '600'
    },
    input: {
        width: '100%',
        borderRadius: 20,
        height: 100,

        backgroundColor: colors.whitePrimary,
        color: colors.textGray3,
        borderWidth: 1,
        borderColor: colors.textGray3,

        fontSize: 20
    },
    viewImg: {
        borderColor: colors.textGray3,
        borderWidth: 1
    },
    img: {
        height: 100,
        width: 100,
    }
})