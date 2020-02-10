import { swap } from "../utils/utils"

export const shellSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var i, j, gap

    const steps = []

    for (gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (i = gap; i < n; ++i) {
            for (j = i; j >= gap; j -= gap) {
                steps.push([j - gap, j, false])
                
                if (arr[j - gap] > arr[j]) {
                    steps.push([j - gap, arr[j], true])
                    steps.push([j, arr[j - gap], true])

                    swap(arr, j - gap, j)
                } else {
                    break
                }
            }
        }
    }

    return steps
}
