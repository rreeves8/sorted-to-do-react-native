import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "react-native-paper";
import Title from "../components/Title";
import { clearData } from "../storage/Persistent";
import * as Updates from 'expo-updates';


export default function Settings({ navigation }: any) {

    return (
        <SafeAreaView>
            <Title
                title={"Settings"}
                RightNav={{
                    nav: require('../assets/icons/arrow-left.png'),
                    icon: "",
                    isImage: undefined
                }}
            />
            <Button
                onPress={async () => {
                    await clearData()
                    await Updates.reloadAsync()
                }}
            >
                <Text>
                    Reset App
                </Text>
            </Button>
        </SafeAreaView>
    )
}