import React from "react"
import { View, Text, Image } from "react-native"
import { Avatar } from "react-native-paper"
import { styles } from "../styles/styles"
import { clearData } from '../storage/Persistent'

export default function Title({ nav }: any) {
    return (
        <View>
            <View style={{
                position: 'absolute',
                marginTop: 1,
                left: '2%',
                backgroundColor: '#F5F5F5'
            }}>
                <Avatar.Icon
                    style={{ backgroundColor: '#F5F5F5' }}
                    size={50}
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/icons/trash.png')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    color="black"
                    onTouchEnd={() => {
                        clearData()
                    }}
                />
            </View>
            <Text style={styles.title}>
                Sorted To Do List
            </Text>
            <View style={styles.iconContainer}>
                <Avatar.Icon
                    style={{ backgroundColor: '#F5F5F5' }}
                    size={50}
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