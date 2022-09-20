import React, { useContext, useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, GestureResponderEvent } from "react-native"
import { Avatar, Button, } from 'react-native-paper';
import store from "../storage/Store";
import { Benefit, Task } from "../types";
import Title from "../components/Title";
import { TextInput } from "../components/TextInput";
import { StyleContext } from "../providers/StyleProvider";

export default function NewBenefit({ navigation }: any) {
    const { styles } = useContext(StyleContext)
    const [text, setText] = useState("");
    const [error, setError] = useState(false)
    const [benefits, setBenefits] = useState<Array<Benefit>>(store.getState().benefits)

    useEffect(() => {
        store.dispatch({
            type: "newBenefits",
            payload: benefits,
        });
        const unsubscribe = store.subscribe(() => {
            setBenefits(store.getState().benefits);
        });
        return unsubscribe;
    }, [benefits])

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
                title="Add a Benefit"
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
                        let prevBenefits = benefits
                        prevBenefits.push({
                            name: text,
                            ranking: benefits.length,
                            color: ""
                        })
                        setBenefits([...prevBenefits])
                        navigation.navigate('Home')
                    }
                }}
            >
            </Button>
        </SafeAreaView >
    )
}