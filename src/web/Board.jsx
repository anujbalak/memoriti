/* eslint-disable react/prop-types */
import { useEffect, useState, useRef} from "react";
import Header from "../components/Header";
import Instructions from "../components/instuctions";
import Card from "../components/Card.jsx";
import { shuffleCards } from "../js/Shuffle.js";
import Button from "../components/Button.jsx";
import defaultData from "../js/defaultData.js";
import Inscryption from "../js/inscryption.js";
import Error from "../components/Error.jsx";

export default function Board() {
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0);
    const [shuffle, setShuffle] = useState(false);
    const [deckType, setDeckType] = useState('cards');
    const [error, setError] = useState(false);
    const [clickedCard, setClickedCard] = useState([]);
    const [deck, setDeck] = useState(defaultData);
    const [gameFinished, setGameFinished] = useState(false);
    const getDeck = `https://deckofcardsapi.com/api/deck/new/draw/?count=10`;
 
    const ref = useRef();

    const inscryptionCards = new Inscryption();
    inscryptionCards.buildDeck();
    
    useEffect(() => {
        if (gameFinished) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [gameFinished]);
    
    useEffect(() => {
        if(clickedCard.length % 7 === 0 && deckType === 'cards') {
            fetch(getDeck)
            .then(response => {
                return response.json()      
            })
            .then(data => setDeck(data))
            .catch(e => setError(true))      
        }
    }, [deckType, clickedCard])
        
        useEffect(() => {
            if (error) {
                setDeck(null);
                setTimeout(() => {
                    setError(false);
                    setDeckType('inscryption')
                }, 2000)
            }
        }, [error])

        if (shuffle) {
            const shuffledDeck = shuffleCards(deck.cards)
            setDeck(defaultData)
            setTimeout(() => {
                setDeck({
                    ...deck,
                    shuffledDeck
                })
            }, 1000)
            setShuffle(false);
        }
        
        useEffect(() => {
            if (deckType === 'inscryption') {
                setCurrentScore(0);
                setBestScore(0);
                setClickedCard([]);
                if (clickedCard.length === 5) {
                    prepareDeck(inscryptionCards, setDeck, 6, 15)
                } else if (clickedCard.length === 10) {
                    prepareDeck(inscryptionCards, setDeck, 10, 21)
                } else {
                    prepareDeck(inscryptionCards, setDeck, 0, 10)
                }
                return
            } else {
                setClickedCard([]);
                setBestScore(0)
                setCurrentScore(0);
                setDeck(defaultData);
            }
        }, [deckType])

        function cardClickHandler(e) {
            if (deck.success) {
                manageScore(
                clickedCard, 
                e.target.id,
                currentScore, 
                setCurrentScore,
                bestScore,
                setBestScore
            );
            checkGameStatus(setGameFinished, clickedCard, e.target.id)
            setClickedCard([...clickedCard, e.target.id])
            return setShuffle(true);
        }
    }

    function restartBtnHandler(e) {
        setClickedCard(
            clickedCard.slice(0, 0)
        )
        setCurrentScore(0);
        setGameFinished(false);
    }

    function cardBtnClickHandler() {
        return setDeckType('cards')
    }

    function inscryptionBtnClickHandler() {
        return setDeckType('inscryption')
    }

    return (
        <div className={`boardpage ${deckType}_page`}>
            <div className={`head ${deckType}_head`}>
                <div className="details">
                    <Header
                        currentScore={currentScore}
                        bestScore={bestScore}
                    />
                    <Instructions />
                    <Button
                        name="Cards"
                        clickEventHandler={cardBtnClickHandler}
                        className={deckType}
                    />
                    <Button 
                        name='Inscryption'
                        clickEventHandler={inscryptionBtnClickHandler}
                        className={deckType}
                    />
                </div>
            </div>
            <hr />
            {error && 
                <Error />
            }
            {deck &&
                <Cards
                    deck={deck}
                    cardClickHandler={cardClickHandler}
                    deckType={deckType}
                />
            }
            {gameFinished &&
                <EndScreen 
                    ref={ref}
                    currentScore={currentScore}
                    restartBtnHandler={restartBtnHandler}
                />
            }
        </div>
    )
}

function Cards({deck, cardClickHandler, deckType}) {
    return (
        <>
            {deckType === 'cards' &&
                <div className="cards">
                    {deck.cards.map((card) => {
                        return (
                            <Card 
                                deckType={deckType}
                                success={deck.success}
                                card={card.image}
                                value={card.value}
                                suit={card.suit}
                                key={card.code}
                                code={card.code}
                                cardClickHandler={cardClickHandler}
                                glareColor={'#a6e244'}
                            />
                        )
                    })}
                </div>
            
            }
            {deckType === 'inscryption' &&
                <div className="cards">
                    {deck.cards.map((card) => {
                        return (
                            <Card 
                                deckType={deckType}
                                card={card.image}
                                value={card.alt}
                                key={card.code}
                                suit={''}
                                cardClickHandler={cardClickHandler}
                                glareColor={'#9e6670'}
                            />
                        )
                    })}
                </div>
            }
        
        </>
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
        <dialog ref={ref}>
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

function prepareDeck(deck, setDeck, startIndex, endIndex) {
    let deckCopy = {};
    let cards = deck.cards.slice(startIndex, endIndex)
    cards = shuffleCards(cards)
    deckCopy = {...deck, cards}
    return setDeck(deckCopy)
}