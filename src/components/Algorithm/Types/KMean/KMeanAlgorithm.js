import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';

import Sketch from '../../Sketches/kmeanclustering/Clustering';

import { useState } from 'react';
import Menu from '../../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

import MathJax from 'react-mathjax';

import Unsupervised from './unsupervise.png';
import Initialization from './initialization.png';
import Centroids from './centroids.png';
import GradientDescent from './gradientdescent.png';

const Algorithm = (props) => {
    //Current right panel index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Scroll event listener
    const onScrollTo = (index) => {
        setCurrentIndex(index);
    }

    return <div>
        <Panel onScrollTo={onScrollTo}>
            <LeftPanel style={{background: "#ecbcfd", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 6</h1>
                <h1 className="algo-left-title">K Mean Clustering</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Unsupervised</h1>
                    <p className="algo-left-text">
                        The biggest difference between k-Mean clustering and previous algorithms we have learnt is it is an unsupervised algorithm. This means that there will be no label for the training data points and it is the job of the algorithm to group them into clusters.<br/><br/>
                        For instance, we will be given a set of data points containing coordinates in a 2-d plane. k-Mean algorithm is then used to group them into cohesive structures.
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Centroid initialization</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            Generally, k-Mean clustering training often contains 2 main steps.<br/><br />
                            In the first step, we generate <MathJax.Node inline formula="k"/> clusters, namely <MathJax.Node inline formula="{\mu_1, \mu_2, \mu_3, ..., \mu_k}"/> by takning random points in the training net, though other initialize methods are also available
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Class assignment and Centroid calculation</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In the second step, the class of each point in the dataset will be decided based on the nearest cluster. For example, if its distance to the blue centroid is the smallest, compared to the distance to green or red centroid, the class will be blue.
                            <p className="equation-text">
                                <MathJax.Node formula={"\\text{class of }x^{(i)} = \\text{class of centroid closest to }x^{(i)}"} />
                            </p>
                            where <MathJax.Node inline formula="x^{(i)}"/> is a training example in the dataset.<br/><br/>
                            The distance between a point and a centroid is their Euclidean distance we have learnt previously.<br /><br />
                            After all the points has been assigned a class, the centroid coordinate itself will be recalculated. The coordinates for the blue centroid, for instance, will be the average of the coordinates of all points whose class is blue.
                            <p className="equation-text">
                                <MathJax.Node formula={"x_\\text{green centroid} = average(\\text{x's of green datapoints})"} />
                                <MathJax.Node formula={"y_\\text{green centroid} = average(\\text{y's of green datapoints})"} />
                            </p>
                            This step is repated until convergence.<br/><br/>
                            The algorithm will converge when the coordinates of all centroids stabilizes, meaning that they do not change significantly after many iterations.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={3}>
                    <h1 className="algo-left-header">Loss and Convergence</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            In fact, what the algorithm do is just performing gradient descent on a special loss function <MathJax.Node inline formula="J"/> which is called distortion function.<br /><br />
                            Also, because of this distortion function, k-Mean algorithm is not guarentee to give an optimal solution, meaning that it will not be able to find the 'correct' cluster all the time (try to run the visualization to verify this). One way to sove this is to run the it multiple times on a set of data.<br /><br />
                            Those who want to dig deep can refer to <a href="https://see.stanford.edu/materials/aimlcs229/cs229-notes7a.pdf">Stanford's Lecture notes on k-Mean clustering</a>.
                        </MathJax.Provider>
                    </p>
                </PanelChild>

                <PanelChild index={4}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        In the visualization on the right, we initialize the centroid randomly first rather than choosing from the data points.
                        You can click on 'Restart' button to generate data points and training the algorithm and choose 'Generate cores' to reinitialize the centroids.<br /><br />
                        Using this initialization technique, we see that the algorithm will not be able to get to the optimal solution all the time. 
                    </p>
                </PanelChild>
                <Link to="/" className="algo-footer">
                    <p>Back</p>
                    <p>Home <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <div className="image-holder">
                        <img src={Unsupervised} alt="Unsupervised" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={Initialization} alt="Centroid initialization" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={Centroids} alt="Centroid calculation" className="panel-image"/>
                    </div>
                </div>

                <div>
                    <div className="image-holder">
                        <img src={GradientDescent} alt="Centroid gradient descent" className="panel-image"/>
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