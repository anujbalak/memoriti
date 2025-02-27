/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Instructions from "../components/instuctions";
import Card from "../components/Card.jsx";

export default function Board() {
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0);

    const [deck, setDeck] = useState(null);
    const getDeck = `https://deckofcardsapi.com/api/deck/new/draw/?count=10`;
    
    useEffect(() => {
        fetch(getDeck)
            .then(response => response.json())
            .then(data => setDeck(data));
    }, [])
    
    return (
        <div className="boardpage">
            <Header
                currentScore={currentScore}
                bestScore={bestScore}
            />
            <Instructions />
            <hr />
            {deck &&
                <Cards
                    deck={deck}
                />
            }
        </div>
    )
}

function Cards({deck}) {
    return (
        <div className="cards">
            {deck.cards.map(i => {
                console.log(i)
            })}
            {deck.cards.map((card) => {
                return (
                    <Card 
                        card={card.image}
                        value={card.value}
                        suit={card.suit}
                        key={card.code}
                    />
                )
            })}
        </div>
    )
}