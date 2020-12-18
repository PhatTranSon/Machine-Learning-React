import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';

import Sketch from '../../Sketches/neuralnetwork/NeuralNetwork';

import { useState } from 'react';
import Menu from '../../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

import MathJax from 'react-mathjax';

import NeuralNetwork from './neuralnetwork.png';
import Backpropagation from './backpropagation.png';

const Algorithm = (props) => {
    //Current right panel index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Scroll event listener
    const onScrollTo = (index) => {
        setCurrentIndex(index);
    }

    return <div>
        <Panel onScrollTo={onScrollTo}>
            <LeftPanel style={{background: "#f9dcc4", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 3</h1>
                <h1 className="algo-left-title">Neural Network</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Neural network and Logisitic regression</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In essence, neural network is just an upgraded version of your typical logistic regression algorithm, in a sense that there will be more logistic 'units' instead of only one.<br/><br/>
                            As an example, take a look at the illustration of a simple neural network on the right panel. For simplicity, the network only has one hidden layer, marked in orange. Each of these hidden layers contains multiple hidden units, which is calculated in a similar fashion to logisitc regression:
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{hidden unit} = h_w(x) =\\frac{\\mathrm{1} }{\\mathrm{1} + e^{- w^Tx }}"} />
                            </p>
                            where <MathJax.Node inline formula={"w = { w_1, w_2, w_3, ..., w_n }"}/> is the specific set of weights unique to each unit. These weights can be learnt during training so that our neural network can have better performance.<br /><br />
                            However, hidden units can be calculated using different function rather than the sigmoid function used in logsitic regression. For instance:
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{hidden unit} = tanh_w(x) =\\frac{e^{w^Tx} - e^{- w^Tx}}{e^{w^Tx} + e^{- w^Tx}}"} />
                            </p>
                            In fact, these 'activation' function can be considered a hyperparameter to tweak in order to achieve highest performance.<br /><br />
                            The result of these hidden units are then passed onto the next hidden layer as input, for instance <MathJax.Node inline formula={"x'"}/>, which are then used to calculate the next hidden units.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Applications</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            The strength of neural networks lies in the fact that they can be utilized for a wide range of tasks: from regression (make a numerical prediction) to classification, just like in logistic regression. For these different tasks, the architacture of the neural network, more specfically the final layer, will be changed accordingly.<br /><br />
                            If the task is regression, then each output unit in the output layer will be calculated as:
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{output unit} = linear_w(x') = w^Tx'"} />
                            </p>
                            Where <MathJax.Node inline formula={"x'"}/> is the output of previous hidden layer and <MathJax.Node inline formula={"w"}/> is the weight of each output unit.<br /><br />
                            If the task is binary classfication, then each output unit in the output layer will be calculated as:
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{output unit} = h_w(x') =\\frac{\\mathrm{1} }{\\mathrm{1} + e^{- w^Tx' }}"} />
                            </p>
                            For different tasks, different loss metrics are employed to train the neural network.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Backward propagation and Gradient descent</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In essence, despite its complexity, backward propagation is no difference to vanila gradient descent we used in previous chapter: We are just finding a way to update all the weights of all hidden units and output units at once in order to minimise the cost.
                            The loss can be 
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{Loss} = \\sum - y * log(\\hat{y}) - (1 - y) * log(1 - \\hat{y})"} />
                            </p>
                            in the case of binary classification or
                            <p className="equation-text">
                                <MathJax.Node formula={'\\sum (\\text{real y} - \\text{predicted y})^2'}/>
                            </p>
                            in the case of regression. Whatever loss function is used, the weights are updated using the same principle as in previous chapters: matrix derivative in Multivariable Calculus. Though this is beyond the scope of this section, for advanced learners, <a href="http://www.cs.cornell.edu/courses/cs5740/2016sp/resources/backprop.pdf">Cornell's University lecture notes on Backpropagation</a> will be a useful material.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={3}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        In the right panel is the visualization for neural network on the task of binary classification. Firstly, you can choose what type of point to added (negative or possitive) using the rectangle in blue or orange. Once all the points have been added, you can choose the 'Start' symbol to initialize the training and classifying process.
                        As in previous chapter, the 'Reset' option can be selected to clear all existing points to start again.<br /><br />
                        You are encourage to add points which are not linearly separable (can not be separted by a line) to see the advantage neura networks have over logistic regression.
                    </p>
                </PanelChild>
                <Link to="/chapter4" className="algo-footer">
                    <p>Next</p>
                    <p>Chapter 4 <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <div className="image-holder">
                        <img src={NeuralNetwork} alt="Sigmoid function" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={NeuralNetwork} alt="Sigmoid function" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={Backpropagation} alt="Sigmoid function" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <Sketch />
                </div>
            </RightPanel>
        </Panel>
    </div>
}

export default Algorithm;