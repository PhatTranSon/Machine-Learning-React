const Navbar = (props) => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu"
                style={{"flex-grow": 1, "justify-content": "center"}}>
                <a className="navbar-item navbar-underlined">
                    Home
                </a>

                <a className="navbar-item navbar-underlined">
                    Algorithms
                </a>
            </div>
        </nav>
    );
}

export default Navbar;