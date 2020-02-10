import { swap } from "../utils/utils"

export const bubbleSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var i, j, sorted = true

    const steps = []

    for (i = 0; i < n - 1; ++i) {
        sorted = true

        for (j = 0; j < n - i - 1; ++j) {
            steps.push([j, j + 1, false])

            if (arr[j] > arr[j + 1]) {
                steps.push([j, arr[j + 1], true])
                steps.push([j + 1, arr[j], true])

                swap(arr, j, j + 1)

                sorted = false
            }
        }

        if (sorted) {
            return steps
        }
    }

    return steps
}
