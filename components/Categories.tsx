import { useIsFocused } from "@react-navigation/native"
import React, { useState, useEffect, useContext, useMemo } from "react"
import { Pressable, View, Text, Image, TouchableOpacity, Alert } from "react-native"
import { Avatar } from "react-native-paper"
import { CategoryContext } from "../providers/CategoryProvider"
import { MenuProvider } from "../providers/MenuProvider"
import { Category } from "../types"
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { StyleContext } from "../providers/StyleProvider"

function CategoriesList(props: { nav: any, activationDistance: any }) {
    const { categories, setCategories } = useContext(CategoryContext);
    const { styles } = useContext(StyleContext)
    const [dragging, setDragging] = useState(false)
    const [timeOutHook, setTimeOutHook] = useState<NodeJS.Timeout | null>(null)

    const deleteElement = (item: Category) => {
        let prevCategory: Array<Category> = categories
        let newArr = prevCategory.filter((b: Category) => b.name !== item.name)
        setCategories([...newArr])
    }

    useMemo(() => {
        if (dragging) {
            setTimeOutHook(setTimeout(() => setDragging(false), 4000))
        }
    }, [dragging])


    const RenderItem = ({ item, drag, isActive }: RenderItemParams<Category>) => {
        const [color, setColor] = useState(item.color)
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onPress={() => {
                        if (!dragging) props.nav.navigate("Tasks", { category: item })
                    }}
                    onLongPress={() => {
                        drag()
                        if (!dragging) {
                            setDragging(true)
                        }
                    }}
                    activeOpacity={1}
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
                            fontSize: 22,
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
                        onTouchEnd={() => {
                            if (dragging) {
                                Alert.alert(
                                    "Delete Category?",
                                    "This will delete all tasks associated with it",
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => deleteElement(item) }
                                    ]
                                )

                            }
                        }}
                        icon={({ size, color }) => (dragging) ? (
                            <Image
                                source={require('../assets/icons/trash.png')}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: 'black',
                                }}
                            />
                        ) : (
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
            ListFooterComponent={
                <View
                    style={{
                        borderRadius: 5,
                        height: 100,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 25 / 2
                    }}
                />
            }
            activationDistance={props.activationDistance}
            nestedScrollEnabled={true}
            containerStyle={{ width: '100%' }}
            data={categories}
            onDragEnd={({ data }) => setCategories(data)}
            keyExtractor={(item) => item.name}
            renderItem={RenderItem}
        />
    )
}

export default function Categories({ nav, activationDistance }: any) {
    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ marginLeft: 20, fontSize: 20 }}> Categories </Text>
                <View>
                    <Avatar.Icon
                        style={{
                            backgroundColor: 'transparent',
                            position: 'relative',
                            top: -15,
                            transform: [{ rotateY: '180deg' }],
                            marginRight: 20,
                            zIndex: 1
                        }}
                        size={55}
                        icon='plus'
                        color="black"
                        onTouchEnd={() => {
                            nav.navigate('NewCategory')

                        }}
                    ></Avatar.Icon>
                </View>
            </View>
            <View
                style={{
                    position: 'relative',
                    top: -17,
                    width: '100%',
                    height: '100%'
                }}>
                <CategoriesList
                    nav={nav}
                    activationDistance={activationDistance}
                />

            </View>
        </>
    )
}