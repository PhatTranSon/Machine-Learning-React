import React, { useState } from 'react';

export default (props) => {
    //Initialize the state
    const [type, setType] = useState(1);

    //Call parent methods
    const changeType = (type) => {
        props.onChangeType(type);
        //Rerender
        setType(type);
    }

    //Render
    return <div>
        <button
            className={`button is-primary ${ type === 1 ? "" : "is-outlined"}`}
            style={{width: "100%", marginBottom: "5px"}}
            onClick={() => changeType(1)}>
            Use positive class
        </button><br/>
        
        <button 
            className={`button is-danger ${ type === 0 ? "" : "is-outlined"}`}
            style={{width: "100%", marginBottom: "5px"}}
            onClick={() => { changeType(0) }}>
            Use negative class
        </button><br/>

        <button
            className="button is-warning"
            style={{width: "100%", marginBottom: "5px"}}
            onClick={() => props.onReset()}>
            Reset
        </button>
    </div>
}