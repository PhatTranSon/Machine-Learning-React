import knearestneighbors from '../../../images/kn.png';

import {
    Link
} from "react-router-dom";

const KNearestNeighborsCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 5</h1>
                <h1 className="card-name">K Nearest Neighbors</h1>
                <h1 className="card-description">Explore a non-parametric method in solving multiple classification tasks.</h1>
                <Link 
                    to="/chapter5"
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "1.5em", paddingRight: "1.5em"}}>
                    Go to Chapter 5
                </Link>
            </div>

            <div className="column panel-right">
                <img src={knearestneighbors} className="card-image"/>
            </div>
        </div>
    )
}

export default KNearestNeighborsCard;