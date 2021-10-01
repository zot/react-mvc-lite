import React, {useState, useEffect} from "react";
import {List, ListItem, Button} from '@mui/material'
import {control, Render} from '../src/reactmvc'

interface Counter {
    name: string
    value: number
    hasInc: boolean
    hasDec: boolean
    renderEditor(index: number): JSX.Element
}

abstract class BaseCounter {
    abstract renderEditor(index: number): JSX.Element

    hasInc = false
    hasDec = false

    constructor(public name: string, public value = 0) {}
}

class IncrementingCounter extends BaseCounter {
    hasInc = true

    renderEditor(index: number) {
        return (<Render key={`inc-${index}`} render={()=> {
            const controller = control(this, 'name', 'value')

            console.log('render', this)
            return (
                <div className='mb-4'>
                    <Button
                        variant='contained'
                        onClick={controller(()=> this.value++)}>
                        Inc
                    </Button>
                    &nbsp;
                    {this.name}: {this.value}
                </div>
            )
        }}/>)
    }
}

class DecrementingCounter extends BaseCounter {
    hasDec = true

    renderEditor(index: number) {
        return (<Render key={`dec-${index}`} render={()=> {
            const controller = control(this, 'name', 'value')

            console.log('render', this)
            return (
                <div className='mb-4'>
                    <Button
                        variant='contained'
                onClick={controller((...args)=> {console.log(args); this.value--})}>
                        Dec
                    </Button>
                    &nbsp;
                    {this.name}: {this.value}
                </div>
            )
        }}/>)
    }
}

class IncDecCounter extends BaseCounter {
    hasInc = true
    hasDec = true

    renderEditor(index: number) {
        return (<Render key={`incdec-${index}`} render={()=> {
            const controller = control(this, 'name', 'value')

            console.log('render', this)
            return (
                <div className='mb-4'>
                    <Button
                        variant='contained'
                        onClick={controller(()=> this.value++)}>
                        Inc
                    </Button>
                    &nbsp;
                    <Button
                        variant='contained'
                        onClick={controller(()=> this.value--)}>
                        Dec
                    </Button>
                    &nbsp;
                    {this.name}: {this.value}
                </div>
            )
        }}/>)
    }
}

const counterList: Counter[] = [
    new IncrementingCounter("Shoes"),
    new DecrementingCounter("Automobiles", 10),
    new IncDecCounter("Considerations", 50),
]

export function Counters() {
    return (
        <>
            {counterList.map((c, i)=> c.renderEditor(i))}
        </>
    )
}

function InlineCounter({counter: c}: {counter: Counter}) {
    const [value, setValue] = useState(c.value)

    return (
        <div className='mb-4'>
            {c.hasInc ?
                <Button
                    variant='contained'
                    onClick={()=>{c.value++; setValue(c.value)}}>
                    Inc
                </Button>
                : <></>}
            {c.hasInc && c.hasDec ? <>&nbsp;</> : <></>}
            {c.hasDec ?
                <Button
                    variant='contained'
                    onClick={()=>{c.value--; setValue(c.value)}}>
                    Dec
                </Button>
                : <></>}
            &nbsp;
            {c.name}: {c.value}
        </div>)
}

export function InlineCounters() {
    return (
        <>
            {counterList.map((c, i)=> <InlineCounter key={`inline-${i}`} counter={c}/>)}
        </>
    )
}
