import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Tasks from "./Tasks"
import store from "../storage/Store";
import { Category } from "../types";
import { Avatar, Button } from 'react-native-paper';
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";

const Title = ({ nav }: any) => {
    return (
        <View>
            <Text style={styles.title}>
                Sorted To Do List
            </Text>
            <View style={styles.iconContainer}>
                <Avatar.Icon
                    style={{ backgroundColor: 'white' }}
                    size={50} 
                    icon='plus' 
                    color="black"
                    onTouchEnd={() => {
                        nav.navigate("NewCategory")
                    }}
                />
            </View>
        </View>
    )
}

const DateDisplay = () => {
    let dateObj = new Date()

    let months = [
        "January",
        "Febuary",
        "March",
        "April"
    ]

    let date = {
        month: months[dateObj.getMonth()],
        day: dateObj.getDate(),
        time: ((dateObj.getHours() > 12) ? (dateObj.getHours() - 12) : (dateObj.getHours())) + ":" + dateObj.getMinutes()
    }

    return (
        <View style={styles.dateContainer}>
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
    let cateroies: Array<Category> = store.getState().categories
    const isFocused = useIsFocused()

    useEffect(() => {
        //update on change
    }, [isFocused])

    return (
        <SafeAreaView style={styles.backGround}>
            <View style={styles.backGround}>
                <Title nav={navigation} />
                <DateDisplay />
                {cateroies.map((element: Category, i: number ) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[{
                                borderRadius: 5,
                                backgroundColor: '#D5D5D5',
                                height: 64,
                                marginTop: 30,
                                marginLeft: 20,
                                marginRight: 20,
                                display: 'flex',
                                flexDirection: 'row'
                            },  styles.shadowProp]}
                            onPress={() => navigation.navigate("Tasks", { category: element })}
                        >
                            <Text style={{ color: 'white' }}>{element.name}</Text>
                            <Avatar.Icon
                                style={{ backgroundColor: 'lightgrey'}}
                                size={50} 
                                icon={({ size, color }) => (
                                    <Image
                                        source={require('../assets/icons/view_headline.png')}
                                        style={{ width: size, height: size, tintColor: color }}
                                    />
                                )} 
                                color="white"
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        marginTop: 1,
        left: '85%',
        backgroundColor: 'white'
    },
    dateText: {
        color: 'black',
        marginLeft: 20,
        marginTop: 22,
        fontSize: 34
    },
    backGround: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    title: {
        marginTop: 10,
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },
    dateContainer: {
        borderRadius: 25,
        backgroundColor: 'blue',
        height: 150,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }
})