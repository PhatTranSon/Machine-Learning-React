import React, { useState } from 'react';
import StartStopButton from './StartStopButton';

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
            <div className="columns" style={{width: "80%", margin: "auto", marginBottom: "0.5em", textAlign: "center"}}>
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
                        style={{width: "50%", background: "#f9dcc4", fontSize: "1.2vw"}}
                        onClick={reset}>
                        Clear all
                    </button>
                </div>
            </div>

        <StartStopButton
            color="#f9dcc4"
            start={start}
            stop={stop}/>
    </div>
}