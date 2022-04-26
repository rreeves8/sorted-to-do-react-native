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
    const [pickedData, setPickedData] = useState<PickerItem>();
    const pickerRef = React.useRef<PickerInstance | null>(null);

    const { styles } = useContext(StyleContext)

    const data: Array<PickerItem> = [
        { label: "Due Date", value: 1 },
        { label: "Benefits Importance Sum", value: 2 },
        { label: "Benefits Quantity", value: 3 },
        { label: "Benefits Quantity and Sum", value: 4 }
    ];

    const toggleModal = () => {
        setDropDown(!dropDown);
    }

    useEffect(() => {
        //update on change
        setCateroies(store.getState().categories)
    }, [isFocused])

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
                        isImage: true
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
                <Swiper style={{ height: '100%' }} index={1} loop={false}>
                    <View>
                        <Benefits
                            activationDistance={activationDistance}
                            nav={navigation}
                        />
                    </View>
                    <View>
                        <CategoryProvider>
                            <Categories
                                activationDistance={activationDistance}
                                nav={navigation}
                            />
                        </CategoryProvider>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={{ flex: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: 20, fontSize: 20 }}> Sorted Tasks </Text>
                            <View style={{ marginRight: 20, alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', flexWrap: "wrap-reverse" }}>
                                <Picker
                                    InputComponent={() => (
                                        <Avatar.Icon
                                            style={{
                                                backgroundColor: 'transparent',
                                                position: 'relative',
                                                top: -15,
                                                transform: [{ rotateY: '180deg' }],
                                            }}
                                            size={55}
                                            icon={require('../assets/icons/sort_change.png')}
                                            color="black"
                                            onTouchEnd={() => {
                                                pickerRef.current?.open()
                                            }}
                                        />
                                    )}
                                    DoneBarComponent={() => (
                                        <View style={{
                                            borderTopColor: iosColors.System.gray.dark,
                                            borderTopWidth: 0.5,
                                            borderBottomColor: iosColors.System.gray.dark,
                                            borderBottomWidth: 0.5,
                                            backgroundColor: iosColors.System.gray6.light
                                        }}>
                                            <Text style={{ alignSelf: 'flex-end', fontFamily: 'SF-Pro', fontSize: 20, margin: 15 }}>
                                                Done
                                            </Text>
                                        </View>
                                    )}
                                    iosCustomProps={{
                                        style: {
                                            backgroundColor: iosColors.System.gray3.light,
                                            fontFamily: 'SF-Pro'
                                        }
                                    }}
                                    itemColor={iosColors.System.gray6.dark}
                                    textInputStyle={{ color: iosColors.Blue.light, fontFamily: 'SF-Pro' }}
                                    ref={pickerRef}
                                    items={data}
                                    onItemChange={setPickedData}
                                    isNullable={true}

                                />
                            </View>
                        </View>
                        <ScrollView stickyHeaderIndices={[0]} style={{ height: '100%' }}>
                            {(() => {
                                let isEmpty = true

                                let categoriesJSX = () => {
                                    return (
                                        cateroies.map((e: Category, i: number) => {
                                            if (e.tasks.length !== 0) {
                                                isEmpty = false
                                            }
                                            return () => {
                                                <View
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
                                            }
                                        })

                                    )
                                }

                                return (isEmpty) ? <Text style ={{
                                    alignSelf: 'center'
                                }}>No Tasks, add a task using the cateroies section</Text> : categoriesJSX
                            })()}
                        </ScrollView>
                    </View>
                </Swiper>
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