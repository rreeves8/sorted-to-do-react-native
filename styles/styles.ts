import { StyleSheet } from "react-native"
var iosColors = require('../assets/iosColors.json')

const fetchColor = (mode: 'light' | 'dark', light: string, dark: string) => {
    return (mode === 'light') ? light : dark
}

export { iosColors }

export const getStyle = (mode: 'light' | 'dark'): any => {
    return StyleSheet.create({
        iconContainer: {
            backgroundColor: fetchColor(mode, '#F5F5F5', 'black')
        },
        dateText: {
            color: 'white'
        },
        backGround: {
            backgroundColor: fetchColor(mode, '#F5F5F5', 'black'),
            flex: 1,
        },
        title: {
            color: fetchColor(mode, 'black', 'white'),
        },
        dateContainer: {
            backgroundColor: '#0c31b6',
        },
        text: {
            color: fetchColor(mode, 'black', 'white'),
        },
        shadowProp: {
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
        },
        dropDown: {
            backgroundColor: iosColors.System.gray3['dark']
        },
        dropDownText: {
            fontSize: 20,
            color: 'white'
        }
    })
}

export class RandomColor {
    Colors: Array<any>

    constructor() {
        var keys = Object.keys(iosColors);
        
        this.Colors = keys.filter((e: any) => e !== 'System').map((e: any) => {
            return iosColors[e]
        })
    }

    getColor = (mode: 'light' | 'dark') => {
        return this.Colors[Math.floor(Math.random() * this.Colors.length)][mode];
    }
}