import { useIsFocused } from "@react-navigation/native"
import React, { useState, useEffect, useContext } from "react"
import { Pressable, View, Text, Image, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-paper"
import { CatContext } from "../providers/CategoryProvider"
import { MenuProvider } from "../providers/MenuProvider"
import { Category } from "../types"
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { styles } from "../styles/styles"
import { black } from "react-native-paper/lib/typescript/styles/colors"

const randoColor = () => {
    let bgColor = [
        'red',
        'blue',
        'green',
        'orange',
        'yellow',
        'purple'
    ]
    return bgColor[Math.floor(Math.random() * bgColor.length)];
}

export default function Categories(props: { nav: any, activationDistance: any }) {
    //@ts-ignore
    const { categoryContext, setCategories } = useContext(CatContext);

    const RenderItem = ({ item, drag, isActive }: RenderItemParams<Category>) => {
        const [color, setColor] = useState(randoColor())
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onPress={() => {
                        props.nav.navigate("Tasks", { category: item })
                    }}
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 25 / 2,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        height: 75,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 25 / 2,
                        ...styles.shadowProp
                    }}
                >
                    <View
                        style={{ 
                            width: 40,
                            height: 40,
                            backgroundColor: 'white',  
                            marginLeft: '3.5%', 
                            borderColor: color, 
                            borderWidth: 7, 
                            alignSelf: 'center', 
                            flex: 0,
                            borderRadius: 20
                        }}
                    />
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 25,
                            flex: 1,
                            alignSelf: 'center',
                            marginLeft: '3%'
          
                        }}
                    >{item.name}</Text>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 15,
                            alignSelf: 'center',
                        }}
                    >
                        {item.tasks.length} Tasks
                    </Text>
                    <Avatar.Icon
                        style={{ backgroundColor: 'white', marginRight: '2%', marginTop: '3%' }}
                        size={50}
                        icon={({ size, color }) => (
                            <Image
                                source={require('../assets/icons/drag.png')}
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
            </ScaleDecorator>
        )
    }

    return (
        <DraggableFlatList
            activationDistance={props.activationDistance}
            nestedScrollEnabled={true}
            containerStyle={{ height: '100%', width: '100%' }}
            data={categoryContext}
            onDragEnd={({ data }) => setCategories(data)}
            keyExtractor={(item) => item.name}
            renderItem={RenderItem}
        />
    )
}