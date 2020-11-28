import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';

import Sigmoid from './sigmoid.png';
import Boundary from './boundary.png';
import GradientDescent from './gradientdescent.png';

import Sketch from '../../Sketches/logisticregression/LositicRegression';

import { useState } from 'react';
import Menu from '../../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 
import MathJax from 'react-mathjax';

const Algorithm = (props) => {
    //Current right panel index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Scroll event listener
    const onScrollTo = (index) => {
        setCurrentIndex(index);
    }

    return <div>
        <Panel onScrollTo={onScrollTo}>
            <LeftPanel style={{background: "#90e0ef", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 2</h1>
                <h1 className="algo-left-title">Logistic Regression</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Sigmoid function</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            Losgistic regression works by modeling the class probability as a special function call Sigmoid function. In essence, the function is defined as:
                            <p className="equation-text">
                                <MathJax.Node formula={"\\sigma(z) = \\frac{1}{1 + e^{-z}}"} />
                            </p>
                            In the context of logisitc regression, we model:
                            <p className="equation-text">
                                <MathJax.Node formula={"probability(y = 1 | x) = \\frac{\\mathrm{1} }{\\mathrm{1} + e^{- \\theta^Tx }}"} />
                            </p>
                            where <MathJax.Node inline formula={"w^Tx = w_1 \\times x_1 + w_2 \\times x_2 + ..."}/> is the linear combination of input vector <MathJax.Node inline formula={"x"} />
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Linear decision boundary</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Gradient descent</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <PanelChild index={3}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <Link to="/chapter3" className="algo-footer">
                    <p>Next</p>
                    <p>Chapter 3 <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <div className="image-holder">
                        <img src={Sigmoid} alt="Sigmoid function" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={Boundary} alt="Linear Boundary" className="panel-image"/>
                    </div>  
                </div>

                <div>
                    <div className="image-holder">
                        <img src={GradientDescent} alt="Gradient" className="panel-image"/>
                    </div>  
                </div>

                <div>
                    <Sketch/>
                </div>
            </RightPanel>
        </Panel>
    </div>
}

export default Algorithm;