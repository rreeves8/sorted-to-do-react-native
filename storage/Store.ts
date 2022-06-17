import { createStore } from "redux";
import { Benefit, State, Category, Task } from "../types";
import { storeData } from "./Persistent";

type NewTask = {
    catergoryName: string;
    task: Task;
};

type OldTask = {
    catergoryName: string;
    newTask: Task;
    oldTask: Task;
};

function arrayRemove(arr: Array<any>, value: any) {
    return arr.filter(function (ele) {
        return ele.name != value;
    });
}

type type = "loadSaved" | "setCategories" | "addBenefit" | "addTask" | "saveState" | "editTask" | "newBenefits" | "deleteTask";

const reducer = (
    state: State,
    action: {
        type: type;
        payload: State | OldTask | Array<Category> | Benefit | NewTask | Array<Benefit>;
    }
) => {
    switch (action.type) {
        case "loadSaved":
            state = action.payload as State;
            return state;

        case "setCategories":
            state.categories = action.payload as Array<Category>;
            return state;

        case "addBenefit":
            state.benefits.push(action.payload as Benefit);
            return state;

        case "newBenefits":
            state.benefits = action.payload as Array<Benefit>;

            state.categories.forEach((e: Category) => {
                e.tasks.forEach((t: Task) => {
                    t.benefits.forEach((b: Benefit) => {
                        if (state.benefits.findIndex((e) => e.name === b.name) === -1) {
                            t.benefits = t.benefits.filter((e) => e.name !== b.name);
                        }
                    });
                });
            });
            return state;

        case "addTask":
            let newTask = action.payload as NewTask;
            let i = state.categories.findIndex((e) => e.name === newTask.catergoryName);
            state.categories[i].tasks.push(newTask.task);
            return state;

        case "deleteTask":
            let deleteTask = action.payload as NewTask;
            let l = state.categories.findIndex((e) => e.name === deleteTask.catergoryName);
            state.categories[l].tasks = arrayRemove(state.categories[l].tasks, deleteTask.task.name);
            return state;

        case "editTask":
            let editTask = action.payload as OldTask;
            let i2 = state.categories.findIndex((e) => e.name === editTask.catergoryName);
            let j = state.categories[i2].tasks.findIndex((e) => editTask.oldTask.name === e.name);
            state.categories[i2].tasks[j] = editTask.newTask;
            return state;

        case "saveState":
            storeData(state);
            return state;

        default:
            return state;
    }
};

//@ts-ignore
const store = createStore(reducer);

export default store;
