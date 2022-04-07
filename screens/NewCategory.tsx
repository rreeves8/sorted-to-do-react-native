import React, { useEffect, useMemo } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native"
import { Avatar, TextInput, Button, } from 'react-native-paper';
import store from "../storage/Store";
import { Task } from "../types";

export default function NewCategory({ navigation }: any) {
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState(false)

    useMemo(() => {
        if(error){
            setTimeout(() => setError(false), 3000)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.backGround}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar.Icon
                    style={{ backgroundColor: 'black', marginLeft: '2%' }}
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
                <Text style={{ marginTop: 13, color: 'white', fontSize: 20, marginLeft: '18%' }}>
                    Name Of Category
                </Text>
            </View>
            <View style={styles.backGround}>
                <TextInput
                    outlineColor="blue"
                    autoComplete={true}
                    error={error}
                    placeholder="Chores, school, etc...."
                    style={{ 
                        marginLeft: 24, 
                        marginRight: 24, 
                        marginTop: 24, 
                        borderColor: (error) ? 'red' : 'blue', 
                        fontSize: 20, 
                        height: 50, 
                        borderWidth: (error) ? 3 : 0
                    }}
                    value={text}
                    onChangeText={(text) => { setText(text) }}
                />
                <Button
                    icon="check"
                    mode="text"
                    style={{ marginTop: 24 }}
                    labelStyle={{ fontSize: 45, color: 'white' }}
                    onPress={() => {
                        if(text === ''){
                            setError(true)
                        }
                        else{
                            store.dispatch({
                                type: 'addCategory', 
                                payload: {
                                    name: text,
                                    tasks: new Array<Task>()
                                }
                            })
                            console.log(store.getState().categories[0].name)
                            
                            navigation.navigate('Home')
                        }
                    }}
                >
                </Button>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    iconContainer: {
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