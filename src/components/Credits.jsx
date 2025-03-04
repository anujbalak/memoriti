import Button from "./Button";

export default function Credits({creditCloseBtnHandler, className, credit}) {
    if (className === 'cards') {
        className = 'cards-c'
    }
    return (
        <>
            <div className={`credits ${className} ${credit}`}>
                <Button
                    name="➡"
                    className={`credits-btn close ${className}`}
                    clickEventHandler={creditCloseBtnHandler}
                />
                <h3 className="helpers">
                    Our Helpers
                </h3>
                <p className="credit-note">
                    All the cards belong to the respectable owners, I used them for education purpose only, and big thanks to them.
                </p>
                <div className={`inscryption-link ${className}`}>
                    <a href="https://www.inscryption.com/">Inscryption: </a>
                    <span>A great game!</span>
                </div>
                <div className={`deckofcards-link ${className}`}>
                    <a href="https://deckofcardsapi.com/">Deck of Cards: </a>
                    <span>Thank you dev!</span>
                </div>
                <div className={`github-link ${className}`}>
                    <a href="https://github.com/anujbalak/memoriti">Github Repo</a>
                </div>
            </div>
        
        </>
    )
}