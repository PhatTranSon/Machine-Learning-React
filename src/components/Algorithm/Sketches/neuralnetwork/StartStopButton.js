import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const StartStopButton = (props) => {
    const [start, setStart] = useState(true);

    const onClick = () => {
        if (start) {
            props.start();
        } else {
            props.stop();
        }
        setStart(!start);
    }

    return <div onClick={onClick} className="start-stop-button" style={{background: props.color}}>
        <span>
        {
            start ? <FontAwesomeIcon icon={faPlay} size="2x"/> : <FontAwesomeIcon icon={faPause} size="2x"/>
        }
        </span>
    </div>
}

export default StartStopButton;