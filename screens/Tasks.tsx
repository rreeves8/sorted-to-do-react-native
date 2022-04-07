import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Category } from "../types";

export default function Tasks(props: { category: Category }) {

    return (
        <SafeAreaView>
            <View style={styles.backGround}>
                <Text>{props.category.name}</Text>
                {props.category.tasks.map((element) => {
                    return (
                        <View>
                            <Text>
                                {element.name}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        marginTop: 1,
        left: '85%',
    },
    dateText: {
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
})