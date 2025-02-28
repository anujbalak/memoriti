/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Instructions from "../components/instuctions";
import Card from "../components/Card.jsx";
import { shuffleCards } from "../logic/Shuffle.js";
import Button from "../components/Button.jsx";

export default function Board() {
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const [clickedCard, setClickedCard] = useState([]);
    const [deck, setDeck] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    const getDeck = `https://deckofcardsapi.com/api/deck/new/draw/?count=10`;
 
    const ref = useRef();

    useEffect(() => {
        if (gameFinished) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [gameFinished]);

    useEffect(() => {
        if(clickedCard.length % 5 === 0) {
            fetch(getDeck)
                .then(response => response.json())
                .then(data => setDeck(data));
        }
    }, [clickedCard, getDeck])

    if (shuffle) {
        const shuffledDeck = shuffleCards(deck.cards)
        setDeck({
            ...deck,
            shuffledDeck
        })
        setShuffle(false);
    }

    function cardClickHandler(e) {
        checkGameStatus(setGameFinished, clickedCard, e.target.id)
        manageScore(
            clickedCard, 
            e.target.id,
            currentScore, 
            setCurrentScore,
            bestScore,
            setBestScore
        );
        setClickedCard([...clickedCard, e.target.id])
        return setShuffle(true);
    }

    function restartBtnHandler(e) {
        setClickedCard(
            clickedCard.slice(0, 0)
        )
        setCurrentScore(0);
        setGameFinished(false);
    }

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
                    cardClickHandler={cardClickHandler}
                />
            }
            <EndScreen 
                ref={ref}
                currentScore={currentScore}
                restartBtnHandler={restartBtnHandler}
            />
        </div>
    )
}

function Cards({deck, cardClickHandler}) {
    return (
        <div className="cards">
            {deck.cards.map((card) => {
                return (
                    <Card 
                        card={card.image}
                        value={card.value}
                        suit={card.suit}
                        key={card.code}
                        code={card.code}
                        cardClickHandler={cardClickHandler}
                    />
                )
            })}
        </div>
    )
}

function manageScore(
    array, 
    value,
    currentScore, 
    setCurrentScore,
    bestScore,
    setBestScore
    ) {

    if (array.every(element => element !== value)) {
        if (currentScore >= bestScore) {
            setBestScore(currentScore + 1)
        }
        setCurrentScore(currentScore + 1)
    }
    return currentScore
}

function EndScreen({ref, currentScore, restartBtnHandler}) {
    return (
        <dialog open ref={ref}>
            <p>You guessed {currentScore} times.</p>
            <Button
                name="Restart"
                clickEventHandler={restartBtnHandler}
            />
        </dialog>
    )
}

function checkGameStatus(setGameFinished, clickedCards, value) {
    if (clickedCards.some((e) => e === value)) {
        setGameFinished(true);
    }
    return
}