import Title from "../components/title.jsx"
import Instructions from "../components/instuctions.jsx"
import Button from "../components/Button.jsx"
import { useState } from "react"

export default function Home({playBtnHandler}) {

    return (
        <div className="homepage">
            <Title />
            <Instructions />
            <Button
                name="Play"
                clickEventHandler={playBtnHandler}
            />
        </div>
    )
}