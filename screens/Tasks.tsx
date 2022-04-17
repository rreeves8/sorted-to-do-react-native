import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Category, Task } from "../types";
import { styles } from "../styles/styles";
import { Avatar, TextInput, Button, } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TaskContext, TaskProvider } from "../providers/TaskProvider";
import { useIsFocused } from "@react-navigation/native";

const TaskNode = (props: { task: Task }) => {
    return (
        <TouchableOpacity
            style={[{
                width: '90%',
                display: "flex",
                flexDirection: 'row',
                marginTop: 25 / 2,
                borderRadius: 5,
                backgroundColor: 'white',
                height: 75,
                marginBottom: 25 / 2,
                alignSelf: 'center',
                alignItems: 'center'
            }, styles.shadowProp,]}
        >
            <Text
                style={{
                    color: 'black',
                    fontSize: 25,
                    flex: 1,
                    alignSelf: 'center',
                }}
            >{props.task.name}</Text>
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginRight: '2%'}}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/icons/enter.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: 'black',
                        }}
                    />
                )}
                color="white"
            />
        </TouchableOpacity>
    )
}

const TaskList = () => {
    //@ts-ignore
    const { tasks } = useContext(TaskContext);

    return (
        <>
            {(tasks.length === 0) ? (
                <View>
                    <Text>
                        Press the plus to add Tasks!
                    </Text>
                </View>
            ) : (
                <ScrollView>
                    {tasks.map((element: Task) => {
                        return (
                            <TaskNode
                                task={element}
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

    useEffect(() => {
        //update
    }, [isFocused])

    return (
        <TaskProvider
            category={category}
        >
            <SafeAreaView style={styles.backGround}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar.Icon
                        style={{ backgroundColor: '#F5F5F5', marginLeft: '2%', flex: 0 }}
                        size={50}
                        icon={({ size, color }) => (
                            <Image
                                source={require('../assets/arrow-left.png')}
                                style={{ width: size, height: size, tintColor: color }}
                            />
                        )}
                        color="black"
                        onTouchEnd={() => {
                            navigation.navigate("Home")
                        }}
                    />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 20 }}>
                            {category.name}
                        </Text>
                    </View>
                    <Avatar.Icon
                        style={{ backgroundColor: '#F5F5F5', marginRight: '2%', flex: 0 }}
                        size={50}
                        icon="plus"
                        color="black"
                        onTouchEnd={() => {
                            navigation.navigate("NewTask", { category: category })
                        }}
                    />
                </View>
                <TaskList />
            </SafeAreaView>
        </TaskProvider>
    )
}