import React from 'react';
import Panel from './PanelSection';

class PanelChild extends React.Component {
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }

    componentDidMount() {
        document
            .addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document
            .removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById("algo-panel-child" + this.props.index);
        if (this.isBottom(wrappedElement)) {
            //Call props
            this.props.onScrollTo(this.props.index);
        }
    };

    render() {
        return <div className="algo-panel-child" id={"algo-panel-child" + this.props.index}>
            {
                this.props.children
            }
        </div>
    }
}

export default PanelChild;