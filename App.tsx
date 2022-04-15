import { StyleSheet, Text, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useMemo, useState } from 'react';
import store from './storage/Store'
import { getData, storeData } from './storage/Persistent';
import { Category, State } from './types';
import Home from "./screens/Home";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tasks from './screens/Tasks';
import NewTasks from './screens/NewTask';
import NewCategory from './screens/NewCategory'
import { useAppState } from '@react-native-community/hooks'

const Stack = createStackNavigator();

const loadData = async () => {
    let savedState: State = await getData()

    store.dispatch({
        type: "loadSaved",
        payload: savedState
    })
}


const Root = () => {
    const currentAppState = useAppState()

    useMemo(() => {
        if (currentAppState !== 'active') {
            let userState: State = store.getState()
            //storeData(userState)
        }
    }, [currentAppState])

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle='dark-content' />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Tasks' component={Tasks} />
                    <Stack.Screen name='NewTask' component={NewTasks} />
                    <Stack.Screen name='NewCategory' component={NewCategory} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
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

