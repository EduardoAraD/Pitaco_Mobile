import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { League } from '../../models/League'
import { Point } from '../../models/Point'

import colors from '../../assets/colors'

export default function SearchLeague() {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [leagues, setLeagues] = useState<League[]>([])
    const [leaguesFilter, setLeaguesFilter] = useState<League[]>([])

    useEffect(() => {
        loadLeague()
    }, [])

    function loadLeague(){
        const data = [
            {   name: 'Pitaco', logo: require('../../assets/images/logoPitaco.png'),
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Dashboard', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Eupaminondas', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Criando Conteúdo', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Liga Pabussú', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Teste oi', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Voisinhas', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Gasguito e compades', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Locomodiva', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Olha o pao', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Pq eu testei isso', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Las chicas magicas', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Os hemafroditas', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League
        ]
        setLeagues( data )
        setLeaguesFilter( data )
    }

    function handleSearchLeague() {
        const newleagues = leagues.filter(league => league.name.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))
        setLeaguesFilter( newleagues )
    }

    function handleSearchNavigateLeague(index: number) {
        const league = leaguesFilter[index]
        league.points = [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }} as Point,
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }} as Point,
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }} as Point,
        ]

        navigation.navigate('LeagueShowScreen', { league })
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewSearch}>
                <Text style={styles.searchText}>Procurar</Text>
                <View style={styles.searchAction}>
                    <TextInput value={search} style={styles.searchInput}
                        onChangeText={ text => setSearch(text)} />
                    <View style={{ width: 20 }} />
                    <TouchableOpacity style={styles.searchButton}
                        onPress={handleSearchLeague}>
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.titleText}>Ligas</Text>
            <ScrollView style={styles.scroll}>
                { leaguesFilter.map( (league, index) => 
                    <TouchableOpacity key={index} style={styles.card}
                        onPress={() => handleSearchNavigateLeague(index)}>
                        <Image style={styles.cardImg} resizeMode='contain'
                            source={league.logo} />
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardInfoTitle}>{league.name}</Text>
                            <Text style={styles.cardInfoDono}>{league.dono ?
                                `@${league.dono.name}` : ''}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite
    },
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
        borderRadius: 20,
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
        backgroundColor: colors.greenSecundary,
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
    },
    scroll: {
        paddingHorizontal: 20
    },
    card: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,

        backgroundColor: colors.whitePrimary,
        borderRadius: 20,
        elevation: 3
    },
    cardImg: {
        height: 50,
        width: 50
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    cardInfoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.greenPrimary
    },
    cardInfoDono: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textGray3
    }
})
