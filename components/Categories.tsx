import { useIsFocused } from "@react-navigation/native"
import React, { useState, useEffect, useContext } from "react"
import { View } from "react-native"
import { CatContext } from "../providers/CategoryProvider"
import { MenuProvider } from "../providers/MenuProvider"
import { Category } from "../types"
import MovableMenu from "./MovableMenu"

export default function Categories(props: { nav: any }) {
    //@ts-ignore
    const { categoryContext } = useContext(CatContext);

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"
        }}>
            <MenuProvider>
                {categoryContext.map((element: Category, i: number) => {
                    return (
                        <View
                            key={i}
                            style={{
                                flex: i,
                                width: '90%',
                            }}
                        >
                            <MovableMenu
                                nav={props.nav}
                                i={i}
                                element={element}
                            />
                        </View>
                    )
                })}
            </MenuProvider>
        </View>
    )
}