let x = [new Array(5).fill(2), new Array(3).fill(1)]

console.log(x)

x.sort((a, b) => {
    return a.length - b.length
})

console.log(x)