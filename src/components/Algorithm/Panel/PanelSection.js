import React from 'react';

const Panel = (props) => {
    //Props to handle scroll to
    const onScrollTo = (index) => {
        props.onScrollTo(index);
    }

    //Get new child with props
    const childrenWithProps = React.Children.map(props.children, (child, index) => {
        //Set props to only the LeftPanel
        if (index === 0 && React.isValidElement(child)) {
            //Set props
            const newProps = {
                ...child.props,
                onScrollTo
            }

            return React.cloneElement(child, newProps);
        }
        return child;
    });

    //Use React.cloneElements to pass props to children
    return <div className="columns algorithm-panel">
        {
            childrenWithProps
        }
    </div>
}

export default Panel;