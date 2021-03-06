import { ImageSourcePropType, ViewStyle } from "react-native"

type Benefit = {
    name: string
    ranking: number
    color: string
}

type Task = {
    name: string
    completion: boolean
    date?: Date
    benefits: Array<Benefit>
    color: string
}

type Category = {
    name: string
    tasks: Array<Task>
    color: string
}

type State = {
    categories: Array<Category>
    benefits: Array<Benefit>
}

type TitleIcon = {
    nav: () => void
    icon: NodeRequire | string
    style?: ViewStyle 
}

export {
    Task,
    Category,
    Benefit,
    State, 
    TitleIcon
}