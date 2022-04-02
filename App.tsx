import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import store from './storage/Store'
import { getData } from './storage/Persistent';
import { Category } from './types';
import Home from "./screens/Home";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tasks from './screens/Tasks';
import NewTasks from './screens/NewTask';

const Stack = createStackNavigator();

const loadData = async () => {
    let tasks = await getData()

    if (tasks === null) {
        tasks = new Array<Category>()
    }

    store.dispatch({
        type: "loadTasks",
        payload: tasks
    })
}

const Root = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Tasks' component={Tasks} />
                <Stack.Screen name='NewTask' component={NewTasks} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    const [loaded, setLoaded] = useState(false)

    return (
        <>
            {loaded ? (
                <Root />
            ) : (
                <AppLoading
                    startAsync={loadData}
                    onFinish={() => setLoaded(true)}
                    onError={console.warn}
                />
            )}
        </>
    );
}

