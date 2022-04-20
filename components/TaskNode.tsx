import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../styles/styles";
import { Category, Task } from "../types";

export default function TaskNode(props: { task: Task, nav: any, category: Category }) {
    return (
        <TouchableOpacity
            onPress={() => {
                props.nav.navigate('EditTask', { task: props.task, category: props.category})
            }}
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
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginLeft: '2%' }}
                size={60}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/icons/x_circle.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: 'black',
                        }}
                    />
                )}
                color="white"
            />
            <Text
                style={{
                    color: 'black',
                    fontSize: 25,
                    flex: 1,
                }}
            >{props.task.name}</Text>
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginLeft: '2%' }}
                size={60}
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
        </TouchableOpacity>
    )
}