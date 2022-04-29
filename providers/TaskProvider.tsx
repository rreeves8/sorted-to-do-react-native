import React, { useState, createContext, useEffect, useMemo } from 'react'
import store from '../storage/Store';
import { Category } from '../types';

export const TaskContext = createContext({});

export const TaskProvider = (props: { children: React.ReactNode, category: Category }) => {
    const [tasks, setTasks] = useState((() => {
        let categories = store.getState().categories
        let index = categories.findIndex(e => e.name === props.category.name)
        return categories[index].tasks
    })());

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {props.children}
        </TaskContext.Provider>
    );
}