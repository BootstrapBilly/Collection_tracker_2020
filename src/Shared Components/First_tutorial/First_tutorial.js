import React, { useState } from 'react'

//css
import classes from "./First_tutorial.module.css"

//external
import Typed from 'react-typed'

//util
import colours from "../../Util/Colours"

//components
import NavBar from "../Navigation/Navigation"
import CLICK_PREVENTION_OVERLAY from "../Click_prevention_overlay/Click_prevention_overlay"

export const First_tutorial = props => {

    //*states
    const [hamburger_animated, set_hamburger_animated] = useState(true)

    return (

        <React.Fragment>

                <div className={classes.container}>

                    <Typed className={classes.text} style={{ color: colours.dark_blue }}
                        strings={['Welcome to the collection tracker!']}
                        typeSpeed={30} showCursor={false}
                    />

                    <Typed className={classes.text} style={{ color: colours.dark_blue }}
                        strings={['You can navigate via the menu icon.']}
                        typeSpeed={30} startDelay={4000} showCursor={false}
                    />

                    <Typed className={classes.text} style={{ color: colours.dark_blue }}
                        strings={['Give it a try.']}
                        typeSpeed={30} startDelay={8000} showCursor={false}
                    />

                    <NavBar tutorial delay
                        hamburger_animated={hamburger_animated} handle_click={() => set_hamburger_animated(false)}
                        home_animated={true} handle_step_1_click={props.handle_completion} />

                    <CLICK_PREVENTION_OVERLAY />

                </div>

        </React.Fragment>

    )

}

export default First_tutorial
