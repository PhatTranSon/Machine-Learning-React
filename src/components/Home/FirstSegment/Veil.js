import { Link } from 'react-router-dom';

const Veil = (props) => {
    return (
        <div 
            style={
                {
                    minHeight: "90vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }
            }
        >
            <div>
                <h1 className="home-title">Algorithms</h1>
                <h2 className="home-subtitle">Machine learning illustrated</h2>
                <Link 
                    className="button is-white home-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}
                    to="/chapter1">
                    Explore
                </Link>
            </div>
        </div>
    )
}

export default Veil;