import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { 
    DrawerContentScrollView,
    DrawerItem,
    DrawerContentComponentProps
} from '@react-navigation/drawer'
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import { useAuth } from '../contexts/auth'

import colors from '../assets/colors'

export default function DrawerComponent(props: DrawerContentComponentProps) {
    const { user, themeDark, signOut, onChangeThemeDark } = useAuth()

    const toggleTheme = async () => {
        await onChangeThemeDark()
    }

    function handleSignOut(){
        signOut()
    }

    return (
        <View style={{flex: 1, backgroundColor: colors.backgroundWhite }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png' }}
                            resizeMode='contain' style={styles.userInfoImg} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userInfoName}>{user?.name}</Text>
                            <Text style={styles.userInfoClube}>Flamengo</Text>
                        </View>
                        {/*<View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                            </View>*/}
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItem label="Dashboard" inactiveTintColor={colors.textGray2}
                            icon={({color, size}) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem label="Pitaco" inactiveTintColor={colors.textGray2}
                            icon={({color, size}) => (
                                <Icon name="scoreboard-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Pitaco')}}
                        />
                        <DrawerItem label="Championship" inactiveTintColor={colors.textGray2}
                            icon={({color, size}) => (
                                <Icon name="soccer" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('Championship')}}
                        />
                        <DrawerItem label="League" inactiveTintColor={colors.textGray2}
                            icon={({color, size}) => (
                                <Icon name="trophy-outline" color={color} size={size} />
                            )}
                            onPress={() => {props.navigation.navigate('League')}}
                        />
                    </View>
                    <View style={styles.drawerSection}>
                        <Text style={styles.textPreference}>Preferencias</Text>
                        <TouchableOpacity onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={{ color: colors.textGray2 }}>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={themeDark}
                                        trackColor={{ true: colors.greenPrimary, false: colors.textGray3 }}
                                        thumbColor={themeDark ? colors.greenPrimary : colors.textGray3 }/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottonDrawerSection}>
                <DrawerItem label="Sair" inactiveTintColor={colors.textGray2}
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

        borderBottomColor: colors.textGray3,
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
        fontWeight: 'bold',
        color: colors.textGray1
    },
    userInfoClube: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textGray3
    },
    drawerSection: {
        borderBottomWidth: 1,
        borderBottomColor: colors.textGray4
    },
    bottonDrawerSection: {
        marginBottom: 15,
        borderColor: colors.textGray4,
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
        color: colors.textGray3,
        marginLeft: 15,
        marginTop: 4
    }
})