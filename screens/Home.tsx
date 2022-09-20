import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Animated,
    PanResponder,
    ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import store from "../storage/Store";
import { Category, Task } from "../types";
import Title from "../components/Title";
import Categories from "../components/Categories";
import Swiper from "react-native-swiper";
import Benefits from "../components/Benefits";
import { StyleContext } from "../providers/StyleProvider";
import SortableTasks from "../components/SortableTasks";
import { Avatar } from "react-native-paper";
import { Icon } from "../components/Icon";

const fetchTime = (dateObj: Date) => {
    return (
        (dateObj.getHours() > 12
            ? dateObj.getHours() - 12
            : dateObj.getHours()) +
        ":" +
        (dateObj.getMinutes() < 10
            ? "0" + dateObj.getMinutes()
            : dateObj.getMinutes())
    );
};

const DateDisplay = () => {
    const { styles } = useContext(StyleContext);

    let months = ["January", "Febuary", "March", "April", "May", "June", 'July', "August", 'September'];

    let dateObj = new Date();
    const [date, setDate] = useState({
        month: months[dateObj.getMonth()],
        day: dateObj.getDate(),
        time: fetchTime(dateObj),
        seconds: dateObj.getTime(),
    });
    const [timeOut, settimeOut] = useState(0);

    useMemo(() => {
        setTimeout(
            () =>
                setDate({
                    ...date,
                    time: fetchTime(new Date()),
                    seconds: new Date().getTime(),
                }),
            timeOut
        );
        if (timeOut !== 1) {
            settimeOut(1);
        }
    }, [date]);

    const checkTime = () => {
        let time = fetchTime(new Date());
        if (time !== date.time) {
            settimeOut(new Date().getTime() - date.seconds);
            setDate({
                ...date,
                time: time,
            });
        }
    };

    checkTime();

    return (
        <View
            style={[
                {
                    height: 150,
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 25 / 2,
                    borderRadius: 25,
                },
                styles.dateContainer,
                styles.shadowProp,
            ]}
        >
            <Text
                style={[
                    styles.dateText,
                    { marginLeft: 20, marginTop: 22, fontSize: 34 },
                ]}
            >
                {date.month + " " + date.day}
            </Text>
            <Text
                style={[
                    styles.dateText,
                    { marginLeft: 20, marginTop: 22, fontSize: 34 },
                ]}
            >
                {date.time}
            </Text>
        </View>
    );
};

export default function Home({ navigation }: any) {
    const [categories, setCateroies] = useState(store.getState().categories);
    const isFocused = useIsFocused();
    const [activationDistance, setActivationDistance] = useState(10);
    const [dropDown, setDropDown] = useState(false);
    const { styles } = useContext(StyleContext);

    useEffect(() => {
        store.dispatch({
            type: "setCategories",
            payload: categories,
        });
        const unsubscribe = store.subscribe(() => {
            setCateroies(store.getState().categories);
        });
        return unsubscribe;
    }, [categories]);

    return (
        <View
            onTouchEnd={() => {
                if (dropDown) {
                    setDropDown(false);
                    console.log("dropdown");
                }
            }}
            style={styles.backGround}
        >
            <SafeAreaView>
                <Title
                    LeftNav={{
                        nav: () => navigation.navigate("Settings"),
                        icon: require("../assets/icons/settings.png"),
                    }}
                    RightNav={{
                        nav: () => navigation.navigate("Profile"),
                        icon: require("../assets/icons/account.png"),
                    }}
                    title="Sorted To Do"
                />
            </SafeAreaView>
            <DateDisplay />

            {categories.length === 0 ? (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ ...styles.title, marginTop: 20 }}>
                        Add a Category using the plus!
                    </Text>

                    <View>
                        <Icon
                            icon={require('../assets/icons/add.png')}
                            onPress={() => {
                                navigation.navigate("NewCategory")
                            }}
                        />
                    </View>
                </View>
            ) : (
                <Swiper style={{ height: "100%" }} index={1} loop={false}>
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
                        <SortableTasks navigation={navigation} />
                    </View>
                </Swiper>
            )}
        </View>

    );
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
