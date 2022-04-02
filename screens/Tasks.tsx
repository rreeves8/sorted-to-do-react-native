import React from "react";
import { View, Text } from "react-native";
import { Task as TaskADT  } from "../types";

export default function Tasks(props: {tasks: Array<TaskADT>}) {

    return(
        <View>
            {props.tasks.map((element) => {
                return (
                    <View>
                        <Text>
                            {element.completion}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}