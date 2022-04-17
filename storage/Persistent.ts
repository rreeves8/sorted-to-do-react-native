import AsyncStorage from '@react-native-async-storage/async-storage';
import { State, Category, Benefit, Task } from '../types';
import * as SecureStore from 'expo-secure-store';

let initialBenfits = ['Daily Effect', 'Free', 'Priority', 'Earlier-Better', 'Interest', 'School Related', 'Work Related']
let emptyCat = ['School', 'Work', 'Job']

const getData = async (): Promise<State> => {
    const jsonValue = await AsyncStorage.getItem('@tasks')
    let tasks: Array<Task> = [{
        name: "Call Sean",
        benefits: [{
            name: 'Daily Effect',
            ranking: 1
        }],
        completion: false
    }]

    return (jsonValue != null) ? (JSON.parse(jsonValue)) : ({
        categories: emptyCat.map((e: string) => {
            return ({
                name: e,
                tasks: tasks
            })
        }),
        benefits: initialBenfits.map((name: string): Benefit => {
            return ({
                name: name,
                ranking: Math.floor(Math.random() * initialBenfits.length)
            })
        })
    });
}

const clearData = async () => {
    AsyncStorage.clear()
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