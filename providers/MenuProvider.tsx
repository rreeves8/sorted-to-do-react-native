import React, { useState, createContext, useEffect, useMemo } from 'react'

export const MenuContext = createContext({});

export const MenuProvider = (props: { children: React.ReactNode }) => {
    const [selected, setSelected] = useState()

    return (
        <MenuContext.Provider value={{ selected, setSelected }}>
            {props.children}
        </MenuContext.Provider>
    );
};