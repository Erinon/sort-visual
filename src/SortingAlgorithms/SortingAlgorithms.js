import { swap } from "../utils/utils"

export const bubbleSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var sorted = true

    const steps = []

    for (let i = 0; i < n - 1; ++i) {
        sorted = true

        for (let j = 0; j < n - i - 1; ++j) {
            const step = [j, j + 1, false]

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                
                step[2] = true

                sorted = false
            }

            steps.push(step)
        }

        if (sorted) {
            return steps
        }
    }

    return steps
}
