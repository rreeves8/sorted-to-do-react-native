import React, { useEffect, useMemo } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, GestureResponderEvent } from "react-native"
import { Avatar, TextInput, Button, } from 'react-native-paper';
import { CategoryProvider } from "../providers/CategoryProvider";
import store from "../storage/Store";
import { Category, Task } from "../types";
import { styles } from "../styles/styles";

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
                    labelStyle={{ fontSize: 45, color: 'black' }}
                    onPress={() => {
                        if(text === ''){
                            setError(true)
                        }
                        else{
                            let newCat = store.getState().categories
                            
                            newCat.push({
                                name: text,
                                tasks: new Array<Task>()
                            })

                            store.dispatch({
                                type: 'addCategory', 
                                payload: newCat
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