import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import Tasks from "./Tasks"
import store from "../storage/Store";
import { Category } from "../types";
import { Avatar } from 'react-native-paper';

const Title = ({ nav }: any) => {
    return (
        <View>
            <Text style={styles.title}>
                Sorted To Do List
            </Text>
            <View style={styles.iconContainer}>
                <Avatar.Icon
                    style={{ backgroundColor: 'black' }}
                    size={50} icon='plus' color="white"
                    onTouchEnd={() => {
                        nav.navigate("NewTask")
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
            <Text style = {styles.dateText}>
                {date.month + " " + date.day}
            </Text>
            <Text style = {styles.dateText}>
                {date.time}
            </Text>

        </View>
    )
}

export default function Home({ navigation }: any) {
    let cateroies: Array<Category> = store.getState()

    return (
        <SafeAreaView style={styles.backGround}>
            <View style={styles.backGround}>
                <Title nav={navigation} />
                <DateDisplay />
                {cateroies.map((element) => {
                    return (
                        <View>
                            <Button
                                title={element.name}
                                onPress={navigation.navigate("Task", { tasks: element.tasks })}
                            />
                        </View>
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

    },
    dateText:{
        color: 'black',
        marginLeft: 20,
        marginTop: 22,
        fontSize: 34
    },
    backGround: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
    title: {
        marginTop: 10,
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center'
    },
    dateContainer: {
        borderRadius: 25,
        backgroundColor: 'white',
        height: 150,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        flexDirection:'column'
    }
})