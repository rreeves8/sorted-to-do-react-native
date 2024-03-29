import { BackHandler, Text, StatusBar, Appearance, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import store from "./storage/Store";
import { getData, storeData } from "./storage/Persistent";
import { Category, State } from "./types";
import Home from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tasks from "./screens/Tasks";
import TaskModifier from "./screens/TaskModifier";
import NewCategory from "./screens/NewCategory";
import { useAppState } from "@react-native-community/hooks";
import Profile from "./screens/Profile";
import { LogInContext, LogInProvider } from "./providers/LoginProvider";
import { secureFetch } from "./storage/Persistent";
import Settings from "./screens/Settings";
import NewBenefit from "./screens/NewBenefit";
import { StyleProvider } from "./providers/StyleProvider";
import * as Font from "expo-font";
import {
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync,
} from "expo-local-authentication";
import { ActivityProvider } from "./providers/ActivityProvider";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const loadData = async () => {
    console.log("loadData");
    let savedState: State = await getData();

    store.dispatch({
        type: "loadSaved",
        payload: savedState,
    });

    console.log("done data");
};

const isFaceID = async () => {
    try {
        let isFaceID = (await secureFetch("isFaceID")) as boolean;

        if (isFaceID) {
            const result = await authenticateAsync();

            if (!result.success) {
                BackHandler.exitApp();
            }
        }
    } catch {
        throw new Error();
    }
};


const Root = () => {
    const currentAppState = useAppState();

    useMemo(() => {
        if (currentAppState !== "active") {
            let userState: State = store.getState();
            storeData(userState);
            console.log("saving");
        }
    }, [currentAppState]);

    const getTheme = (): "light" | "dark" => {
        const theme = Appearance.getColorScheme();
        /*
        if (theme === null) {
            return 'light'
        }
        else {
            return theme!
        }
        */
        return "light";
    };

    return (
        <StyleProvider theme={getTheme()}>
            <ActivityProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    barStyle="dark-content"
                />
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen
                            name="NewBenefit"
                            component={NewBenefit}
                        />
                        <Stack.Screen name="Tasks" component={Tasks} />
                        <Stack.Screen
                            name="TaskModifier"
                            component={TaskModifier}
                        />
                        <Stack.Screen
                            name="NewCategory"
                            component={NewCategory}
                        />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen
                            name="Settings"
                            component={Settings}
                            options={{
                                gestureDirection: "horizontal-inverted",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ActivityProvider>
        </StyleProvider>
    );
};

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

    const preparables = () => {
        return Promise.all([
            loadData(),
            Font.loadAsync({
                "SF-Pro": require("./assets/fonts/SF-Pro.ttf"),
            })
        ])
    }

    useEffect(() => {
        (async () => {
            try {
                await preparables()
            }
            catch (e) {
                console.warn(e);
            }
            finally {
                setLoaded(true);
            }
        })();

    }, []);

    useLayoutEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded])

    return !loaded ? null : (
        <LogInProvider
            isLoggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
        >
            <Root />
        </LogInProvider>
    )

}
