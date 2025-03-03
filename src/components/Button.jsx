export default function Button({name, clickEventHandler}) {
    return (
        <div className="button-container">
            <button onClick={clickEventHandler} className={`button ${name}-btn`}>
                {name}
            </button>
        </div>
    )
}