import LeftPanel from '../../Panel/LeftPanel';
import Panel from '../../Panel/PanelSection';
import RightPanel from '../../Panel/RightPanel';
import PanelChild from '../../Panel/PanelChild';

import Sketch from '../../Sketches/objectdetection/ObjectDetection';

import { useState } from 'react';
import Menu from '../../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

import MathJax from 'react-mathjax';

import Detect from './Detect.png'
import Conv from './Convoluational.png';

const Algorithm = (props) => {
    //Current right panel index
    const [currentIndex, setCurrentIndex] = useState(0);

    //Scroll event listener
    const onScrollTo = (index) => {
        setCurrentIndex(index);
    }

    return <div>
        <Panel onScrollTo={onScrollTo}>
            <LeftPanel style={{background: "#e9c46a", textAlign: "left"}}>
                <Menu/>
                <h1 className="algo-left-subtitle">Chapter 4</h1>
                <h1 className="algo-left-title">Object Detection</h1>
                <PanelChild index={0}>
                    <h1 className="algo-left-header">Complex applications of Neural Network</h1>
                    <p className="algo-left-text">
                        <MathJax.Provider>
                            Recently, neural networks have been used extensively in Image Processing, especically in Object Clasifcation and Detection. Different from classification task where the output is just a label for a single object, neural network detection algorithm outputs both objects' label and location: <MathJax.Node inline formula={"[\\text{label}, x, y, width, height]"}/>.
                            For instance, SSD (Single shot detection) algorithm returns an array of probability of object and its location given an input image:
                            <p className="equation-text">
                                <MathJax.Node formula={"[\\text{probability of cat}, 10, 20, 300, 400],\\\\ [\\text{probability of dog}, 80, 70, 200, 100],\\\\ [\\text{probability of human}, 40, 30, 100, 80]"} />
                            </p>
                            As one may notice, each object is accompanied by a bounding box consisting of its <MathJax.Node inline formula={"x"}/> location, <MathJax.Node inline formula={"y"}/> location, <MathJax.Node inline formula={"\\text{width}"}/> and <MathJax.Node inline formula={"\\text{height}"}/> denoting its exact position on the image.
                        </MathJax.Provider>
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Network architecture</h1>
                    <p className="algo-left-text">
                        The architecture for a neural network used in SSD is certainly more complicated than the ones used in regression or classification we have previously discussed. It involves the use of Convolutional Layers (a very common component in Image Processing) which helps to extract meaningful sets of feature from the original image. However, in this chapter, SSD is considered an advanced algorithm included just to illustrate true capabilities of Machine Learning.
                        More intermediate learners can take a look at <a href="https://arxiv.org/pdf/1603.07285.pdf">Convolutional Arithmetic paper</a> to see how convolutions work and optionally, <a href="https://arxiv.org/pdf/1512.02325.pdf">original paper for Single Shot Detection</a> to see how it works.
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Visualization</h1>
                    <p className="algo-left-text">
                        We included a SSD model trained on the COCO dataset in this chapter to detect common objects such as human, phone, cup or book using input from your webcam. 
                        If you want to experience the visualization, please allow the application to use your webcam and be assure that no data or footage will be collected.<br /> <br />
                        Also once the webcam has been enabled, the model will take quite some time to load.
                        The detected object will be surrounded by a blue box with its label written in orange.
                    </p>
                </PanelChild>
                <Link to="/chapter5" className="algo-footer">
                    <p>Go to</p>
                    <p>Chapter 5 <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <img src={Detect} alt="SSD detect"/>
                </div>

                <div>
                    <img src={Conv} alt="Convolutional layer"/>
                </div>

                <div>
                    <Sketch />
                </div>
            </RightPanel>
        </Panel>
    </div>
}

export default Algorithm;