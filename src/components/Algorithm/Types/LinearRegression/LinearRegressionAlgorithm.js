import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';
import Sketch from '../../Sketches/linearregression/Wrapper';
import '../style.css';
import LineEquation from './lineequation.png';
import LinearRegressionLoss from './linearregressionloss.png';
import GradientDescent from './gradientdescent.png';

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
            <LeftPanel style={{background: "#F1FAEE", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 1</h1>
                <h1 className="algo-left-title">Linear regression</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Linear Equation</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            Linear regression assumes that there exists a linear relationship between variables, or in the case of simple linear regression:
                            <p className="equation-text">
                                <MathJax.Node formula={'y = m \\times x + b'}/>
                            </p>

                            For example, in the case of experience and salary:
                            <p className="equation-text">
                                <MathJax.Node formula={'salary = m \\times experience + b'}/>
                            </p>

                            Here, we assume that one's salary will increase linearly with his/her experience. <br/><br/>
                            It is the task of linear regression to find the best <MathJax.Node inline formula={'m'}/> and <MathJax.Node inline formula={'b'}/>, in other words, the best-fit-line given a dataset consisting experience and salary to make a prediction one's salary given his/her experience.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Best-fit-line and Loss function</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            So, how is the best-fit-line defined ? To address this question, first we need to familiarize with a new concept: Loss function. In essence, the loss function is calculated as 
                            <p className="equation-text">
                                <MathJax.Node formula={'\\sum (\\text{real y} - \\text{predicted y})^2'}/>
                            </p>
                            or more simply: the sum of squared difference between real and predicted values of y.<br/><br />
                            The smaller this sum is, the better the line equation captures the relationship between variables. Hence, the best-fit-line will be the line which minimizes this sum.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Gradient descent and Normal equation</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            To find this mythical best-fit-line, linear regression will try and tweak these <MathJax.Node inline formula={'m'}/> and <MathJax.Node inline formula={'b'}/> values so that the loss function attains its minimum value. But how exactly is this carried out?<br/><br/>
                            Generally, there are two common method: <MathJax.Node inline formula={'\\text{Gradient descent}'}/> and <MathJax.Node inline formula={'\\text{Normal equation}'}/>. While the first one relies on the method of steepest descent in Multivariate Calculate, the later makes use of knowlegde in Linear Algebra to approach the problem.<br/><br/>
                            Though the details of their derivation are beyond the scope of this chapter, advanced learners can get to know these algorithms through <a href="https://see.stanford.edu/materials/aimlcs229/cs229-notes1.pdf">Stanford's CS299 Notes</a>
                        </MathJax.Provider>
                    </p>
                </PanelChild>

                <PanelChild index={3}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In the visualization on the right, you can add more data by clicking on the black panel. As a new datapoint is added, the gradient descent algorithm will tweak the linear equation's <MathJax.Node inline formula={'m'}/> and <MathJax.Node inline formula={'b'}/> to find the best-fit-line<br/><br/>
                            While gradient descent is working its magic, you will see the loss on the right hand side gradually decreases until it has converged (having extremly small value)<br/><br/>
                            You can click on the 'Reset' button to clear all the data and reset the algorithm.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <Link to="/chapter2" className="algo-footer">
                    <p>Next</p>
                    <p>Chapter 2 <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <div className="image-holder">
                        <img src={LineEquation} alt="Line equation" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={LinearRegressionLoss} alt="Loss function" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={GradientDescent} alt="Gradient descent" className="panel-image"/>
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