export default (props) => {
    const onRegenerate = () => {
        props.onRegenerate();
    }

    const onNeighborSubmit = (event) => {
        event.preventDefault();
        props.onSetNeighbors(event.target.neighbors.value);
    }

    return <div>
        <form 
            noValidate 
            autoComplete="off" 
            style={{width: "100%"}}
            onSubmit={onNeighborSubmit}>
                <div className="field has-addons" style={{width: "100%"}}>
                    <div className="control" style={{width: "50%"}}>
                        <input type="text" name="neighbors" className="input"/>
                    </div>
                    <div className="control" style={{width: "50%"}}>
                        <button
                            className="button is-primary"
                            style={{width: "100%"}}>
                            Set neighbors
                        </button>
                    </div>
                </div>
        </form>

        <button
            className="button is-warning"
            style={{width: "100%"}}
            onClick={onRegenerate}>
                Regenerate cores
        </button>
    </div>
}