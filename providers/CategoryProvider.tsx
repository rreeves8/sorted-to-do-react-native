import React, { useState, createContext, useEffect, useMemo } from 'react'
import store from '../storage/Store';
import { Category } from '../types';

type CatContextADT = {
    categories: Array<Category>
    setCategories: (e: Array<Category>) => void
}

export const CategoryContext = React.createContext<CatContextADT>({} as CatContextADT)

export const CategoryProvider = (props: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState(store.getState().categories);

    useMemo(()=> {
        store.dispatch({
            type: 'addCategory',
            payload: categories
        })
    }, [categories])

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};