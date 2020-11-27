import React from 'react';

const RightPanel = (props) => {
    //Get the current child index
    const currentIndex = props.currentIndex;

    return (
        <div className="column is-three-fifths">
            <div className="algo-right-panel">
                {
                    React.Children.map(props.children, (child, index) => {
                        if (index === currentIndex) {
                            return React.cloneElement(child, {
                                style: {
                                    ...child.props.style,
                                    display: "inline-block"
                                }
                            });
                        } else {
                            return React.cloneElement(child, {
                                style: {
                                    ...child.props.style,
                                    display: "none"
                                }
                            });
                        }
                    })
                }
            </div>
        </div>
    );
}

export default RightPanel;