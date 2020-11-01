import React from 'react';
import P5Card from './P5Card';
import TensorflowCard from './TensorflowCard';
import ConvNetCard from './ConvNetCard';
import { Animated } from "react-animated-css";

class PoweredBy extends React.Component {
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
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementsByClassName("powered-by")[0];
        if (this.isBottom(wrappedElement)) {
            //Set visible
            this.setState({
                isVisible: true
            });
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    render() {
        return (
            <div className="powered-by">
                <h1 className="powered-by-title">Powered by</h1>
                <div className="columns">
                    <div className="column">
                        <Animated 
                            animationInDelay={0}
                            animationIn="bounceInLeft" 
                            animationOut="fadeOut" 
                            isVisible={this.state.isVisible}>
                            <P5Card/>
                        </Animated>
                    </div>
                    <div className="column">
                        <Animated 
                            animationInDelay={500}
                            animationIn="bounceInLeft" 
                            animationOut="fadeOut" 
                            isVisible={this.state.isVisible}>
                            <TensorflowCard/>
                        </Animated>
                    </div>
                    <div className="column">
                        <Animated 
                            animationInDelay={1000}
                            animationIn="bounceInLeft" 
                            animationOut="fadeOut" 
                            isVisible={this.state.isVisible}>
                            <ConvNetCard/>
                        </Animated>
                    </div>
                </div>
            </div>
        )
    }

}
export default PoweredBy;