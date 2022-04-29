import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, View, Text, Image, Animated, PanResponder, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import store from "../storage/Store";
import { Category, Task } from "../types";
import Title from "../components/Title";
import Categories from '../components/Categories'
import { CategoryProvider } from "../providers/CategoryProvider";
import Swiper from "react-native-swiper";
import TaskNode from "../components/TaskNode";
import { Avatar, Button, Modal, Portal, Provider } from "react-native-paper";
import Benefits from '../components/Benefits'
import { StyleContext } from "../providers/StyleProvider";
import type { PickerInstance, PickerItem } from 'react-native-woodpicker'
import { Picker } from 'react-native-woodpicker'
import { iosColors } from "../styles/styles";
import SortableTasks from "../components/SortableTasks";
import { BenefitsContext } from "../providers/BenefitsProvider";

const fetchTime = (dateObj: Date) => {
    return ((dateObj.getHours() > 12) ? (dateObj.getHours() - 12) : (dateObj.getHours())) +
        ":" + ((dateObj.getMinutes() < 10) ? ("0" + dateObj.getMinutes()) : dateObj.getMinutes())
}

const DateDisplay = () => {
    const { styles } = useContext(StyleContext)

    let months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May", "June"
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
        <View style={[{
            height: 150,
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 25 / 2,
            borderRadius: 25
        }, styles.dateContainer, styles.shadowProp]}>
            <Text style={[styles.dateText, , { marginLeft: 20, marginTop: 22, fontSize: 34 }]}>
                {date.month + " " + date.day}
            </Text>
            <Text style={[styles.dateText, { marginLeft: 20, marginTop: 22, fontSize: 34 }]}>
                {date.time}
            </Text>
        </View>
    )
}

export default function Home({ navigation }: any) {
    const [cateroies, setCateroies] = useState(store.getState().categories)
    const isFocused = useIsFocused()
    const [activationDistance, setActivationDistance] = useState(10);
    const [dropDown, setDropDown] = useState(false)
    const { benefits } = useContext(BenefitsContext);

    const { styles } = useContext(StyleContext)

    useEffect(() => {
        //update on change
        setCateroies(store.getState().categories)
    }, [isFocused, benefits])

    return (
        <View
            onTouchEnd={() => {
                if (dropDown) {
                    setDropDown(false)
                    console.log("dropdown")
                }
            }}
            style={styles.backGround}
        >
            <SafeAreaView>
                <Title
                    LeftNav={{
                        nav: () => navigation.navigate('Settings'),
                        icon: require('../assets/icons/settings.png'),
                    }}
                    RightNav={{
                        nav: () => navigation.navigate('Profile'),
                        icon: require('../assets/icons/account.png'),
                    }}
                    title="Sorted To Do"
                />
            </SafeAreaView>
            <DateDisplay />
            {cateroies.length === 0 ? (
                <View>
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        Add a Category using the plus!
                    </Text>
                </View>
            ) : (
                <CategoryProvider>
                    <Swiper style={{ height: '100%' }} index={1} loop={false}>
                        <View>
                            <Benefits
                                activationDistance={activationDistance}
                                nav={navigation}
                            />
                        </View>
                        <View>
                            <Categories
                                activationDistance={activationDistance}
                                nav={navigation}
                            />
                        </View>
                        <View>
                            <SortableTasks
                                navigation={navigation}
                            />
                        </View>
                    </Swiper>
                </CategoryProvider>
            )}
        </View >
    )
}
/**
 *   {dropDown ? (
                                    <View style={{
                                        position: 'relative',
                                        borderRadius: 20,
                                        top: -20,
                                        height: 125,
                                        width: 250,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        
                                        ...styles.dropDown
                                    }}>
                                        <View>
                                            
                                            <Text style={styles.dropDownText}>Due Date</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.dropDownText}>Benefits Importance Sum</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.dropDownText}>Benefits Quantity</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.dropDownText}>Benefits Quantity and Sum</Text>
                                        </View>
                                    </View>
                                ) : (<></>)}
 */