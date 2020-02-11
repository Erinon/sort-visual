export const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function generateArray(size) {
    const arr = []
    const fact = 100 / size

    for (var i = 1; i <= size; ++i) {
        arr.push(i * fact)
    }

    return arr
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; --i) {
        swap(arr, i, Math.floor(Math.random() * (i + 1)))
    }

    return arr
}

export const randomArray = (size) => shuffle(generateArray(size));

export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
}
