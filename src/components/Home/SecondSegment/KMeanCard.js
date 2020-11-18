import kmean from '../../../images/kmean.png';

import {
    Link
} from "react-router-dom";

const KMeanCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 6</h1>
                <h1 className="card-name">K Mean Clustering</h1>
                <h1 className="card-description">A traditional unsupervised learning method to cluster similar datapoints.</h1>
                <Link to="/chapter6"
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Go to Chapter 6
                </Link>
            </div>

            <div className="column panel-right">
                <img src={kmean} className="card-image"/>
            </div>
        </div>
    )
}

export default KMeanCard;