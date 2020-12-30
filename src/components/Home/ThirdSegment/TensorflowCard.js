import tensorflow from '../../../images/tensorflow.png';

const TensorflowCard = (props) => {
    return (
        <div className="powered-card">
            <img src={tensorflow} alt="tensorflow.js logo"/>
            <h1 className="powered-card-title" style={{color: '#F4A261'}}>Tensorflow.js</h1>
            <div className="powered-card-content">
                A library for machine learning in Javascript.
            </div>
            <a 
                className="powered-card-button" 
                href="https://www.tensorflow.org/js"
                style={{background: '#F4A261'}}>
                Explore
            </a>
        </div>
    )
}

export default TensorflowCard;