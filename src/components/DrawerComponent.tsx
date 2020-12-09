import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem,
    DrawerContentComponentProps } from '@react-navigation/drawer'
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import { useAuth } from '../contexts/auth'

export default function DrawerComponent(props: DrawerContentComponentProps) {
    const { user, themeDark, theme, signOut, onChangeThemeDark } = useAuth()

    const toggleTheme = async () => {
        await onChangeThemeDark()
    }

    function handleSignOut(){
        signOut()
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={[styles.userInfoSection, { borderBottomColor: theme.textGray3 }]}>
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png' }}
                            resizeMode='contain' style={styles.userInfoImg} />
                        <View style={styles.userInfo}>
                            <Text style={[styles.userInfoName, {color: theme.textGray1}]}>{user?.name}</Text>
                            <Text style={[styles.userInfoClube,{color: theme.textGray3}]}>Flamengo</Text>
                        </View>
                    </View>
                    <View style={[styles.drawerSection, {borderBottomColor: theme.textGray4}]}>
                        <DrawerItem label="Dashboard" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem label="Pitaco" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="scoreboard-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Pitaco')}}
                        />
                        <DrawerItem label="Championship" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="soccer" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Championship')}}
                        />
                        <DrawerItem label="League" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="trophy-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('League')}}
                        />
                        <DrawerItem label="Clube de Coração" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="heart-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('HeartClub')}}
                        />
                        <DrawerItem label="Amigos" inactiveTintColor={theme.textGray2}
                            icon={({color, size}) => (
                                <Icon name="account-group-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Friend')}}
                        />
                    </View>
                    <View style={[styles.drawerSection, {borderBottomColor: theme.textGray4}]}>
                        <Text style={[styles.textPreference, {color: theme.textGray3}]}>Preferências</Text>
                        <TouchableOpacity onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={{ color: theme.textGray2 }}>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={themeDark}
                                        trackColor={{ true: theme.greenPrimary, false: theme.textGray3 }}
                                        thumbColor={themeDark ? theme.greenPrimary : theme.textGray3 }/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={[styles.bottonDrawerSection, {borderColor: theme.textGray4}]}>
                <DrawerItem label="Sair" inactiveTintColor={theme.textGray2}
                    icon={({color, size}) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    onPress={handleSignOut}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex:1
    },
    userInfoSection: {
        padding: 20,
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    userInfoImg: {
        height: 40,
        width: 40,
        marginRight: 10
    },
    userInfo: {
        flex: 1,
        justifyContent: 'space-between'
    },
    userInfoName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    userInfoClube: {
        fontSize: 14,
        fontWeight: '600'
    },
    drawerSection: {
        borderBottomWidth: 1
    },
    bottonDrawerSection: {
        marginBottom: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    textPreference: {
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 4
    }
})
