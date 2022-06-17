import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Category, Task } from "../types";
import { Avatar, TextInput, Button } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import TaskNode from "../components/TaskNode";
import Title from "../components/Title";
import { StyleContext } from "../providers/StyleProvider";
import store from "../storage/Store";

const getTasks = (category: Category) => {
    let categories = store.getState().categories;
    let index = categories.findIndex((e) => e.name === category.name);
    return categories[index].tasks;
};

const TaskList = ({ nav, category }: any) => {
    const [tasks, setTasks] = useState(getTasks(category));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setTasks(getTasks(category));
        });
        return unsubscribe;
    }, []);

    return (
        <>
            {tasks.length === 0 ? (
                <View style={{ alignSelf: "center", marginTop: "5%" }}>
                    <Text style={{ fontFamily: "SF-Pro" }}>Press the plus to add Tasks!</Text>
                </View>
            ) : (
                <ScrollView>
                    {tasks.map((element: Task, i: number) => {
                        return <TaskNode key={i} task={element} nav={nav} category={category} />;
                    })}
                </ScrollView>
            )}
        </>
    );
};

export default function Tasks({ route, navigation }: any) {
    const { category } = route.params;
    const isFocused = useIsFocused();
    const { styles } = useContext(StyleContext);

    useEffect(() => {
        //update
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.backGround}>
            <Title
                title={category.name + " Tasks"}
                LeftNav={{
                    nav: () => navigation.goBack(),
                    icon: require("../assets/icons/arrow-left.png"),
                }}
                RightNav={{
                    nav: () => navigation.navigate("TaskModifier", { category, type: "New Task" }),
                    icon: "plus",
                }}
            />
            <TaskList nav={navigation} category={category} />
        </SafeAreaView>
    );
}
