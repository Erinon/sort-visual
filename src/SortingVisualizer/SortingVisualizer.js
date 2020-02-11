import React from 'react'
import './SortingVisualizer.css'
import { DEAFULT_ARRAY_SIZE, DEFAULT_SPEED } from '../constants/constants'
import NavigationBar from '../NavigationBar/NavigationBar'
import { randomArray, sleep } from '../utils/utils'

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.speed = DEFAULT_SPEED

        this.state = {
            arr: []
        }
    }
    
    componentDidMount() {
        this.resetArray(DEAFULT_ARRAY_SIZE)
    }

    changeSize = (size) => {
        this.resetArray(size)
    }

    changeSpeed = (speed) => {
        this.speed = speed
    }

    resetArray = (size) =>
        this.setState({
            arr: randomArray(size)
        })

    async sortAnim(stepFun) {
        const arr = this.state.arr

        const t0 = performance.now()
        const steps = stepFun(arr)
        const t1 = performance.now()

        const algTime = t1 - t0

        const stepNum = steps.length
        
        const arrBars = document.getElementsByClassName('arr-bar')
        var iCol, jCol, s

        console.log(`${stepNum} steps`)
        console.log(`${algTime} ms`)
        
        for (s = 0; s < stepNum; ++s) {
            const [i, j, c] = steps[s]

            if (c) {
                arr[i] = j

                await sleep(1)
                arrBars[i].style.height = `${j}%`
            } else {
                if (arr[i] > arr[j]) {
                    iCol = 'green'
                    jCol = 'red'
                } else {
                    iCol = 'red'
                    jCol = 'green'
                }
                
                await sleep(1)
                arrBars[i].style.backgroundColor = iCol
                arrBars[j].style.backgroundColor = jCol

                await sleep(1)
                arrBars[i].style.backgroundColor = '#f2AA4Cff'
                arrBars[j].style.backgroundColor = '#f2AA4Cff'
            }
        }
    }

    render() {
        const len = this.state.arr.length

        return (
            <div>
                <NavigationBar handleSizeChange={this.changeSize} handleResetClick={this.resetArray} handleSpeedChange={this.changeSpeed} handleStartClick={a => this.sortAnim(a)}/>

                <div className='arr-container'>
                    {this.state.arr.map((value, index) =>
                    <div className='arr-bar' key={index} style={{height: `${value}%`, width: `${100 / len}%`}}/>
                    )}
                </div>
            </div>
        )
    }
}

export default SortingVisualizer
