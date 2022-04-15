import AsyncStorage from '@react-native-async-storage/async-storage';
import { State, Category, Benefit, Task } from '../types';

let initialBenfits = ['Daily Effect', 'Free', 'Priority', 'Earlier-Better', 'Interest', 'School Related', 'Work Related']
let emptyCat = ['School', 'Work', 'Job']

const getData = async (): Promise<State> => {
    const jsonValue = await AsyncStorage.getItem('@tasks')

    return (jsonValue != null) ? (JSON.parse(jsonValue)) : ({
        categories: emptyCat.map((e: string) => {
            return ({
                name: e,
                tasks: new Array<Task>()
            })
        }),
        benefits: initialBenfits.map((name: string): Benefit => {
            return ({
                name: name,
                importance: Math.floor(Math.random() * 11)
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

export { storeData, getData, clearData }