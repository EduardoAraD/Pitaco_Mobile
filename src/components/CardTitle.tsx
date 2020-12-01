import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../assets/colors'

interface Props {
    title: string,
    children?: React.ReactNode
  }

export default function CardTitle ({ title, children }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardTitle}>
                <Text style={styles.cardText}>{title}</Text>
                <Link to='/League' >
                    <TouchableOpacity style={styles.cardButton} >
                        <Text style={styles.cardButtonText}>Ver Mais</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.whitePrimary,
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

        borderBottomWidth: 1,
        borderColor: colors.textGray4
    },
    cardText: {
        fontSize: 17,
        color: colors.textGray2,
        fontWeight: 'bold'
    },
    cardButton: {
        height: 30,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.greenSecundary,
        borderRadius: 15
    },
    cardButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.whitePrimary
    }
})