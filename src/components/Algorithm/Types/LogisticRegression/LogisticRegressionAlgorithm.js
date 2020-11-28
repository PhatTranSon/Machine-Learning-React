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
                                <MathJax.Node formula={"probability(y = 1 | x) = h_w(x) =\\frac{\\mathrm{1} }{\\mathrm{1} + e^{- w^Tx }}"} />
                            </p>
                            where <MathJax.Node inline formula={"w^Tx = w_1 \\times x_1 + w_2 \\times x_2 + ... + w_n"}/> is the linear combination of feature vector <MathJax.Node inline formula={"x"} />. 
                            Although the reason why this assumption works well is beyond the scope of this chapter, more mathematically-inclined students can find out why using <a href="https://www.cs.princeton.edu/courses/archive/spring16/cos495/slides/ML_basics_lecture7_multiclass.pdf">Princeton's lecture notes</a><br/><br/>
                            Here, <MathJax.Node inline formula={"w's"}/> are learnable parameters and it is the task of Logsitic Regression model to learn these parameters.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Linear decision boundary</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            So, how is an object's class decided ? You can plug its input vector into the Sigmoid function and check the result.
                            If:
                            <p className="equation-text">
                                <MathJax.Node formula={"probability(y = 1 | x) = h_w(x) \\geq 0.5 \\rightarrow \\text{positive class}"} />
                            </p>
                            Else if:
                            <p className="equation-text">
                                <MathJax.Node formula={"probability(y = 1 | x) = h_w(x) < 0.5 \\rightarrow \\text{negative class}"} />
                            </p>

                            For instance, if our feature vector is defined as <MathJax.Node inline formula={"features = [x, y]"} /> where <MathJax.Node inline formula={"x"} /> and <MathJax.Node inline formula={"y"} /> are coordinates on a 2d plane. Then:
                            <p className="equation-text">
                                <MathJax.Node formula={"w_1 * x + w_2 * y + w_3 \\geq 0 \\rightarrow positive"} />
                            </p>
                            and if
                            <p className="equation-text">
                                <MathJax.Node formula={"w_1 * x + w_2 * y + w_3 < 0 \\rightarrow negative"} />
                            </p>

                            If you pay attention to high school math, you will notice that <MathJax.Node inline formula={"w_1 * x + w_2 * y + w_3"}/> is an equation for a line in a 2-dimensional plane. Hence, our decision boundary in this case would be a linear one.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Loss function and Gradient descent</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In order to find the best decision boundary, we need to have some sort of criteria of how 'good' a boundary is? Similar to the case of linear regression, we also define a loss function. In the context of Logistic regression, the loss in defined as 
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{Log loss} = \\sum - y * log(\\hat{y}) - (1 - y) * log(1 - \\hat{y})"} />
                            </p>
                            Where <MathJax.Node inline formula={"y"} /> and <MathJax.Node inline formula={"\\hat{y}"} /> are true label and prediction respectively<br /><br />
                            The lower the log loss is, the better our model predicts the true labels and hence its higher accuracy. As the model whose log loss is lowest is highly desirable, the ultimate question is: how to find it? The answer is again <MathJax.Node inline formula={"\\text{Gradient Descent}"} />.
                            Using this iterative algorithm, the parameters, for instance, <MathJax.Node inline formula={"w_1"} />, <MathJax.Node inline formula={"w_2"} /> and <MathJax.Node inline formula={"w_3"} /> will slowly approach the best parameters which yields the lowest loss.
                            Optionally, you can derive gradient descent algorithm using <a href="https://see.stanford.edu/materials/aimlcs229/cs229-notes1.pdf">Stanford's CS299 Notes</a>.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={3}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        In the visualization of the right, you can choose an object's label by choosing positive (blue) or negative (orange).
                        By clicking on the gray box, you will add another datapoints to our training examples.
                        As a new sample is added, the whole training process will begin and the algorithm will automatically find the best linear decision boundary to discriminate those points.
                        You can also click on the Reset button to clear all the training examples and restart the training.
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