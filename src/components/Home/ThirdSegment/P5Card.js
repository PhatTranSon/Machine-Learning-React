import p5 from '../../../images/p5.png';

const P5Card = (props) => {
    return (
        <div className="powered-card">
            <img src={p5} alt="p5.js logo"/>
            <h1 className="powered-card-title" style={{color: '#EF476F'}}>P5.js</h1>
            <div className="powered-card-content">
                A JavaScript library for creative coding.
            </div>
            <a 
                className="powered-card-button" 
                style={{background: '#EF476F'}}
                href="https://p5js.org/">
                Explore
            </a>
        </div>
    )
}

export default P5Card;