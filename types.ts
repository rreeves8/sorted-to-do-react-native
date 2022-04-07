type Benefit = {
    name: string
    importance: number
}

type Task = {
    name: string
    completion: boolean
    description: string
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

export {
    Task,
    Category,
    Benefit,
    State
}