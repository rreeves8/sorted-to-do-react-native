import * as AppleAuthentication from 'expo-apple-authentication';
import React, { useContext, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, Image, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { LogInContext } from '../providers/LoginProvider';
import { secureStore, logOut } from '../storage/Persistent';

const SignInWithApple = ({ nav }: any) => {
    //@ts-ignore
    const { setLoggedIn } = useContext(LogInContext);

    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={async () => {
                try {
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });
                    secureStore('uuid', { uuid: credential.user })
                    setLoggedIn(true)
                    nav.navigate("Home")
                } catch (e: any) {
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                    } else {
                        // handle other errors
                    }
                }
            }}
        />
    );
}

const User = ({ nav }: any) => {
    //@ts-ignore
    const { setLoggedIn } = useContext(LogInContext);
    const [popUp, setPopUp] = useState(false)

    return (
        <View>
           
            <View>
                <Text>
                    Remove Ads:
                </Text>
                <Text>
                    User Name:
                </Text>
                <Text>
                    Issues?
                </Text>
                <Text>
                    HelpContact:
                </Text>
            </View>
        </View>
    )
}

const Login = ({ nav }: any) => {
    return (
        <View>
            <SignInWithApple />
        </View>
    )
}

export default function Profile({ navigation }: any) {
    //@ts-ignore
    const { isLoggedIn } = useContext(LogInContext);

    return (
        <SafeAreaView>
            {(isLoggedIn) ? <User nav={navigation} /> : <Login nav={navigation} />}
        </SafeAreaView>
    )
}