import { createStore } from "redux"
import { Category } from "../types"

const reducer = (state: Array<Category>, action: { type: string, payload: Array<Category>}) => {
    switch (action.type) {
        case 'loadTasks':
            state = action.payload
            return state

        default:
            return state
    }
}

//@ts-ignore
const store = createStore(reducer);

export default store;