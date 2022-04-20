import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, View, Text, Image, Animated, PanResponder, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import store from "../storage/Store";
import { Category, Task } from "../types";
import { styles } from "../styles/styles";
import Title from "../components/Title";
import Categories from '../components/CategoryMovableList'
import { CategoryProvider } from "../providers/CategoryProvider";
import Swiper from "react-native-swiper";
import TaskNode from "../components/TaskNode";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Modal } from "react-native-paper";

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
    const [activationDistance, setActivationDistance] = useState(100);
    const [dropDown, setDropDown] = useState(false)
    const [sortType, setSortType] = useState(0)

    const toggleModal = () => {
        setDropDown(!dropDown);
    }

    useEffect(() => {
        //update on change
        setCateroies(store.getState().categories)
    }, [isFocused])

    return (
        <SafeAreaView
            onTouchEnd={() => {
                if (dropDown) {
                    setDropDown(false)
                    console.log("dropdown")
                }
            }}
            style={styles.backGround}
        >
            <Title
                LeftNav={{
                    nav: () => navigation.navigate('Settings'),
                    icon: require('../assets/icons/settings.png'),
                    isImage: true
                }}
                RightNav={{
                    nav: () => navigation.navigate('NewCategory'),
                    icon: 'plus',
                }}
                title="Sorted To Do"
            />
            <DateDisplay />
            {cateroies.length === 0 ? (
                <View>
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        Add a Category using the plus!
                    </Text>
                </View>
            ) : (
                <Swiper loop={false}>
                    <View>
                        <Text style={{ marginLeft: 20, fontSize: 20 }}> Categories </Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <CategoryProvider>
                                <Categories
                                    activationDistance={activationDistance}
                                    nav={navigation}
                                />
                            </CategoryProvider>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={{ flex: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: 20, fontSize: 20 }}> Sorted Tasks </Text>
                            <View style={{ marginRight: 20, alignSelf: 'flex-end' }}>
                                <Avatar.Icon
                                    style={{
                                        backgroundColor: '#F5F5F5',
                                        position: 'relative',
                                        top: -15,
                                        transform: [{ rotateY: '180deg' }]
                                    }}
                                    size={55}
                                    icon={require('../assets/icons/sort_change.png')}
                                    color="black"
                                    onTouchEnd={() => {
                                        setDropDown(true)
                                        console.log('touched')
                                    }}
                                >
                                    <Modal
                                        visible={dropDown}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text>Hello!</Text>
                                        </View>
                                    </Modal>
                                </Avatar.Icon>
                            </View>
                        </View>
                        <ScrollView stickyHeaderIndices={[0]} style={{ height: '100%' }}>
                            {cateroies.map((e: Category, i: number) => {
                                return <View
                                    key={i}
                                >
                                    {e.tasks.map((t: Task, j: number) => {
                                        return <TaskNode
                                            key={j}
                                            category={e}
                                            task={t}
                                            nav={navigation}
                                        />
                                    })}
                                </View>
                            })}
                        </ScrollView>
                    </View>
                </Swiper>
            )
            }
        </SafeAreaView >
    )
}