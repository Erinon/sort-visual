import { swap } from "../utils/utils"

export const insertionSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var i, j

    const steps = []

    for (i = 1; i < n; ++i) {
        for (j = i - 1; j >= 0; --j) {
            steps.push([j, j + 1, false])

            if (arr[j] > arr[j + 1]) {
                steps.push([j, arr[j + 1], true])
                steps.push([j + 1, arr[j], true])

                swap(arr, j, j + 1)
            } else {
                break
            }
        }
    }

    return steps
}
