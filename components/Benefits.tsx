import React, { useState, useContext, useMemo, useEffect } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { Avatar } from "react-native-paper";
import { Benefit } from "../types";
import store from "../storage/Store";
import { StyleContext } from "../providers/StyleProvider";

const BenefitsList = (props: { activationDistance: any }) => {
    const [benefits, setBenefits] = useState<Array<Benefit>>(store.getState().benefits)
    const { styles } = useContext(StyleContext)
    const [dragging, setDragging] = useState(false)
    const [timeOutHook, setTimeOutHook] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        let newBenfits: Array<Benefit> = benefits.map((benefit: Benefit, i: number) => {
            benefit.ranking = i
            return benefit
        });
        store.dispatch({
            type: "newBenefits",
            payload: newBenfits,
        });

        const unsubscribe = store.subscribe(() => {
            setBenefits(store.getState().benefits);
        });
        return unsubscribe;
    }, [benefits])

    
    useMemo(() => {
        if (dragging) {
            setTimeOutHook(setTimeout(() => setDragging(false), 4000))
        }
    }, [dragging])

    const RenderItem = ({ item, drag, isActive }: RenderItemParams<Benefit>) => {
        const [color, setColor] = useState(item.color)

        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={() => {
                        drag()
                        if (!dragging) {
                            setDragging(true)
                        }
                    }}
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
                            marginLeft: '3%',
                            fontFamily: 'SF-Pro'
                        }}
                    >{item.name}</Text>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 15,
                            alignSelf: 'center',
                            fontFamily: 'SF-Pro'
                        }}
                    >
                        Importance: {item.ranking}
                    </Text>
                    <Avatar.Icon
                        style={{ backgroundColor: 'white', marginRight: '2%', marginTop: '3%' }}
                        size={50}
                        onTouchEnd={() => {
                            if (dragging) {
                                let prevBenefits: Array<Benefit> = benefits
                                let newArr = prevBenefits.filter((b: Benefit) => b.name !== item.name)
                                setBenefits([...newArr])
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
                        height: 150,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 25 / 2
                    }}
                />
            }
            activationDistance={props.activationDistance}
            nestedScrollEnabled={true}
            containerStyle={{ width: '100%' }}
            data={benefits}
            onDragEnd={({ data }) => {
                setBenefits(data)
            }}
            keyExtractor={(item) => item.name}
            renderItem={RenderItem}
        />
    )
}

export default function Benefits({ nav, activationDistance }: any) {    
    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{ marginLeft: 20, fontSize: 20 }}> Benefits </Text>
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
                            nav.navigate('NewBenefit')

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
                    <BenefitsList 
                        activationDistance={activationDistance}
                    />
            </View>
        </>
    )
}