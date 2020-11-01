const RightPanel = (props) => {
    //Get the current child index
    const currentIndex = props.currentIndex;

    return (
        <div className="column is-three-fifths">
            <div className="algo-right-panel">
                {
                    props.children[currentIndex] || null
                }
            </div>
        </div>
    );
}

export default RightPanel;