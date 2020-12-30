import Navbar from './FirstSegment/Navbar';
import Sketch from './FirstSegment/Sketch';
import Veil from './FirstSegment/Veil';
import Algorithms from './SecondSegment/Algorithms';
import PoweredBy from './ThirdSegment/PoweredBy';
import AboutUs from './FourthSegment/AboutUs';
import { useRef } from 'react';

const Home = (props) => {
    //Handle user click
    const onAlgorithmClick = () => {
        algoPanelRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    //Pointer reference to Algorithm panel
    const algoPanelRef = useRef(null);

    return <div className="snap-container">
        <div style={{position: "fixed", zIndex: -999}}>
            <Sketch/>
        </div>

        
        <section className="snap-child">
            <Navbar onAlgorithmClick={onAlgorithmClick}/>
            <div style={{position: "relative"}}>
                <Veil/>
            </div>
        </section>

        <section className="snap-child carousel-section" ref={algoPanelRef}>
            <Algorithms/>
        </section>

        <section className="snap-child" id="powered-by-section">
            <PoweredBy/>
        </section>

        <section className="snap-child" id="about-us-section">
            <AboutUs/>
        </section>
    </div>
}

export default Home;