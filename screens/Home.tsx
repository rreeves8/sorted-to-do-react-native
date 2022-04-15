import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, GestureResponderEvent, Animated, PanResponder, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import store from "../storage/Store";
import { Category } from "../types";
import { styles } from "../styles/styles";
import Title from "../components/Title";
import MovableMenu from '../components/MovableMenu'
import Categories from '../components/Categories'
import { CategoryProvider } from "../providers/CategoryProvider";

const fetchTime = (dateObj: Date) => {
    return ((dateObj.getHours() > 12) ? (dateObj.getHours() - 12) : (dateObj.getHours())) +
        ":" + ((dateObj.getMinutes() < 10) ? ("0" + dateObj.getMinutes()) : dateObj.getMinutes())
}

const DateDisplay = () => {
    let months = [
        "January",
        "Febuary",
        "March",
        "April",
        "June"
    ]

    let dateObj = new Date()
    const [date, setDate] = useState({
        month: months[dateObj.getMonth()],
        day: dateObj.getDate(),
        time: fetchTime(dateObj),
        seconds: dateObj.getTime()
    })
    const [timeOut, settimeOut] = useState(0)

    useMemo(() => {
        setTimeout(() => setDate({
            ...date,
            time: fetchTime(new Date()),
            seconds: new Date().getTime()
        }), timeOut)
        if (timeOut !== 1) {
            settimeOut(1)
        }
    }, [date])

    const checkTime = () => {
        let time = fetchTime(new Date())
        if (time !== date.time) {
            settimeOut(new Date().getTime() - date.seconds)
            setDate({
                ...date,
                time: time
            })
        }
    }

    checkTime()

    return (
        <View style={[styles.dateContainer, styles.shadowProp]}>
            <Text style={styles.dateText}>
                {date.month + " " + date.day}
            </Text>
            <Text style={styles.dateText}>
                {date.time}
            </Text>
        </View>
    )
}

export default function Home({ navigation }: any) {
    const [cateroies, setCateroies] = useState(store.getState().categories)
    const isFocused = useIsFocused()

    useEffect(() => {
        //update on change
        setCateroies(store.getState().categories)
    }, [isFocused])

    return (
        <SafeAreaView style={styles.backGround}>
            <View style={styles.backGround}>
                <Title nav={navigation} />
                <DateDisplay />
                {cateroies.length === 0 ? (
                    <View>
                        <Text style={{ ...styles.title, marginTop: 20 }}>
                            Add a Category using the plus!
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        <CategoryProvider>
                            <Categories
                                nav={navigation}
                            />
                        </CategoryProvider>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView >
    )
}
