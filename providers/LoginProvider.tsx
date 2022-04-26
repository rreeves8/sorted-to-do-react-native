import React, { useState, createContext, useEffect, useMemo } from 'react'

export const LogInContext = createContext({});

export const LogInProvider = (props: { children: React.ReactNode, isLoggedIn: boolean, setLoggedIn: (isLoggedIn: boolean) => any }) => {
   
    return (
        <LogInContext.Provider value={{ isLoggedIn: props.isLoggedIn, setLoggedIn: props.setLoggedIn }}>
            {props.children}
        </LogInContext.Provider>
    );
};