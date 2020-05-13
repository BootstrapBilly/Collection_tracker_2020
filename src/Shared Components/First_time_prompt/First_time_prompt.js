import React, { useState, useEffect } from 'react'

//external
import Typed from 'react-typed'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom"

//components
import NavBar from "../Options_bar/Options_bar"

//css
import classes from "./First_time_prompt.module.css"

//util
import colours from "../../Util/Colours"

import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { mark_completed } from "../../Store/Actions/Tutorial_action"


export const First_time_prompt = props => {

    const tut_completed = useSelector(state => state.tutorial.completed)

    const dispatch = useDispatch()

    const [hamburger_animated, set_hamburger_animated] = useState(true)
    const [home_animated, set_home_animated] = useState(true)
    const [add_animated, set_add_animated] = useState(false)
    const [search_animated, set_search_animated] = useState(false)

    const [stage_2_text, set_stage_2_text] = useState(1)
    const [stage_3_text, set_stage_3_text] = useState(1)

    const [time_passed, set_time_passed] = useState(false)

    const [tutorial_stage, set_tutorial_stage] = useState(1)

    const [redirect, set_redirect] = useState(false)

    const handle_home_click = () => {

        set_home_animated(false)
        set_tutorial_stage(2)

    }

    const handle_add_click = () => {

        set_add_animated(false)

    }

    const handle_search_click = () => {

        set_search_animated(false)

    }

    const handle_step_2_click = () => {

        set_hamburger_animated(true)
        set_stage_2_text(2)
    }

    const handle_step_3_click = () => {

        set_hamburger_animated(true)
        set_stage_3_text(2)
    }

    const handle_step_2_hamburger_click = () => {

        set_hamburger_animated(false)
        set_add_animated(true)

    }

    const handle_step_3_hamburger_click = () => {

        set_hamburger_animated(false)
        set_search_animated(true)

    }

    const handle_finish_click = () => {

        window.localStorage.setItem("tutorial_complete", true)
        dispatch(mark_completed())

    }

    useEffect(() => {

        set_time_passed(false)

        if (tutorial_stage === 2) {
            setTimeout(() => {
                set_time_passed(true)
            }, 3000);
        }

        if (props.tutorial_stage === 3) {
            setTimeout(() => {
                set_time_passed(true)
            }, 3000);
        }

        if (props.tutorial_stage === 4) {
            setTimeout(() => {
                set_time_passed(true)
            }, 3000);
        }

    }, [tutorial_stage])


    return (

        <React.Fragment>

            {redirect && <Redirect to={{ pathname: '/' }} />}

            {tutorial_stage === 1 && !props.tutorial_stage ?

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
                        home_animated={home_animated} handle_step_1_click={() => handle_home_click()} />

                </div>

                : tutorial_stage === 2 ? time_passed && !props.tutorial_stage &&

                    <div className={classes.prompt_wrapper}>

                        <div className={classes.stage_2_container}>

                            <p className={classes.stage_2_text} style={{ color: colours.dark_blue }}>{stage_2_text === 1 ? "This is the home screen, where you will find various charts and statistics." : "Now click the menu icon again. "}</p>

                            <div className={classes.button} style={{ backgroundColor: colours.dark_blue, display: stage_2_text === 2 && "none" }} onClick={() => handle_step_2_click()}>Okay</div>

                        </div>

                        <div className={classes.overlay}></div>

                        <NavBar tutorial
                            hamburger_animated={hamburger_animated} handle_click={() => handle_step_2_hamburger_click()}
                            add_animated={add_animated} handle_step_2_click={() => handle_add_click()} />

                    </div>


                    : props.tutorial_stage === 3 ? time_passed &&

                        <div className={classes.prompt_wrapper}>

                            <div className={classes.stage_2_container}>

                                <p className={classes.stage_2_text} style={{ color: colours.dark_blue }}>{stage_3_text === 1 ? "This is the add screen. Here you can add new books." : "Now click the menu icon again. "}</p>

                                <div className={classes.button} style={{ backgroundColor: colours.dark_blue, display: stage_3_text === 2 && "none" }} onClick={() => handle_step_3_click()}>Okay</div>

                            </div>

                            <div className={classes.overlay}></div>

                            <NavBar tutorial
                                hamburger_animated={hamburger_animated} handle_click={() => handle_step_3_hamburger_click()}
                                search_animated={search_animated} handle_step_3_click={() => handle_search_click()} />

                        </div>

                        : props.tutorial_stage === 4 ? time_passed &&

                            <div className={classes.prompt_wrapper}>

                                <div className={classes.stage_2_container}>

                                    <p className={classes.stage_2_text} style={{ color: colours.dark_blue }}>{"This is the search screen. Here you can search for your books."}</p>

                                    <Link to={"/"} test-handle={props.test_handle} style={{ textDecoration: 'none' }}>
                                        <div className={classes.button} style={{ backgroundColor: colours.dark_blue }} onClick={() => handle_finish_click()}>Finish</div>
                                    </Link>

                                </div>

                                <div className={classes.overlay}></div>

                            </div>


                            : null
            }
        </React.Fragment>

    )

}

export default First_time_prompt
