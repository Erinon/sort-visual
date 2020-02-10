import { swap } from "../utils/utils"

export const selectionSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var i, j, min_idx

    const steps = []

    for (i = 0; i < n - 1; ++i) {
        min_idx = i

        for (j = i + 1; j < n; ++j) {
            steps.push([j, min_idx, false])

            if (arr[j] < arr[min_idx]) {
                min_idx = j
            }
        }

        steps.push([i, arr[min_idx], true])
        steps.push([min_idx, arr[i], true])

        swap(arr, i, min_idx)
    }

    return steps
}
