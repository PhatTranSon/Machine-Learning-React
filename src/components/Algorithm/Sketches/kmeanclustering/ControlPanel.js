export default (props) => {
    return <div>
        <button
            className="button"
            onClick={() => props.onGenerateClusters()}
            style={{width: "100%", background: "#ecbcfd", color: "white"}}>
            Generate clusters
        </button><br/>

        <button
            className="button is-info"
            onClick={() => props.onGenerateCores()}
            style={{width: "100%", background: "#ffafcc", color: "white"}}>
            Restart
        </button>
    </div>
}