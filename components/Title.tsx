import React, { useContext, useState } from "react"
import { View, Text, Image, ImageSourcePropType, ImageURISource } from "react-native"
import { Avatar } from "react-native-paper"
import { StyleContext } from "../providers/StyleProvider"
import { TitleIcon } from '../types'

/*
const oldSomething = () => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
            <Avatar.Icon
                style={{ backgroundColor: '#F5F5F5', marginLeft: '2%', flex: 0 }}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/arrow-left.png')}
                        style={{ width: size, height: size, tintColor: color }}
                    />
                )}
                color="black"
                onTouchEnd={() => {
                    nav.navigate("Home")
                }}
            />
            <Text style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'black',
                fontSize: 25,
                flex: 1,
            }}>
                Account
            </Text>
            <Avatar.Icon
                style={{ backgroundColor: '#F5F5F5', marginRight: '2%', flex: 0 }}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/icons/logout.png')}
                        style={{ width: size, height: size, tintColor: color }}
                    />
                )}
                color="black"
                onTouchEnd={() => {
                    Alert.alert('Log out', 'Are you sure you want to log out ?', [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: async () => {
                                await logOut()
                                setLoggedIn(false)
                                nav.navigate("Home")
                            }
                        },
                    ]);
                }}
            />
        </View>
    )
}
*/

const getIcons = (nav: TitleIcon) => {
    return (typeof nav.icon !== 'string' ) ? (
        ({ size, color }: any) => (
            <Image
                source={nav.icon as ImageURISource}
                style={{ width: size, height: size, tintColor: color }}
            />
        )
    ) : (nav.icon as string)
}


export default function Title(props: { title: string, LeftNav?: TitleIcon, RightNav?: TitleIcon }) {
    const { styles } = useContext(StyleContext)

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <View style={{
                marginLeft: 10,
                backgroundColor: '#F5F5F5'
            }}>
                {(props.LeftNav) ? (
                    <Avatar.Icon
                        style={{ backgroundColor: '#F5F5F5' }}
                        size={50}
                        icon={getIcons(props.LeftNav!)}
                        color="black"
                        onTouchEnd={() => {
                            props.LeftNav?.nav()
                        }}
                    />
                ) : (
                    <View
                        style={{ backgroundColor: '#F5F5F5', height: 50, width: 50 }}
                    />
                )}
            </View>
            <Text style={[{
                fontFamily: 'SF-Pro',
                alignSelf: 'center',
                fontSize: 25,
                textAlign: 'center'
            }, styles.title, { flex: 1 }]}>
                {props.title}
            </Text>
            <View style={{ marginRight: 10, backgroundColor: '#F5F5F5' }}>
                {(props.RightNav) ? (
                    <Avatar.Icon
                        style={[{ backgroundColor: '#F5F5F5' }, (props.RightNav.style) ? (props.RightNav.style):({ })]}
                        size={55}
                        icon={getIcons(props.RightNav)}
                        color="black"
                        onTouchEnd={() => {
                            props.RightNav?.nav()
                        }}
                    />
                ) : (
                    <View
                        style={{ backgroundColor: '#F5F5F5', height: 50, width: 50 }}
                    />
                )}
            </View>
        </View>
    )
}