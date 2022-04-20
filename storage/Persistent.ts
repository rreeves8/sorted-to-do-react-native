import AsyncStorage from '@react-native-async-storage/async-storage';
import { State, Category, Benefit, Task } from '../types';
import * as SecureStore from 'expo-secure-store';
import { randomColor } from '../styles/styles'

let initialBenfits = ['Daily Effect', 'Free', 'Priority', 'Earlier-Better', 'Interest', 'School Related', 'Work Related']
let emptyCat = ['Misc']

const getData = async (): Promise<State> => {
    const jsonValue = await AsyncStorage.getItem('@tasks')

    return (jsonValue != null) ? (JSON.parse(jsonValue)) : ({
        categories: emptyCat.map((e: string): Category => {
            return {
                name: e,
                tasks: new Array<Task>()
            }
        }),
        benefits: initialBenfits.map((name: string): Benefit => {
            console.log(randomColor())
            return ({
                name: name,
                ranking: Math.floor(Math.random() * initialBenfits.length),
                color: randomColor()
            })
        })
    });
}

const clearData = async () => {
    await AsyncStorage.clear()
    await SecureStore.deleteItemAsync('-')
}

const storeData = async (value: State) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@tasks', jsonValue)
    } catch (e) {
        // saving error
    }
}

const secureStore = async (uuid: any) => {
    await SecureStore.setItemAsync('-', uuid);
}

const logOut = async () => {
    await SecureStore.deleteItemAsync('-')
}

const secureFetch = async () => {
    let result = await SecureStore.getItemAsync('-');
    if (result) {
        return result
    } else {
        throw new Error()
    }
}

export { storeData, getData, clearData, secureFetch, secureStore, logOut }