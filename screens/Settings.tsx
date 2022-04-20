import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { clearData } from "../storage/Persistent";

export default function Settings({ navigation }: any) {

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Im settings
                </Text>
                <Button
                    onPress={async () => {
                        await clearData()
                        navigation.navigate("Home")
                    }}
                >
                    <Text>
                        Reset App
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}