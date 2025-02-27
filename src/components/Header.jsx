/* eslint-disable react/prop-types */
import Title from "./title";

export default function Header({currentScore, bestScore}) {
    return (
        <header className="header-container">
            <Title

            />
            <Score
                name="current"
                score={currentScore}
            />
            <Score
                name="best"
                score={bestScore}
            />
        </header>
    )
}

function Score({name, score}) {
    const capitalizeName = name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
    return (
        <div className={`${name} score-container`}>
            <span className={`${name} score`}>
                {`${capitalizeName} score: ${score}`}
            </span>
        </div>
    )
}