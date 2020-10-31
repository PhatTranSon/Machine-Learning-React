import Navbar from './FirstSegment/Navbar';
import Sketch from './FirstSegment/Sketch';
import Veil from './FirstSegment/Veil';
import Algorithms from './SecondSegment/Algorithms';

const Home = (props) => {
    return <main>
        <Navbar/>

        <div style={{position: "relative"}}>
            <Sketch/>
            <Veil/>
        </div>

        <Algorithms/>
    </main>
}

export default Home;