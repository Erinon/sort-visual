function merge(arr, l, m, r, steps) {
    var i, j, k
    const n1 = m - l + 1, n2 = r - m
    const L = [], R = []

    for (i = 0; i < n1; ++i) {
        L.push(arr[l + i])
    }
    
    for (j = 0; j < n2; ++j) {
        R.push(arr[m + 1 + j])
    }

    i = 0; j = 0; k = l

    while (i < n1 && j < n2) {
        steps.push([l + i, m + 1 + j, false])

        if (L[i] <= R[j]) {
            steps.push([k, L[i], true])

            arr[k] = L[i]

            ++i
        } else {
            steps.push([k, R[j], true])

            arr[k] = R[j]

            ++j
        }

        ++k
    }

    while (i < n1) {
        steps.push([k, L[i], true])

        arr[k] = L[i]

        ++i
        ++k
    }

    while (j < n2) {
        steps.push([k, R[j], true])

        arr[k] = R[j]

        ++j
        ++k
    }
}

function mergeSort(arr, l, r, steps) {
    if (l < r) {
        const m = Math.floor(l + (r - l) / 2)

        mergeSort(arr, l, m, steps)
        mergeSort(arr, m + 1, r, steps)

        merge(arr, l, m, r, steps)
    }
}

export const mergeSortSteps = array => {
    const steps = []

    mergeSort(array.slice(), 0, array.length - 1, steps)

    return steps
}

export const iterativeMergeSortSteps = array => {
    const arr = array.slice()
    const n = arr.length
    var currSize, leftStart, mid, rightEnd

    const steps = []

    for (currSize = 1; currSize <= n - 1; currSize *= 2) {
        for (leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
            mid = Math.min(leftStart + currSize - 1, n - 1)
            rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1)

            merge(arr, leftStart, mid, rightEnd, steps)
        }
    }

    return steps
}
