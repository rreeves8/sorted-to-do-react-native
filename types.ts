type Benefit = {
    name: string
    ranking: number
}

type Task = {
    name: string
    completion: boolean
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