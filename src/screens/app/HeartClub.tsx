import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'
import SearchInput from '../../components/SearchInput'

import { Clube } from '../../models/Clube'

import colors from '../../assets/colors'

export default function HeartClub() {
    const [search, setSearch] = useState('')
    const [clubChoose, setClubChoose] = useState<Clube | null>(null)
    const [clubes, setClubes] = useState<Clube[]>([])
    const [clubesFilter, setClubesFilter] = useState<Clube[]>([])

    useEffect(() => {
        loadingData()
    }, [])

    function loadingData(){
        const dataClub = [
            {   name: 'Ceará SC', shortName: 'CEA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'
            } as Clube,
            { name: 'Ferroviário AC', shortName: 'FER',
                logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'
            } as Clube,
            {   name: 'Fortaleza EC', shortName: 'FOR',
                logo: 'https://fortaleza1918.com.br/wp-content/uploads/2018/03/escudosite.png'
            } as Clube,
            {   name: 'CR Flamengo', shortName: 'FLA',
                logo: 'https://a2.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F819.png'    
            } as Clube,
            {   name: 'Botafogo', shortName: 'BOT',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png'    
            } as Clube,
            {   name: 'São Paulo FC', shortName: 'SPA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png'    
            } as Clube,
            {   name: 'Sport Refice', shortName: 'SPT',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sport_Club_Recife.svg/1200px-Sport_Club_Recife.svg.png'    
            } as Clube,
            {   name: 'Palmeiras', shortName: 'PAL',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png'    
            } as Clube,
            {   name: 'EC Bahia', shortName: 'BAH',
                logo: 'https://www.esporteclubebahia.com.br/wp-content/uploads/2014/07/2017_logobahia.png'    
            } as Clube,
            {   name: 'Athetico Paranaense', shortName: 'CAP',
                logo: 'https://upload.wikimedia.org/wikipedia/pt/c/c7/Club_Athletico_Paranaense_2019.png'    
            } as Clube
        ]

        setClubes( dataClub )
        setClubesFilter( dataClub )
    }

    function handleSearchClub() {
        const clubFilter = clubes.filter(clube => clube.name.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))
        setClubesFilter( clubFilter )
    }

    function handleConfirmButtom() {
        console.log(clubChoose)
    }

    function viewClubChoose(){
        return clubChoose ? (
            <View style={styles.card}>
                <Image style={styles.cardImg} resizeMode='contain'
                    source={{ uri: clubChoose.logo }} />
                <Text style={styles.cardText}>{clubChoose.name}</Text>
            </View>
        ) : (
            <View style={[styles.card, {justifyContent: 'center'}]}>
               <Text style={styles.cardText}>Sem Clube</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewSearch}>
                <Text style={styles.titleText}>Escolha o Clube de Coração</Text>
                <SearchInput value={search} setValue={setSearch} onPress={handleSearchClub} title='Clubes' />
                <ScrollView style={styles.scroll}>
                    { clubesFilter.map((club, index) =>
                        <TouchableOpacity style={styles.card} key={index}
                            onPress={() => setClubChoose(club) }>
                            <Image style={styles.cardImg} resizeMode='contain'
                                source={{ uri: club.logo }} />
                            <Text style={styles.cardText}>{club.name}</Text>
                        </TouchableOpacity>
                    ) }
                </ScrollView>
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.titleTextInfo}>Clube escolhido</Text>
                { viewClubChoose() }
                <ButtonConfirmComponent onPress={handleConfirmButtom} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite
    },
    viewSearch: {
        flex: 1
    },
    titleText: {
        margin: 20,
        marginBottom: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary
    },
    scroll: {
        marginHorizontal: 20
    },
    card: {
        height: 40,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: colors.whitePrimary,
        borderRadius: 10,
        flexDirection: 'row',
        elevation: 3
    },
    cardImg: {
        height: 30,
        width: 30,
        marginHorizontal: 5
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textGray2
    },
    viewInfo: {
        marginHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.textGray4,
    },
    titleTextInfo: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary
    }
})