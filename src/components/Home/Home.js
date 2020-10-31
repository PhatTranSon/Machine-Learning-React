import Navbar from './Navbar';
import Sketch from './Sketch';
import Veil from './Veil';

const Home = (props) => {
    return <main>
        <Navbar/>
        <div style={{
            position: "relative"
        }}>
            <Sketch/>
            <Veil/>
        </div>
    </main>
}

export default Home;