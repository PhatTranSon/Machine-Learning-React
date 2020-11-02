import React, { useState } from 'react';
import Sketch from './LinearRegression';

function Wrapper() {
  const [resetFlag, setFlag] = useState(false);

  function reset() {
    setFlag(!resetFlag);
  }

  return <div>
    <Sketch/>
    <div style={{clear: "both"}}></div>
    <button onClick={() => reset()} className="button sketch-button" style={{width: 
    "100%"}}>Reset</button>
  </div>
}

export default Wrapper;