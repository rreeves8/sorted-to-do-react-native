import React, { SyntheticEvent, useContext, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import { StyleContext } from "../providers/StyleProvider";
import { Benefit, Category, Task } from "../types";
import Checkbox from "expo-checkbox";
import store from "../storage/Store";

export default function TaskNode(props: { task: Task; nav: any; category: Category }) {
    const { styles } = useContext(StyleContext);
    const [isChecked, setChecked] = useState(false);

    console.log(typeof props.task.date)

    return (
        <TouchableOpacity
            style={[
                {
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 25 / 2,
                    borderRadius: 5,
                    backgroundColor: "white",
                    height: 75,
                    marginBottom: 25 / 2,
                    alignSelf: "center",
                    alignItems: "center",
                },
                styles.shadowProp,
            ]}
        >
            <Checkbox
                style={{
                    height: 25,
                    width: 25,
                    borderColor: props.task.color,
                }}
                value={isChecked}
                onValueChange={() => {
                    if (!isChecked) {
                        Alert.alert("Completed Task", "Would you like to Delete this Task", [
                            {
                                text: "No",
                                onPress: () => {
                                    setChecked(true);
                                },
                            },
                            {
                                text: "Yes",
                                onPress: async () => {
                                    console.log("deleting task");
                                    store.dispatch({
                                        type: "deleteTask",
                                        payload: {
                                            catergoryName: props.category.name,
                                            task: props.task,
                                        },
                                    });
                                },
                            },
                        ]);
                    } else {
                        setChecked(!isChecked);
                    }
                }}
                color={isChecked ? "#4630EB" : undefined}
            />

            <Text
                style={{
                    color: "black",
                    fontSize: 18,

                }}
            >
                {props.task.name}
            </Text>
            {props.task.date ? (
                <Text
                    style={{
                        color: "black",
                        fontSize: 18,

                    }}
                >
                    {(props.task.date.split('T'))}
                </Text>
            ) : (<></>)}

            <Text
                style={{
                    color: "black",
                    fontSize: 13,
                }}
            >
                {props.task.benefits.length} Benefits
            </Text>

            <Avatar.Icon
                style={{ backgroundColor: "white", marginRight: "3%" }}
                onTouchEnd={() => {
                    props.nav.navigate("TaskModifier", {
                        task: props.task,
                        category: props.category,
                        type: "Edit Task",
                    });
                }}
                size={40}
                icon={({ size, color }) => (
                    <Image
                        source={require("../assets/icons/edit.png")}
                        style={{
                            width: size,
                            height: size,
                            tintColor: "black",
                        }}
                    />
                )}
                color="white"
            />
        </TouchableOpacity>
    );
}
