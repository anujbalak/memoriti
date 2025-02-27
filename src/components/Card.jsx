

export default function Card({card, value, suit,cardClickHandler}) {
    console.log(value)
    const name = `${value} (${value.toLowerCase()})`
    return (
        <div className="card" onClick={cardClickHandler}>
            <img src={card} alt={value} id={value}/>
            <span className="card-name-container">
                <p className="card-name">
                    {name}
                </p>
            </span>
        </div>
    )
}