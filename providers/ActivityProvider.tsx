import { BlurView } from 'expo-blur';
import React, { useState, createContext, useEffect, useMemo } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type LoadingContextADT = {
    isloading: boolean,
    setLoading: (isloading: boolean) => void
}

export const LoadingContext = React.createContext<LoadingContextADT>({} as LoadingContextADT)

export const ActivityProvider = (props: { children: React.ReactNode }) => {
    const [isloading, setLoading] = useState(true)

    return (
        <LoadingContext.Provider value={{ isloading, setLoading }}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
            <BlurView intensity={100} style={styles.blurContainer}>
                {props.children}
            </BlurView>

        </LoadingContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1
    },

})