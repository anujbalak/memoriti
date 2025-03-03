export default function Button({name, clickEventHandler, className}) {
    return (
        <div className="button-container">
            {className ? 
                <button onClick={clickEventHandler} className={`button ${name}-btn ${className}-btn`} >
                    {name}
                </button>
            :
                <button onClick={clickEventHandler} className={`button ${name}-btn`}>
                    {name}
                </button>
            }
        </div>
    )
}