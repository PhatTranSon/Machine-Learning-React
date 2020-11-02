import neuralnetwork from '../../../images/neural.png';

import {
    Link
} from "react-router-dom";

const NeuralNetworkCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 3</h1>
                <h1 className="card-name">Neural Network</h1>
                <h1 className="card-description">Discover complex decision boundaries by mimicking a human's brain.</h1>
                <Link to="/chapter3"
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Go to Chapter 3
                </Link>
            </div>

            <div className="column panel-right">
                <img src={neuralnetwork} className="card-image"/>
            </div>
        </div>
    )
}

export default NeuralNetworkCard;