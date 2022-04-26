import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { Avatar } from "react-native-paper";
import { StyleContext } from "../providers/StyleProvider";
import { Category, Task } from "../types";
import Checkbox from 'expo-checkbox';

export default function TaskNode(props: { task: Task, nav: any, category: Category }) {
    const { styles, getRandomColor } = useContext(StyleContext)
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
            <View style={{ margin: 8}}>
                <Checkbox
                    style={{ marginLeft: 12, marginRight: 12, height: 25, width: 25, borderColor: getRandomColor('dark') }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
            </View>
            <Text
                style={{
                    color: 'black',
                    fontSize: 25,
                    flex: 1,
                }}
            >{props.task.name}</Text>
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginRight: '3%' }}
                onTouchEnd={() => {
                    props.nav.navigate('EditTask', { task: props.task, category: props.category })
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
        </TouchableOpacity>
    )
}