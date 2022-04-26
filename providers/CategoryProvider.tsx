import React, { useState, createContext, useEffect, useMemo } from 'react'
import store from '../storage/Store';

export const CatContext = createContext({});

export const CategoryProvider = (props: { children: React.ReactNode }) => {
    const [categoryContext, setCategories] = useState(store.getState().categories);

    useMemo(()=> {
        store.dispatch({
            type: 'addCategory',
            payload: categoryContext
        })
    }, [categoryContext])

    return (
        <CatContext.Provider value={{ categoryContext, setCategories }}>
            {props.children}
        </CatContext.Provider>
    );
};