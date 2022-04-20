import React, { useEffect, useMemo } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, GestureResponderEvent } from "react-native"
import { Avatar, Button, } from 'react-native-paper';
import { CategoryProvider } from "../providers/CategoryProvider";
import store from "../storage/Store";
import { Category, Task } from "../types";
import { styles } from "../styles/styles";
import Title from "../components/Title";
import { TextInput } from "../components/TextInput";

export default function NewCategory({ navigation }: any) {
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState(false)

    useMemo(() => {
        if (error) {
            setTimeout(() => setError(false), 3000)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.backGround}>
            <Title
                LeftNav={{
                    nav: () => { navigation.goBack() },
                    icon: require('../assets/icons/arrow-left.png'),
                }}
                title="Add Category"
            />

            <TextInput
                text={text}
                setText={setText}
                error={error}
                title="Name Of Task"
            />
            <Button
                icon="check"
                mode="text"
                style={{ marginTop: 24 }}
                labelStyle={{ fontSize: 45, color: 'black' }}
                onPress={() => {
                    if (text === '') {
                        setError(true)
                    }
                    else {
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
        </SafeAreaView >
    )
}