import Tilt from 'react-parallax-tilt'
export default function Card({
    card, 
    value, 
    suit, 
    code, 
    cardClickHandler,
    success,
    deckType
    }) {

    let name = ''
    if (suit) {
        name = `${value} (${suit.toLowerCase()})`
    }
    let face = 'back';
    if (success) {
        face = 'front';
    }
    return (
        <Tilt glareEnable={true} glareColor='#a6e244' glareMaxOpacity={0.7} gyroscope={true} glareBorderRadius='0 0 8px 8px'>
            {deckType === 'cards' && 
                <div className={`card ${face} ${deckType}`} onClick={cardClickHandler}>
                    <img src={card} alt={name} id={code}/>
                    {success && 
                        <span className="card-name-container">
                            <p className="card-name">
                                {name}
                            </p>
                        </span>
                    } 
                </div>
            }
            {deckType === 'inscryption' &&
                <div className={`card ${face} ${deckType}`} onClick={cardClickHandler}>
                    <img src={card} alt={value} id={value}/>
                </div>
            }
        </Tilt>
    )
}


