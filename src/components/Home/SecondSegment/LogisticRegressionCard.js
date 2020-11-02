import classification from '../../../images/classification.png';

import {
    Link
} from "react-router-dom";

const LogisticRegressionCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 2</h1>
                <h1 className="card-name">Logistic Regression</h1>
                <h1 className="card-description">Find a linear hyperplane for binary classification tasks.</h1>
                <Link to="/chapter2"
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Go to Chapter 2
                </Link>
            </div>

            <div className="column panel-right">
                <img src={classification} className="card-image"/>
            </div>
        </div>
    )
}

export default LogisticRegressionCard;