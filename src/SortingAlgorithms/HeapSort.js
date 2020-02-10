import { swap } from "../utils/utils"

function heapify(arr, n, i, steps) {
    const l = 2 * i + 1, r = 2 * i + 2
    var largest = i

    if (l < n) {
        steps.push([l, largest, false])

        if (arr[l] > arr[largest]) {
            largest = l
        }
    }

    if (r < n) {
        steps.push([r, largest, false])

        if (arr[r] > arr[largest]) {
            largest = r
        }
    }

    if (largest !== i) {
        steps.push([i, arr[largest], true])
        steps.push([largest, arr[i], true])

        swap(arr, i, largest)

        heapify(arr, n, largest, steps)
    }
}

export const heapSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var i

    const steps = []

    for (i = Math.floor(n / 2 - 1); i >= 0; --i) {
        heapify(arr, n, i, steps)
    }

    for (i = n - 1; i >= 0; --i) {
        steps.push([0, arr[i], true])
        steps.push([i, arr[0], true])

        swap(arr, 0, i)

        heapify(arr, i, 0, steps)
    }

    return steps
}
