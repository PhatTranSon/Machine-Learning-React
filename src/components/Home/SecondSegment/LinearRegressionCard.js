import linearregression from '../../../images/regression.png';

const LinearRegressionCard = (props) => {
    return (
        <div className="columns panel" style={{margin: "auto"}}>
            <div className="column panel-left">
                <h1 className="card-chapter">Chapter 1</h1>
                <h1 className="card-name">Linear Regression</h1>
                <h1 className="card-description">Find a best-fit hyperplane to estimate the relationships between random variables.</h1>
                <a 
                    className="button is-white card-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Go to Chapter 1
                </a>
            </div>

            <div className="column panel-right">
                <img src={linearregression} className="card-image"/>
            </div>
        </div>
    )
}

export default LinearRegressionCard;