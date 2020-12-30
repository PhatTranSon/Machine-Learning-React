const Navbar = (props) => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{zIndex: 1}}>
            <div className="navbar-menu"
                style={{"flex-grow": 1, "justify-content": "center"}}>
                <a onClick={() => props.onAlgorithmClick()} className="navbar-item navbar-underlined">
                    Algorithms
                </a>
            </div>
        </nav>
    );
}

export default Navbar;