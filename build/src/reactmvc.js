import React, { useState } from "react";
import * as deepEqual from "deep-equal";
/**
 * Record state for the given properties of a model
 * Returns a `controller function` which takes some code to execute and
 * returns a function that executes it and updates the state if the model changed
 *
 * Use the controller function in your event handlers like this:
 *
 * `<Button onClick={controller(()=>this.value--)}>Dec</Button>`
 *
 * When it handles the event, it will execute your function with the
 * event it got. After your function returns, it will update the state
 * if the function changed the model.
 *
 * Note that change detection compares for structural equality so be
 * sure to:
 *
 * 1. Use immutable values for the properties you track, or else
 * 2. Replace mutable values with copies after you finish changing them,
 *    like `o.a = [...o.a]` or `o.a = {...o.a}`
 *
 *
 * If you were to, for instance, just mutate an array without replacing it,
 * the old state would contain the same array and structural equality would
 * be true so this would not detect that you had made a change.
 */
export function control(obj, ...props) {
    const [objState, setObjState] = useState(props.map(p => obj[p]));
    return (func) => (...args) => {
        func(...args);
        const values = props.map(p => obj[p]);
        if (!objState || values.filter((v, i) => !deepEqual(v, objState[i])).length) {
            setObjState(values);
        }
    };
}
/** Delegate rendering to the `render` property to allow methods to track state */
export function Render({ render }) { return render ? render() : React.createElement(React.Fragment, null); }
//# sourceMappingURL=reactmvc.js.map