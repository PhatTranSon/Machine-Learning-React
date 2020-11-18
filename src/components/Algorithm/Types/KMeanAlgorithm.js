import LeftPanel from '../Panel/LeftPanel';
import Panel from '../Panel/PanelSection';
import RightPanel from '../Panel/RightPanel';
import PanelChild from '../Panel/PanelChild';

import Sketch from '../Sketches/kmeanclustering/Clustering';

import { useState } from 'react';
import Menu from '../Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; 

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
                    <h1 className="algo-left-header">Unsuperivsed</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <PanelChild index={1}>
                    <h1 className="algo-left-header">Distance</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <PanelChild index={2}>
                    <h1 className="algo-left-header">Centroid</h1>
                    <p className="algo-left-text">
                        Cloud IoT Core is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. Cloud IoT Core, in combination with other services on Google Cloud platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.
                    </p>
                </PanelChild>
                <Link to="/" className="algo-footer">
                    <p>Back</p>
                    <p>Home <FontAwesomeIcon icon={faArrowRight}/></p>
                </Link>
            </LeftPanel>
            <RightPanel currentIndex={currentIndex}>
                <div>
                    <Sketch/>
                </div>

                <div>
                    <h1>2</h1>
                </div>

                <div>
                    <h1>3</h1>
                </div>
            </RightPanel>
        </Panel>
    </div>
}

export default Algorithm;