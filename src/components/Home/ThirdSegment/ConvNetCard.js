import convnetjs from '../../../images/convnet.png';

const ConvNetCard = (props) => {
    return (
        <div className="powered-card">
            <img src={convnetjs} alt="p5.js logo"/>
            <h1 className="powered-card-title" style={{color: '#1D3557'}}>ConvNet.js</h1>
            <div className="powered-card-content">
                A lightweight deep learning framework.
            </div>
            <a
                href="https://cs.stanford.edu/people/karpathy/convnetjs/"
                className="powered-card-button" 
                style={{background: '#1D3557'}}>
                Explore
            </a>
        </div>
    )
}

export default ConvNetCard;