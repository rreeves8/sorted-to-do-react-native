import { mdiFlashRedEye } from '@mdi/js';
import { BlurView } from 'expo-blur';
import React, { useState, createContext, useEffect, useMemo } from 'react'
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';

type LoadingContextADT = {
    isloading: boolean,
    setLoading: (isloading: boolean) => void
}

export const LoadingContext = React.createContext<LoadingContextADT>({} as LoadingContextADT)

export const ActivityProvider = (props: { children: React.ReactNode }) => {
    const [isloading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isloading, setLoading }}>
            <View style={styles.container}>
                <ActivityIndicator animating={isloading} size="large" color="#00ff00" />
            </View>
            {isloading ? (
                <BlurView intensity={0}>
                    {props.children}
                </BlurView>
            ) : (
                props.children
            )}


        </LoadingContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1
    }
})