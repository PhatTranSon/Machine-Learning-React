const Veil = (props) => {
    return (
        <div 
            style={
                {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    height: "90%",
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
                <a 
                    className="button is-white home-button"
                    style={{marginTop: "1.5em", paddingLeft: "2em", paddingRight: "2em"}}>
                    Explore
                </a>
            </div>
        </div>
    )
}

export default Veil;