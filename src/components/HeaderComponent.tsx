import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BorderlessButton } from 'react-native-gesture-handler'

import colors from '../assets/colors'

interface HeaderProps {
    title: string,
    back?:boolean,
    border?: boolean
}

export default function HeaderComponent ({title, back = false, border = false} : HeaderProps) {
    const navigation = useNavigation()
    
    return (
        <View style={[styles.header, border ? {} : { elevation: 3 }]}>
            {back ? <BorderlessButton onPress={navigation.goBack}>
                    <Icon name="arrow-left" size={30} color={colors.whitePrimary} />
                </BorderlessButton> :
                <BorderlessButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name='menu' size={30} color={colors.whitePrimary} />
                </BorderlessButton>
            }
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 12,
        backgroundColor: colors.greenPrimary,

        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 20,
        fontWeight: 'bold',
        color: colors.whitePrimary,
        fontSize: 20
    }
})