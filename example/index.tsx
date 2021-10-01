///
/// Shell
///

import React from "react"
import ReactDOM from "react-dom"
import {Counters, InlineCounters} from './counters'

ReactDOM.render(<div className='pl-6'>
    <b>MVC</b>
    <Counters/>
    <b>Inline</b>
    <InlineCounters/>
</div>, document.getElementById('app'));
