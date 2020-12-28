import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';

import Sketch from '../../Sketches/nearestneighbors/NearestNeighbor';

import { useState } from 'react';
import Menu from '../../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

import MathJax from 'react-mathjax';

import neighbors from './neighbors.png';
import distance from './distance.png';
import poll from './poll.png';

const Algorithm = (props) => {
    //Current right panel index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Scroll event listener
    const onScrollTo = (index) => {
        setCurrentIndex(index);
    }

    return <div>
        <Panel onScrollTo={onScrollTo}>
            <LeftPanel style={{background: "#b7e4c7", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 5</h1>
                <h1 className="algo-left-title">K Nearest Neighbors</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Non-parametric method</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            K nearest neighbors is often used as a classfication algorithm in Machine Learning. Different from Linear regression or Logisitic regression, there will not be a set of parameter <MathJax.Node inline formula={"w"}/> to learn from. 
                            Instead, the algorithm works by comparing the distance of a new datapoint to a set of training data points whose class is already known. Its class will then be decided by the classes of its <MathJax.Node inline formula={"k"}/> nearest neighbors.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Distance metrics</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            How will the distance between data points are calculated ? There are several distance metrics often used in KNN algorithms, most notable are Euclidean distance and Manhattan distance <br/><br />
                            <p>
                                In 2-dimensional space, Euclidean distance between point 1 and point 2 is calculated as follow
                                <p className="equation-text">
                                    <MathJax.Node formula={"\\sqrt{(x_2 - x_1)^{2} + (y_2 - y_1)^{2}}"} />
                                </p>
                                Where <MathJax.Node inline formula={"(x_1, y_1)"}/> and <MathJax.Node inline formula={"(x_2, y_2)"}/> are coordinates of point 1 and 2 respectively.
                                In fact, Euclidean distance is simply the square distance between two points in space.
                            </p><br />

                            <p>
                                On the other hand, Manhattan distance between two points in 2-d space is calculated using the formula:
                                <p className="equation-text">
                                    <MathJax.Node formula={"|x_2 - x_1| + |y_2 - y_1|"} />
                                </p>
                                This means that the distance is merely the sum of absolute differences of coordinates.
                            </p>
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Class decision</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            So, how will the class of a new data point is decided?
                            Using the distance metric, kNN algorithm will find the k neighbors which have the smallest distance to our datapoint.
                            If these points are all from a class, that class will be the class of the new data point. However, if they are from different class, the class which have most neighbors will be given to that point.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={3}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In the algorithm visualization on the right, you can choose the number of nearest neighbors <MathJax.Node inline formula={"k"}/> by entering the input.
                            Using your mouse, a new data point will move accross the 2d space. Its class, along with nearest neighbors will be decided and display on the right panel.<br /><br />
                            Note that here, we use the Euclidean distance instead the Manhattan one.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <Link to="/chapter6" className="algo-footer">
                    <p>Next</p>
                    <p>Chapter 6 <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <img src={neighbors} alt="Neighbors"/>
                </div>

                <div>
                    <img src={distance} alt="Distance metric"/>
                </div>

                <div>
                    <img src={poll} alt="Class polling"/>
                </div>

                <div>
                    <Sketch />
                </div>
            </RightPanel>
        </Panel>
    </div>
}

export default Algorithm;