export default (props) => {
    const onRegenerate = () => {
        props.onRegenerate();
    }

    const onNeighborSubmit = (event) => {
        event.preventDefault();
        props.onSetNeighbors(event.target.neighbors.value);
    }

    return <div className="columns">
        <div className="column is-three-fifths">
            <form 
                noValidate 
                autoComplete="off" 
                onSubmit={onNeighborSubmit}
                style={{width: "100%"}}>
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                type="text"
                                name="neighbors" 
                                placeholder="Enter the number of neighbors (K)"
                                className="input"/>
                        </div>
                        <div className="control" style={{width: "50%"}}>
                            <button
                                className="button is-primary"
                                style={{width: "100%", background: "#b7e4c7"}}>
                                Set neighbors
                            </button>
                        </div>
                    </div>
            </form>
        </div>

        <div className="column is-two-fifths">
            <button
                className="button"
                style={{width: "100%", background: "#52b788", color: "white"}}
                onClick={onRegenerate}>
                    Regenerate cores
            </button>
        </div>
    </div>
}