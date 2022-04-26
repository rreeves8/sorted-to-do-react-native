import AsyncStorage from '@react-native-async-storage/async-storage';
import { State, Category, Benefit, Task } from '../types';
import * as SecureStore from 'expo-secure-store';
import { RandomColor } from '../styles/styles'

let initialBenfits = ['Daily Effect', 'Priority', 'Earlier-Better', 'Interest', 'School Related', 'Work Related']
let emptyCat = ['Misc']

const getData = async (): Promise<State> => {
    const jsonValue = await AsyncStorage.getItem('@tasks')
    let random = new RandomColor()

    return (jsonValue != null) ? (JSON.parse(jsonValue)) : ({
        categories: emptyCat.map((e: string): Category => {
            return {
                name: e,
                tasks: new Array<Task>(),
                color: random.getColor('dark')
            }
        }),
        benefits: initialBenfits.map((name: string, i: number): Benefit => {
            return ({
                name: name,
                ranking: i + 1,
                color: random.getColor('dark')
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

const secureStore = async (item: 'uuid' | 'isFaceID', data: { uuid?: any, isFaceID?: boolean}) => {
    await SecureStore.setItemAsync(item, (data.uuid) ? data.uuid : JSON.stringify(data.isFaceID))
}

const logOut = async () => {
    await SecureStore.deleteItemAsync('-')
}

const secureFetch = async (item: 'uuid' | 'isFaceID'): Promise<string | boolean> => {
    let result = await SecureStore.getItemAsync(item);
    if (result) {
        return (item === 'uuid') ? result : JSON.parse(result)
    } else {
        throw new Error()
    }
}

export { storeData, getData, clearData, secureFetch, secureStore, logOut }