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
    
    let defaultInscryptionData = structuredClone(defaultData)
    defaultInscryptionData = insertInscryptionImage(defaultInscryptionData);
    
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
            if (deckType === 'inscryption') {
                setDeck(defaultInscryptionData)
            } else {
                setDeck(defaultData)
            }
            setTimeout(() => {
                if (deckType === 'inscryption') {
                    if (clickedCard.length === 5) {
                        return setDeck(prepareDeck(inscryptionCards, 6, 16));
                    } else if (clickedCard.length === 10) {
                        return setDeck(prepareDeck(inscryptionCards, 11, 21))
                    }
                }
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
                let newDeck = prepareDeck(inscryptionCards, 0, 10)
                setDeck(newDeck);
            } else {
                setClickedCard([]);
                setBestScore(0)
                setCurrentScore(0);
                setDeck(defaultData);
            }
        }, [deckType, gameFinished])

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
        if (!shuffle) {
            return setDeckType('cards')
        }
    }

    function inscryptionBtnClickHandler() {
        if (!shuffle) {
            return setDeckType('inscryption')
        }
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
                    className={deckType}
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

function EndScreen({ref, currentScore, restartBtnHandler, className}) {
    return (
        <dialog ref={ref} className={className}>
            <p>You guessed {currentScore} times.</p>
            <Button
                name="Restart"
                clickEventHandler={restartBtnHandler}
                className={className}
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

function prepareDeck(deck, startIndex, endIndex) {
    let deckCopy = {};
    let cards = deck.cards.slice(startIndex, endIndex)
    cards = shuffleCards(cards)
    deckCopy = {...deck, cards}
    return deckCopy
}

function insertInscryptionImage(deck) {
    deck.cards.map((card) => {
        return card.image = '/inscryption/back.png'
    })
    return deck
}