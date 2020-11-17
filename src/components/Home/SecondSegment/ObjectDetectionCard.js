import objectdetection from '../../../images/objectdetection.png';

import {
    Link
} from "react-router-dom";

const ObjectDetectionCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 6</h1>
                <h1 className="card-name">Object Detection</h1>
                <h1 className="card-description">Explore the first non-trivial application of Neural Network</h1>
                <Link to="/chapter6"
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Go to Chapter 6
                </Link>
            </div>

            <div className="column panel-right">
                <img src={objectdetection} className="card-image"/>
            </div>
        </div>
    )
}

export default ObjectDetectionCard;