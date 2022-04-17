import React from "react"
import { View, Text, Image } from "react-native"
import { Avatar } from "react-native-paper"
import { styles } from "../styles/styles"
import { clearData } from '../storage/Persistent'

export default function Title({ nav }: any) {
    return (
        <View style ={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <View style={{
                flex: 0,
                marginTop: 1,
                marginLeft: 10,
                alignSelf: 'center',
                backgroundColor: '#F5F5F5'
            }}>
                <Avatar.Icon
                    style={{ backgroundColor: '#F5F5F5' }}
                    size={50}
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/icons/account.png')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    color="black"
                    onTouchEnd={() => {
                        nav.navigate("Profile")
                    }}
                />
            </View>
            <Text style={[styles.title, { flex: 1}]}>
                Sorted To Do List
            </Text>
            <View style={{ marginRight: 10 }}>
                <Avatar.Icon
                    style={{ backgroundColor: '#F5F5F5' }}
                    size={55}
                    icon='plus'
                    color="black"
                    onTouchEnd={() => {
                        nav.navigate("NewCategory")
                    }}
                />
            </View>
        </View>
    )
}