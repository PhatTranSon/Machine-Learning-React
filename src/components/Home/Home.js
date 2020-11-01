import Navbar from './FirstSegment/Navbar';
import Sketch from './FirstSegment/Sketch';
import Veil from './FirstSegment/Veil';
import Algorithms from './SecondSegment/Algorithms';
import PoweredBy from './ThirdSegment/PoweredBy';

const Home = (props) => {
    return <main>
        <Navbar/>

        <div style={{position: "fixed", zIndex: -999}}>
            <Sketch/>
        </div>

        <div style={{position: "relative", height: "800px"}}>
            <Veil/>
        </div>

        <Algorithms/>
        <PoweredBy/>
    </main>
}

export default Home;