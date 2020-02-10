import { swap } from "../utils/utils"

function partition(arr, l, h) {
    var i = l - 1, j
    const steps = []

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

    return [i + 1, steps]
}

function quickSort(arr, l, h) {
    const steps = []

    if (l < h) {
        const [p, s] = partition(arr, l, h)

        steps.push(...s)

        steps.push(...quickSort(arr, l, p - 1))
        steps.push(...quickSort(arr, p + 1, h))
    }

    return steps
}

export const quickSortSteps = array => {
    const arr = array.slice()
    const n = arr.length

    return quickSort(arr, 0, n - 1)
}

export const iterativeQuickSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var l = 0, h = n - 1
    const stack = []
    var p, s

    const steps = []

    stack.push(l)
    stack.push(h)

    while (stack.length > 0) {
        h = stack.pop()
        l = stack.pop();

        [p, s] = partition(arr, l, h)

        steps.push(...s)

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
