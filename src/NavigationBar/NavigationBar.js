import React from 'react'
import './NavigationBar.css'
import { bubbleSortSteps } from '../SortingAlgorithms/BubbleSort'
import { insertionSortSteps } from '../SortingAlgorithms/InsertionSort'
import { selectionSortSteps } from '../SortingAlgorithms/SelectionSort'
import { shellSortSteps } from '../SortingAlgorithms/ShellSort'
import { mergeSortSteps, iterativeMergeSortSteps } from '../SortingAlgorithms/MergeSort'
import { quickSortSteps, iterativeQuickSortSteps } from '../SortingAlgorithms/QuickSort'
import { heapSortSteps } from '../SortingAlgorithms/HeapSort'
import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, DEAFULT_ARRAY_SIZE, DEFAULT_SPEED, MIN_SPEED, MAX_SPEED, ARRAY_SIZE_STEP, SPEED_STEP } from '../constants/constants'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)

        this.algorithm = undefined

        this.state = {
            arraySize: DEAFULT_ARRAY_SIZE,
            speed: DEFAULT_SPEED
        }
    }

    onSizeSliderChange = e => {
        const val = e.target.value

        this.setState({
            arraySize: val
        })

        this.props.handleSizeChange(val)
    }

    onSpeedSliderChange = e => {
        const val = e.target.value

        this.setState({
            speed: val
        })

        this.props.handleSpeedChange(val)
    }

    onResetClicked = () => this.props.handleResetClick(this.state.arraySize)

    async onStartClicked() {
        if (!this.algorithm) {
            alert('Please choose desired algorithm.')

            return
        }

        this.props.handleStartClick(this.algorithm, this.state.speed)
    }

    onAlgoChange = e => {
        var algo

        switch (e.target.value) {
            case 'bubble':
                algo = bubbleSortSteps
                break
            case 'insertion':
                algo = insertionSortSteps
                break
            case 'selection':
                algo = selectionSortSteps
                break
            case 'shell':
                algo = shellSortSteps
                break
            case 'merge':
                algo = mergeSortSteps
                break
            case 'iterativeMerge':
                algo = iterativeMergeSortSteps
                break
            case 'quick':
                algo = quickSortSteps
                break
            case 'iterativeQuick':
                algo = iterativeQuickSortSteps
                break
            case 'heap':
                algo = heapSortSteps
                break
            default:
                algo = undefined
                break
        }

        this.algorithm = algo
    }

    render() {
        return (
            <nav id='navbar'>
                <button onClick={this.onResetClicked}>Reset</button>

                <div>
                    <label htmlFor='sizeSlider'>Size:</label>
                    <input type='range' id='sizeSlider' min={MIN_ARRAY_SIZE} max={MAX_ARRAY_SIZE} step={ARRAY_SIZE_STEP} defaultValue={this.state.arraySize} onInput={this.onSizeSliderChange}></input>
                    <br/>
                    {this.state.arraySize}
                </div>

                <div>
                    <label htmlFor='speedSlider'>Speed:</label>
                    <input type='range' id='speedSslider' min={MIN_SPEED} max={MAX_SPEED} step={SPEED_STEP} defaultValue={this.state.speed} onInput={this.onSpeedSliderChange}></input>
                    <br/>
                    {this.state.speed}
                </div>

                <div>
                    <select id='algorithms' onChange={this.onAlgoChange} required>
                        <option value='' hidden>Algorithm:</option>
                        <option value='bubble'>Bubble Sort</option>
                        <option value='insertion'>Insertion Sort</option>
                        <option value='selection'>Selection Sort</option>
                        <option value='shell'>Shell Sort</option>
                        <option value='merge'>Merge Sort</option>
                        <option value='iterativeMerge'>Iterative Merge Sort</option>
                        <option value='quick'>Quick Sort</option>
                        <option value='iterativeQuick'>Iterative Quick Sort</option>
                        <option value='heap'>Heap Sort</option>
                    </select>
                </div>

                <button onClick={() => this.onStartClicked()}>Start</button>
            </nav>
        )
    }
}

export default NavigationBar
