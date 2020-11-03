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
    return <div className="columns" style={{width: "80%", margin: "auto"}}>
        <div className="column" style={{textAlign: "center"}}>
            <div
                className={type === 1 ? "positive-chosen" : "positive"}
                onClick={() => changeType(1)}>
            </div>
        </div>
        
        <div className="column" style={{textAlign: "center"}}>
            <div
                className={type === 0 ? "negative-chosen" : "negative"}
                onClick={() => { changeType(0) }}>
            </div>
        </div>

        <div className="column">
            <button
                className="button"
                style={{width: "50%", background: "#90e0ef", fontSize: "1.2vw"}}
                onClick={() => props.onReset()}>
                Clear all
            </button>
        </div>
    </div>
}