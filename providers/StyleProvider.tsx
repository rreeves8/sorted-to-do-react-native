import React, { useState, useMemo } from 'react'
import store from '../storage/Store'
import { Benefit } from '../types'
import { getStyle, RandomColor } from '../styles/styles'

type StyleContextADT = {
    theme: string
    setTheme: (value: 'light' | 'dark') => void,
    styles: any
    getRandomColor: (mode?: string, reset?: boolean) => string
}

export const StyleContext = React.createContext<StyleContextADT>({} as StyleContextADT)

export const StyleProvider = (props: { theme: 'light' | 'dark', children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(props.theme)
    const [styles, setStyle] = useState()
    const [colors, setColors] = useState(new RandomColor())

    const getRandomColor = (mode?: string, reset?: boolean): string => {
        if (reset) {
            setColors(new RandomColor())
            return colors.getColor((mode === 'light') ? 'light' : 'dark')
        }
        else {
            return colors.getColor((mode === 'light') ? 'light' : 'dark')
        }
    }

    useMemo(() => {
        setStyle(getStyle(theme))
    }, [theme])

    return (
        <StyleContext.Provider value={{ theme, setTheme, styles, getRandomColor }}>
            {props.children}
        </StyleContext.Provider>
    )
}