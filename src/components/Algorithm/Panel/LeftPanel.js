import React from 'react';

const LeftPanel = (props) => {
    //Create an event handler
    const onScrollTo = (index) => {
        //Call parent
        props.onScrollTo(index);
    }

    //Create new children
    const childrenWithProps = React.Children.map(props.children, child => {
        //Pass methods to children
        const props = { 
            onScrollTo
         };
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
        return child;
    })

    return (
        <div className="column is-two-fifths algo-left-panel" style={props.style}>
            {
                childrenWithProps
            }
        </div>
    )
}

export default LeftPanel;