

export default function Card({card, value, suit, code, cardClickHandler}) {
    const name = `${value} (${suit.toLowerCase()})`
    return (
        <div className="card" onClick={cardClickHandler}>
            <img src={card} alt={name} id={code}/>
            <span className="card-name-container">
                <p className="card-name">
                    {name}
                </p>
            </span>
        </div>
    )
}