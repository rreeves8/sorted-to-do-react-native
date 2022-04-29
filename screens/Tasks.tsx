import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Category, Task } from "../types";
import { Avatar, TextInput, Button, } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TaskContext, TaskProvider } from "../providers/TaskProvider";
import { useIsFocused } from "@react-navigation/native";
import TaskNode from "../components/TaskNode";
import Title from "../components/Title";
import { StyleContext } from "../providers/StyleProvider";


const TaskList = ({ nav, category }: any) => {
    //@ts-ignore
    const { tasks } = useContext(TaskContext);

    return (
        <>
            {(tasks.length === 0) ? (
                <View style = {{ alignSelf: 'center', marginTop: '5%'}}>
                    <Text style ={{ fontFamily: 'SF-Pro'}}>
                        Press the plus to add Tasks!
                    </Text>
                </View>
            ) : (
                <ScrollView>
                    {tasks.map((element: Task, i: number) => {
                        return (
                            <TaskNode
                                key={i}
                                task={element}
                                nav={nav}
                                category={category}
                            />
                        )
                    })}

                </ScrollView>
            )}
        </>
    )
}

export default function Tasks({ route, navigation }: any) {
    const { category } = route.params
    const isFocused = useIsFocused()
    const { styles } = useContext(StyleContext)

    useEffect(() => {
        //update
    }, [isFocused])

    return (
        <TaskProvider
            category={category}
        >
            <SafeAreaView style={styles.backGround}>
                <Title 
                    title={category.name + " Tasks"}
                    LeftNav={{
                        nav: () => navigation.goBack(),
                        icon: require('../assets/icons/arrow-left.png')
                    }}
                    RightNav={{
                        nav: () => navigation.navigate("TaskModifier", { category, type: 'New Task' }),
                        icon: 'plus'
                    }}
                />
                <TaskList 
                    nav={navigation}
                    category={category}
                />
            </SafeAreaView>
        </TaskProvider>
    )
}