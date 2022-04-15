import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Category, Task } from "../types";
import { styles } from "../styles/styles";
import { Avatar, TextInput, Button, } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";

const TaskList = (props: { task: Task }) => {
   
    return (
        <TouchableOpacity
            style={[{
                marginTop: 25 / 2,
                borderRadius: 5,
                backgroundColor: 'white',
                height: 75,
                marginBottom: 25 / 2
            }, styles.shadowProp,]}
        >
            <Text
                style={{
                    color:  'black',
                    fontSize: 25,
                    flex: 1,
                    alignSelf: 'center',
                    marginTop: '3%',
                    marginLeft: '5%',
                }}
            >{props.task.name}</Text>
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginRight: '2%', marginTop: '3%' }}
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

export default function Tasks({ route, navigation }: any) {
    const { category } = route.params

    return (
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
                        navigation.navigate("NewTask", {category: category})
                    }}
                />
            </View>


            {category.tasks.map((element: Task) => {
                return (
                    <TaskList
                        task={element}
                    />
                )
            })}
        </SafeAreaView>
    )
}