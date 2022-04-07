import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import store from './storage/Store'
import { getData } from './storage/Persistent';
import { Category, State } from './types';
import Home from "./screens/Home";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tasks from './screens/Tasks';
import NewTasks from './screens/NewTask';
import NewCategory from './screens/NewCategory'


const Stack = createStackNavigator();

const loadData = async () => {
    let savedState: State = await getData()

    store.dispatch({
        type: "loadSaved",
        payload: savedState
    })
    console.log(store.getState())
}

const Root = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Tasks' component={Tasks} />
                <Stack.Screen name='NewTask' component={NewTasks} />
                <Stack.Screen name='NewCategory' component={NewCategory} />
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

