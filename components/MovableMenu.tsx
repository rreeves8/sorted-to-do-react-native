import React, { useContext, useState, useRef, useMemo } from "react";
import { Animated, PanResponder, View, Text, Image, Pressable, Easing } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../styles/styles";
import { Category } from "../types";
import { CatContext } from "../providers/CategoryProvider";
import { MenuContext } from "../providers/MenuProvider";
import { BlurView } from 'expo-blur';

const CategoryView = (props: { element: Category, nav: any, i: number, setScroll: any }) => {
    const [style, setStyle] = useState(false)
    const [pressed, setPressed] = useState(false)

    return (
        <Pressable
            onPressOut={() => {
                if (pressed) {
                    setPressed(false)
                }
            }}
            onTouchStart={() => {
                setStyle(true)
                setPressed(true)
                props.setScroll(false)
            }}
            onTouchEnd={() => {
                setStyle(false)
                if (pressed) {
                    props.nav.navigate("Tasks", { category: props.element })
                }
                props.setScroll(true)
            }}
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <Text
                style={{
                    color: (style) ? 'lightgrey' : 'black',
                    fontSize: 25,
                    flex: 1,
                    alignSelf: 'center',
                    marginTop: '3%',
                    marginLeft: '5%',
                }}
            >{props.element.name}</Text>
            <Avatar.Icon
                style={{ backgroundColor: 'white', marginRight: '2%', marginTop: '3%' }}
                size={50}
                icon={({ size, color }) => (
                    <Image
                        source={require('../assets/icons/enter.png')}
                        style={{
                            width: size,
                            height: size,
                            tintColor: (style) ? 'lightgrey' : 'black',
                        }}
                    />
                )}
                color="white"
            />
        </Pressable >
    )
}

export default function MovableMenu(props: { i: number, element: Category, nav: any, setScroll: any }) {
    //@ts-ignore
    const { categoryContext, setCategories } = useContext(CatContext);
    const pan = useRef(new Animated.ValueXY()).current;
    /*
    useMemo(() => {
        pan.addListener(() => {
            let y = JSON.parse(JSON.stringify(pan))["y"]
            let region = Math.round(((props.i * 100) + y) / 100)
            console.log(region)

            if (props.i !== region) {
                console.log("flipping")
                let categories: Array<Category> = categoryContext
                console.log(categories)
                let prev = categories[region]
                categories[region] = categories[props.i]
                categories[props.i] = prev
                setCategories(categories)
                console.log(categoryContext)
            }
        })
    }, [])
*/

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (() => {
            return (
                Animated.event([
                    null,
                    { dy: pan.y },
                ], { useNativeDriver: false })
            )
        })(),
        onPanResponderRelease: () => {
            Animated.spring(
                pan, // Auto-multiplexed
                {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                } // Back to zero
            ).start();
        },
    });
    /*
{
                transform: [{
                    translateY: pan.y
                }]
            }
    */

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[{
                marginTop: 25 / 2,
                borderRadius: 5,
                backgroundColor: 'white',
                height: 75,
                marginBottom: 25 / 2
            }, styles.shadowProp,]}
        >
            <CategoryView
                i={props.i}
                nav={props.nav}
                element={props.element}
                setScroll={props.setScroll}
            />
        </Animated.View >
    );
};