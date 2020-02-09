import React from 'react'
import './SortingVisualizer.css'
import { bubbleSortSteps } from '../SortingAlgorithms/SortingAlgorithms'
import { swap } from '../utils/utils'

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

    bubbleSortAnim() {
        const {arr} = this.state
        const arrBars = document.getElementsByClassName('arr-bar')
        const steps = bubbleSortSteps(this.state.arr)
        var iCol, jCol, cnt = 0
        
        steps.forEach(s => {
            const [i, j, c] = s
            
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
            }, cnt * 10)

            if (c) {
                    ++cnt;
                setTimeout(() => {
                    swap(arr, i, j)

                    arrBars[i].style.height = `${arr[i]}%`
                    arrBars[j].style.height = `${arr[j]}%`
                }, cnt * 10)
            }

            ++cnt;
            setTimeout(() => {
                arrBars[i].style.backgroundColor = 'pink'
                arrBars[j].style.backgroundColor = 'pink'
            }, cnt * 10)
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
                <button onClick={() => this.bubbleSortAnim()}>Bubble Sort</button>
            </div>
        )
    }
}

export default SortingVisualizer
