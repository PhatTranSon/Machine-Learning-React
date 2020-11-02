import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
            <div className="dropdown" style={{margin: "50px"}}>
                <div className="dropdown-trigger">
                    <button className="button menu-button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span><FontAwesomeIcon icon={faBars} size="2x"/></span>
                    </button>
                </div>
    
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                            Chapter 1: Linear regression
                        </a>
                        <a className="dropdown-item">
                            Chapter 2: Logistic regression
                        </a>
                        <a href="#" className="dropdown-item">
                            Chapter 3: Neural Network
                        </a>
                        <a href="#" className="dropdown-item">
                            Chapter 4: K Nearest Neighbors
                        </a>
                        <a href="#" className="dropdown-item">
                            Chapter 5: K Mean clustering
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;