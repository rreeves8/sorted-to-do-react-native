type Benefit = string

type Task = {
    completion: boolean
    description: string
    benefits: Array<Benefit>
}

type Category = {
    name: string
    tasks: Array<Task>
}

export {
    Task,
    Category,
    Benefit
}