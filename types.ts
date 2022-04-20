import { ImageSourcePropType } from "react-native"

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
}

type Category = {
    name: string
    tasks: Array<Task>
}

type State = {
    categories: Array<Category>
    benefits: Array<Benefit>
}

type TitleIcon = {
    nav: () => void
    icon: NodeRequire | string
    isImage?: boolean
}

export {
    Task,
    Category,
    Benefit,
    State, 
    TitleIcon
}