import React, { useContext, useEffect, useMemo } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, GestureResponderEvent } from "react-native"
import { Avatar, Button, } from 'react-native-paper';
import { CategoryProvider } from "../providers/CategoryProvider";
import store from "../storage/Store";
import { Benefit, Task } from "../types";
import Title from "../components/Title";
import { TextInput } from "../components/TextInput";
import { BenefitsContext } from "../providers/BenefitsProvider";
import { StyleContext } from "../providers/StyleProvider";

export default function NewBenefit({ navigation }: any) {
    const { styles } = useContext(StyleContext)
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState(false)
    //@ts-ignore
    const { benefits, setBenefits } = useContext(BenefitsContext);

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