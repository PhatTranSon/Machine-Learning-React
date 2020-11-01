import Navbar from './FirstSegment/Navbar';
import Sketch from './FirstSegment/Sketch';
import Veil from './FirstSegment/Veil';
import Algorithms from './SecondSegment/Algorithms';
import PoweredBy from './ThirdSegment/PoweredBy';

const Home = (props) => {
    return <div className="snap-container">
        <div style={{position: "fixed", zIndex: -999}}>
            <Sketch/>
        </div>

        
        <section className="snap-child">
            <Navbar/>
            <div style={{position: "relative", height: "800px"}}>
                <Veil/>
            </div>
        </section>

        <section className="snap-child carousel-section">
            <Algorithms/>
        </section>

        <section className="snap-child" id="powered-by-section">
            <PoweredBy/>
        </section>
    </div>
}

export default Home;