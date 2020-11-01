import React from 'react';

class Menu extends React.Component {
    componentDidMount() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.addEventListener('click', function(event) {
            console.log('clicked');
            event.stopPropagation();
            dropdown.classList.toggle('is-active');
        });
    }

    render() {
        return (
            <div className="dropdown" style={{marginBottom: "30px"}}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Menu</span>
                    </button>
                </div>
    
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                            Chapter 1
                        </a>
                        <a className="dropdown-item">
                            Chapter 2
                        </a>
                        <a href="#" className="dropdown-item">
                            Chapter 3
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;