export default (props) => {
    return <div>
        <button
            className="button is-primary"
            onClick={() => props.onGenerateClusters()}
            style={{width: "100%"}}>
            Generate clusters
        </button><br/>

        <button
            className="button is-info"
            onClick={() => props.onGenerateCores()}
            style={{width: "100%"}}>
            Restart
        </button>
    </div>
}