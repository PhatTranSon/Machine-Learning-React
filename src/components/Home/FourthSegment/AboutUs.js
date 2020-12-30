import React from 'react';
import avatar from '../../../images/avatar.png';
import { Animated } from 'react-animated-css';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }

    componentDidMount() {
        document
            .querySelector(".snap-container")
            .addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document
            .querySelector(".snap-container")
            .removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementsByClassName("about")[0];
        if (this.isBottom(wrappedElement)) {
            //Set visible
            this.setState({
                isVisible: true
            });
            document
                .querySelector(".snap-container")
                .removeEventListener('scroll', this.trackScrolling);
        }
    };

    render() {
        return <div className="about">
            <div>
                <h1 className="about-title">About</h1>
                <p className="about-content">
                    The Machine Learning  Illustrated project was created by Phat and Minh, two undergraduates at RMIT university. The goals of this project is to make machine learning algorithms more intuitive and accessible. It is also heavily influenced by <a href="https://seeing-theory.brown.edu/">Seeing Theory</a>
                </p>
                <h1 className="about-title" style={{margin: "30px 0px"}}>Authors</h1>
                <div className="columns">
                    <div className="column">
                        <Animated 
                            animationInDelay={0}
                            animationIn="bounceInLeft" 
                            animationOut="fadeOut" 
                            isVisible={this.state.isVisible}>
                            <img src={avatar} alt="Avatar"/>
                            <a className="about-name">Tran Son Phat</a>
                        </Animated>
                    </div>
                    <div className="column">
                        <Animated 
                            animationInDelay={500}
                            animationIn="bounceInLeft" 
                            animationOut="fadeOut" 
                            isVisible={this.state.isVisible}>
                            <img src={avatar} alt="Avatar"/>
                            <a className="about-name">Pham Hoang Minh</a>
                        </Animated>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default AboutUs;