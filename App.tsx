import { StyleSheet, Text, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useContext, useEffect, useMemo, useState } from 'react';
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
import Profile from './screens/Profile';
import { LogInContext, LogInProvider } from './providers/LoginProvider';
import { secureFetch } from './storage/Persistent';
import * as AppleAuthentication from 'expo-apple-authentication';

const Stack = createStackNavigator();

const loadData = async (setLoggedIn: any) => {
    let savedState: State = await getData()

    store.dispatch({
        type: "loadSaved",
        payload: savedState
    })

    try {
        let uuid = await secureFetch()
        let response = await AppleAuthentication.getCredentialStateAsync(uuid)
        console.log(response)
        setLoggedIn((response === 1) ? true : false)
    }
    catch {
        setLoggedIn(false)
    }
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
                    <Stack.Screen name="Profile" component={Profile} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

const LogInExchange = () => {
    const [loaded, setLoaded] = useState(false)
    //@ts-ignore
    const { setLoggedIn } = useContext(LogInContext);

    return (
        <>
            {loaded ? (
                <Root />
            ) : (
                <AppLoading
                    startAsync={async () => await loadData(setLoggedIn)}
                    onFinish={() => setLoaded(true)}
                    onError={console.warn}
                />
            )}
        </>
    );
}

export default function App() {
    return (
        <LogInProvider>
            <LogInExchange />
        </LogInProvider>
    )
}

