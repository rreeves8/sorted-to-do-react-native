import React from "react"
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native"
import { Avatar, TextInput } from 'react-native-paper';
import store from "../storage/Store";
import { Benefit } from "../types";

const Benefits = () => {
    let benefits: Array<Benefit> = store.getState().benefits
    
    return(
        <View>
            {benefits.map((e) => {
                return (
                    <Text>
                        {e}
                    </Text>
                )
            })}
            
        </View>
    )
}

export default function NewTasks({ navigation }: any) {
    const [text, setText] = React.useState("");

    return (
        <SafeAreaView style={styles.backGround}>
            <Avatar.Icon
                style={{ backgroundColor: 'black' }}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/arrow-left.png')}
                        style={{ width: size, height: size, tintColor: color }}
                    />
                )}
                color="white"
                onTouchEnd={() => {
                    navigation.navigate("Home")
                }}
            />
            <View style={styles.backGround}>
                <Text style={{ margin: 20, color: 'white', fontSize: 20 }}>
                    Task Description
                </Text>
                <TextInput
                    outlineColor="blue"
                    autoComplete={true}
                    placeholder="Fix Dish washer"
                    style={{ marginLeft: 20, marginRight: 20, borderColor: 'blue', borderWidth: 3 }}
                    value={text}
                    onChangeText={(text) => { setText(text) }}
                />
                <Text style={{ marginTop: 30, margin: 20, color: 'white', fontSize: 20 }}>
                    Benefits
                </Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        marginTop: 1,
        left: '85%',

    },
    dateText: {
        color: 'black',
        marginLeft: 20,
        marginTop: 22,
        fontSize: 34
    },
    backGround: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
})