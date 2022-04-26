import { createStore } from "redux"
import { Benefit, State, Category, Task } from "../types"
import { storeData } from "./Persistent"

type NewTask = {
    catergoryName: string
    task: Task
}

type OldTask ={
    catergoryName: string
    newTask: Task
    oldTask: Task
}

type type = 'loadSaved' | "addCategory" | "addBenefit" | "addTask" | "saveState" | "editTask" | 'newBenefits'

const reducer = (state: State, action: { type: type, payload: State | OldTask | Array<Category> | Benefit | NewTask | Array<Benefit> }) => {
    switch (action.type) {
        case 'loadSaved':
            state = action.payload as State
            return state
        
        case 'addCategory':
            state.categories = action.payload as Array<Category>
            return state
        
        case 'addBenefit':
            state.benefits.push(action.payload as Benefit)
            return state

        case 'newBenefits':
            state.benefits = action.payload as Array<Benefit>
            return state

        case "addTask":
            let newTask = action.payload as NewTask
            let i = state.categories.findIndex(e => e.name === newTask.catergoryName)
            state.categories[i].tasks.push(newTask.task)
            return state

        case "editTask": 
            let editTask = action.payload as OldTask
            let i2 = state.categories.findIndex(e => e.name === editTask.catergoryName)
            let j = state.categories[i2].tasks.findIndex(e => editTask.oldTask.name === e.name)
            state.categories[i2].tasks[j] = editTask.newTask
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