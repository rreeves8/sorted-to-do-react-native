import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import { StyleContext } from "../providers/StyleProvider";
import { Benefit, Category, Task } from "../types";
import Checkbox from 'expo-checkbox';
import store from "../storage/Store";


export default function TaskNode(props: { task: Task, nav: any, category: Category }) {
    const { styles } = useContext(StyleContext)
    const [isChecked, setChecked] = useState(false);

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
            <View style={{ margin: 8 }}>
                <Checkbox
                    style={{ marginLeft: 12, marginRight: 6, height: 25, width: 25, borderColor: props.task.color }}
                    value={isChecked}
                    onValueChange={() => {
                        if (!isChecked) {
                            Alert.alert(
                                "Completed Task",
                                "Would you like to Delete this Task",
                                [{
                                    text: "No",
                                    onPress: () => {
                                        setChecked(true)
                                    }
                                }, {
                                    text: "Yes", onPress: async () => {
                                        store.dispatch({
                                            type: 'deleteTask',
                                            payload: {
                                                catergoryName: props.category.name,
                                                task: props.task
                                            }
                                        })
                                    }
                                }]
                            )
                        }
                        else {
                            setChecked(!isChecked)
                        }
                    }}
                    color={isChecked ? '#4630EB' : undefined}
                />
            </View>
            <Text
                style={{
                    color: 'black',
                    fontSize: 22,
                    flex: 1,
                }}
            >{props.task.name}</Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 15,
                    }}
                >
                    {props.task.benefits.length} Benefits
                </Text>
            </View>

            <Avatar.Icon
                style={{ backgroundColor: 'white', marginRight: '3%' }}
                onTouchEnd={() => {
                    props.nav.navigate('TaskModifier', { task: props.task, category: props.category, type: 'Edit Task' })
                }}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/icons/edit.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: 'black',
                        }}
                    />
                )}
                color="white"
            />
        </TouchableOpacity >
    )
}