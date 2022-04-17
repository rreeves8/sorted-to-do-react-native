import React, { useState, createContext, useEffect, useMemo } from 'react'

export const LogInContext = createContext({});

export const LogInProvider = (props: { children: React.ReactNode }) => {
    const [isLoggedIn, setLoggedIn] = useState(false)

    return (
        <LogInContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {props.children}
        </LogInContext.Provider>
    );
};