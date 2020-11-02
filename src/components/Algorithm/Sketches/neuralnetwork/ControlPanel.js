import React, { useState } from 'react';

export default (props) => {
    const [type, setType] = useState(1);

    //Call parent methods
    const changeType = (type) => {
        props.onChangeType(type);
        //Rerender
        setType(type);
    }

    const start = () => {
        props.onStart();
    }

    const stop = () => {
        props.onStop();
    }

    const reset = () => {
        props.onReset();
    }

    return <div>
        <button
            className={`button is-primary ${ type === 1 ? "" : "is-outlined"}`}
            style={{width: "100%"}}
            onClick={() => changeType(1)}>
            Use positive class
        </button><br/>
        
        <button
            className={`button is-danger ${ type === 0 ? "" : "is-outlined"}`}
            style={{width: "100%"}}
            onClick={() => { changeType(0) }}>
            Use negative class
        </button><br/>

        <button  
            className="button is-success" 
            style={{width: "33.3%"}}
            onClick={start}>
            Start
        </button>

        <button 
            className="button is-info" 
            style={{width: "33.3%"}}
            onClick={stop}>
            Stop
        </button>

        <button
            className="button is-warning" 
            style={{width: "33.3%"}}
            onClick={reset}>
            Reset
        </button>
    </div>
}