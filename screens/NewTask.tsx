import React, { useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from "react-native"
import { Avatar, TextInput, Button } from 'react-native-paper';
import store from "../storage/Store";
import { Benefit, Task } from "../types";
import { styles } from "../styles/styles";

const randoColor = () => {
    let bgColor = [
        'red',
        'blue',
        'green',
        'orange',
    ]
    return bgColor[Math.floor(Math.random() * bgColor.length)];
}

export default function NewTasks({ route, navigation }: any) {
    const { category } = route.params
    let benefits: Array<Benefit> = store.getState().benefits
    
    const [text, setText] = React.useState("");
    const [selectedBenefits, setSelectedBenefits] = useState(new Array(benefits.length).fill(false))

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
                    placeholder="Buy item, Text John, Research topic...."
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
                <Text style={{ marginTop: 30, color: 'black', fontSize: 17, marginLeft: 24, marginBottom: 10 }}>
                    Benefits
                </Text>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginLeft: 10 }}>
                    {benefits.map((e: Benefit, i: number) => {
                        return (
                            <View key={i} style={[{
                                opacity: 0.7,
                                backgroundColor: 'white',
                                borderColor: (selectedBenefits[i]) ? ('black') : ('white'),
                                borderWidth: 5,
                                borderRadius: 30,
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 5,
                                marginLeft: 5,
                            }, styles.shadowProp]}
                                onTouchEnd={() => {
                                    let prevSelec = selectedBenefits
                                    console.log(prevSelec[i])
                                    prevSelec[i] = !prevSelec[i]
                                    setSelectedBenefits([...prevSelec])
                                }}
                            >
                                <Text style={{ fontSize: 20, color: 'black', padding: 15 }}>
                                    {e.name}
                                </Text>
                            </View>
                        )
                    })}
                </View >
                <Button
                    icon="check"
                    mode="text"
                    style={{ marginTop: 24 }}
                    labelStyle={{ fontSize: 45, color: 'black' }}
                    onPress={() => {
                        if(text === ''){
                            setError(true)
                        }
                        else{
                            let newTask: Task = {
                                name: text,
                                completion: false,
                                benefits: selectedBenefits.map((e: boolean, i: number) => {
                                    return {
                                        e,
                                        i
                                    }
                                }).filter((e: any)=> {
                                    return e.e
                                }).map((e: any) => {
                                    return benefits[e.i]
                                })
                            }

                            store.dispatch({
                                type: 'addTask',
                                payload: {
                                    catergoryName: category.name,
                                    task: newTask
                                }
                            })
                            navigation.goBack()
                        }
                    }}
                >
                </Button>
            </View>
        </SafeAreaView >
    )
}