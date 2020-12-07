import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../assets/colors'

interface Props {
    value: string,
    title: string,
    setValue: Function,
    onPress: Function
}

export default function SearchInput({ value, title, setValue, onPress}: Props) {
    return (
        <React.Fragment>
            <View style={styles.viewSearch}>
                <Text style={styles.searchText}>Procurar</Text>
                <View style={styles.searchAction}>
                    <TextInput value={value} style={styles.searchInput}
                        onChangeText={ text => setValue(text)} />
                    <View style={{ width: 20 }} />
                    <TouchableOpacity style={styles.searchButton}
                        onPress={() => onPress()}>
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.titleText}>{title}</Text>
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
        color: colors.textGray3,
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
        backgroundColor: colors.whitePrimary,
        color: colors.textGray3,
        borderWidth: 1,
        borderColor: colors.textGray3,

        fontSize: 18
    },
    searchButton: {
        height: 40,
        width: 90,
        backgroundColor: colors.greenPrimary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    searchButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textWhite
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary,

        marginHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.textGray3
    }
})