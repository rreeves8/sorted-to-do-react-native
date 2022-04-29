import React, { useContext } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import Title from "../components/Title";
import { clearData } from "../storage/Persistent";
import * as Updates from 'expo-updates';
import { LoadingContext } from "../providers/ActivityProvider";

export default function Settings({ navigation }: any) {
    const { setLoading } = useContext(LoadingContext)
    
    return (
        <SafeAreaView>
            <Title
                title={"Settings"}
                RightNav={{
                    nav: () => navigation.goBack(),
                    icon: require('../assets/icons/arrow-right.png'),

                }}
            />
            <Button
                onPress={() => {
                    Alert.alert(
                        "Resest App",
                        "This will delete all saved data",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "OK", onPress: async () => {
                                    setLoading(true)
                                    await clearData()
                                    await Updates.reloadAsync()
                                }
                            }
                        ]
                    )
                }}

            >
                <Text>
                    Reset App
                </Text>
            </Button>
        </SafeAreaView>
    )
}