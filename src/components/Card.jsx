
export default function Card({
    card, 
    value, 
    suit, 
    code, 
    cardClickHandler,
    success
    }) {

    const name = `${value} (${suit.toLowerCase()})`
    let face = 'back';
    if (success) {
        face = 'front';
    }
    return (
        <div className="card-container" >
            <div className={`card ${face}`} onClick={cardClickHandler}>
                <img src={card} alt={name} id={code}/>
                {success && 
                    <span className="card-name-container">
                        <p className="card-name">
                            {name}
                        </p>
                    </span>
                }
                
            </div>
        </div>
    )
}


