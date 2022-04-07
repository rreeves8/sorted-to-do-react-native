import { createStore } from "redux"
import { Benefit, State, Category, Task } from "../types"
import { storeData } from "./Persistent"

type NewTask = {
    catergoryName: string
    task: Task
}

type type = 'loadSaved' | "addCategory" | "addBenefit" | "addTask" | "saveState"

const reducer = (state: State, action: { type: type, payload: State | Category | Benefit | NewTask }) => {
    switch (action.type) {
        case 'loadSaved':
            state = action.payload as State
            return state
        
        case 'addCategory':
            state.categories.push(action.payload as Category)
            return state
        
        case 'addBenefit':
            state.benefits.push(action.payload as Benefit)
            return state

        case "addTask":
            let newTask = action.payload as NewTask
            let i = state.categories.findIndex(e => e.name === newTask.catergoryName)
            state.categories[i].tasks.push(newTask.task)
            return state

        case 'saveState':
            storeData(state)
            return state
        
        default:
            return state
    }
}

//@ts-ignore
const store = createStore(reducer);

export default store;