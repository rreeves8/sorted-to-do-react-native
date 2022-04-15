import React, { useMemo, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native"
import { Avatar, TextInput, Button } from 'react-native-paper';
import store from "../storage/Store";
import { Benefit } from "../types";
import { styles } from "../styles/styles";

const Benefits = () => {
    let benefits: Array<Benefit> = store.getState().benefits

    return (
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

export default function NewTasks({ route, navigation }: any) {
    const { category } = route.params
    const [text, setText] = React.useState("");
    
    const [selectedBenefits, setBenefits] = useState(new Array())
    
    const [error, setError] = React.useState(false)

    useMemo(() => {
        if (error) {
            setTimeout(() => setError(false), 3000)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.backGround}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar.Icon
                    style={{ backgroundColor: '#F5F5F5', marginLeft: '2%' }}
                    size={50}
                    icon={({ size, color }) => (
                        <Image
                            source={require('../assets/arrow-left.png')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    )}
                    color="black"
                    onTouchEnd={() => {
                        navigation.navigate("Home")
                    }}
                />
                <Text style={{ marginTop: 13, color: 'black', fontSize: 20, marginLeft: '18%' }}>
                    Create New Task
                </Text>
            </View>
            <View style={styles.backGround}>
                <Text style={{ marginTop: 13, color: 'black', fontSize: 17, marginLeft: 24 }}>
                    Name Of Task
                </Text>
                <TextInput
                    outlineColor="blue"
                    autoComplete={true}
                    error={error}
                    placeholder="text Holly, fix relationship, etc...."
                    style={{
                        marginLeft: 24,
                        marginRight: 24,
                        marginTop: 15,
                        borderColor: (error) ? 'red' : 'blue',
                        fontSize: 15,
                        height: 50,
                        borderWidth: (error) ? 3 : 0
                    }}
                    value={text}
                    onChangeText={(text) => { setText(text) }}
                />
                <Text style={{ marginTop: 45, color: 'black', fontSize: 17, marginLeft: 24 }}>
                    Benefits
                </Text>
                <Benefits/>

                <Button
                    icon="check"
                    mode="text"
                    style={{ marginTop: 24 }}
                    labelStyle={{ fontSize: 45, color: 'black' }}
                    onPress={() => {

                    }}
                >
                </Button>
            </View>
        </SafeAreaView >
    )
}