import React from 'react'
import './SortingVisualizer.css'
import { bubbleSortSteps } from '../SortingAlgorithms/BubbleSort'
import { insertionSortSteps } from '../SortingAlgorithms/InsertionSort'
import { selectionSortSteps } from '../SortingAlgorithms/SelectionSort'
import { shellSortSteps } from '../SortingAlgorithms/ShellSort'
import { mergeSortSteps, iterativeMergeSortSteps } from '../SortingAlgorithms/MergeSort'
import { quickSortSteps, iterativeQuickSortSteps } from '../SortingAlgorithms/QuickSort'
import { heapSortSteps } from '../SortingAlgorithms/HeapSort'

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arr: []
        }
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        const arr = this.randomArray(this.props.len)
        this.setState({arr})
    }

    randomArray(size) {
        return this.shuffle(Array.from(Array(size), (e, i) => 100 * (i + 1) / (size)))
    }

    shuffle(arr) {
        var j = 0
        var temp = 0

        for (let i = arr.length - 1; i > 0; --i) {
            j = Math.floor(Math.random() * (i + 1))
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }

        return arr
    }

    sortAnim(steps) {
        const {arr} = this.state
        const arrBars = document.getElementsByClassName('arr-bar')
        var iCol, jCol, cnt = 0

        console.log(`${steps.length} steps`)
        
        steps.forEach(s => {
            const [i, j, c] = s

            if (c) {
                ++cnt;
                setTimeout(() => {
                    arr[i] = j

                    arrBars[i].style.height = `${j}%`
                }, cnt * 1)
            } else {
                ++cnt;
                setTimeout(() => {
                    if (arr[i] > arr[j]) {
                        iCol = 'green'
                        jCol = 'red'
                    } else {
                        iCol = 'red'
                        jCol = 'green'
                    }
    
                    arrBars[i].style.backgroundColor = iCol
                    arrBars[j].style.backgroundColor = jCol
                }, cnt * 1)

                ++cnt;
                setTimeout(() => {
                    arrBars[i].style.backgroundColor = 'pink'
                    arrBars[j].style.backgroundColor = 'pink'
                }, cnt * 1)
            }
        })
    }

    render() {
        const len = this.props.len

        return (
            <div>
                <div className='arr-container'>
                    {this.state.arr.map((value, index) =>
                    <div className='arr-bar' key={index} style={{height: `${value}%`, width: `${100 / len}%`}}/>
                    )}
                </div>
                
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.sortAnim(bubbleSortSteps(this.state.arr))}>Bubble Sort</button>
                <button onClick={() => this.sortAnim(insertionSortSteps(this.state.arr))}>Insertion Sort</button>
                <button onClick={() => this.sortAnim(selectionSortSteps(this.state.arr))}>Selection Sort</button>
                <button onClick={() => this.sortAnim(shellSortSteps(this.state.arr))}>Shell Sort</button>
                <button onClick={() => this.sortAnim(mergeSortSteps(this.state.arr))}>Merge Sort</button>
                <button onClick={() => this.sortAnim(iterativeMergeSortSteps(this.state.arr))}>Iterative Merge Sort</button>
                <button onClick={() => this.sortAnim(quickSortSteps(this.state.arr))}>Quick Sort</button>
                <button onClick={() => this.sortAnim(iterativeQuickSortSteps(this.state.arr))}>Iterative Quick Sort</button>
                <button onClick={() => this.sortAnim(heapSortSteps(this.state.arr))}>Heap Sort</button>
            </div>
        )
    }
}

export default SortingVisualizer
