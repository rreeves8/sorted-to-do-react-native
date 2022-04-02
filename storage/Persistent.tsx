import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../types';

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@tasks')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

const storeData = async (value : Array<Category>)  => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@tasks', jsonValue)
    } catch (e) {
        // saving error
    }
}

export { storeData, getData }