import { swap } from "../utils/utils"

function partition(arr, l, h, steps) {
    var i = l - 1, j

    for (j = l; j <= h - 1; ++j) {
        steps.push([j, h, false])

        if (arr[j] <= arr[h]) {
            ++i
            
            steps.push([i, arr[j], true])
            steps.push([j, arr[i], true])

            swap(arr, i, j)
        }
    }

    steps.push([i + 1, arr[h], true])
    steps.push([h, arr[i + 1], true])

    swap(arr, i + 1, h)

    return i + 1
}

function quickSort(arr, l, h, steps) {
    if (l < h) {
        const p = partition(arr, l, h, steps)

        quickSort(arr, l, p - 1, steps)
        quickSort(arr, p + 1, h, steps)
    }
}

export const quickSortSteps = array => {
    const steps = []

    quickSort(array.slice(), 0, array.length - 1, steps)

    return steps
}

export const iterativeQuickSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var l = 0, h = n - 1
    const stack = []
    var p

    const steps = []

    stack.push(l)
    stack.push(h)

    while (stack.length > 0) {
        h = stack.pop()
        l = stack.pop();

        p = partition(arr, l, h, steps)

        if (p - 1 > l) {
            stack.push(l)
            stack.push(p - 1)
        }

        if (p + 1 < h) {
            stack.push(p + 1)
            stack.push(h)
        }
    }

    return steps
}
