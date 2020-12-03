import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../../assets/colors'

interface Props {
    nameOption1: string,
    nameOption2: string,
    option: boolean,
    setOption: Function
}

export default function DoubleButtom({ nameOption1, nameOption2, option, setOption }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonLeft,
                {backgroundColor: option ? colors.whitePrimary : colors.greenPrimary }]}
                onPress={() => setOption(false)} >
                <Text style={[styles.buttonText,
                    { color: option? colors.textGray3 : colors.textWhite }]}>{nameOption1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonRight,
                {backgroundColor: option ? colors.greenPrimary : colors.whitePrimary }]}
                onPress={() => setOption(true)} >
                <Text style={[styles.buttonText,
                { color: option? colors.textWhite : colors.textGray3 }]}>{nameOption2}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        height: 50,
        elevation: 2,

        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonLeft: {
        flex: 1,
        width: 140,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRight: {
        flex: 1,
        width: 140,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})