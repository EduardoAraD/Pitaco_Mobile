import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useAuth } from '../contexts/auth'

interface Props {
    value: string,
    title: string,
    setValue: Function,
    onPress: Function
}

export default function SearchInput({ value, title, setValue, onPress}: Props) {
    const { theme } = useAuth()

    return (
        <React.Fragment>
            <View style={styles.viewSearch}>
                <Text style={[styles.searchText,{color: theme.textGray3}]}>Procurar</Text>
                <View style={styles.searchAction}>
                    <TextInput value={value} style={[styles.searchInput,{backgroundColor: theme.whitePrimary,
                        color: theme.textGray3, borderColor: theme.textGray3}]}
                        onChangeText={ text => setValue(text)} />
                    <View style={{ width: 20 }} />
                    <TouchableOpacity style={[styles.searchButton,{backgroundColor: theme.greenSecundary}]}
                        onPress={() => onPress()}>
                        <Text style={[styles.searchButtonText,{color: theme.textWhite}]}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={[styles.titleText,{color: theme.greenPrimary, borderBottomColor: theme.textGray3}]}>{title}</Text>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    viewSearch: {
        margin: 20
    },
    searchText: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 3
    },
    searchAction: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    searchInput: {
        borderRadius: 10,
        height: 40,
        flex: 1,
        borderWidth: 1,
        fontSize: 18
    },
    searchButton: {
        height: 40,
        width: 90,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    searchButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
    }
})