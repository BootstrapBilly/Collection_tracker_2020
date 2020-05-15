import React, { useState } from "react"

//css
import classes from "./Navigation.module.css"

//components
import Navlink from "./Nav_link/Nav_link"

//assets
import home from "../../Assets/Icons/home.svg"
import home_active from "../../Assets/Icons/home-active.svg"
import add_book from "../../Assets/Icons/add-book.svg"
import add_book_active from "../../Assets/Icons/add-book-active.svg"
import search from "../../Assets/Icons/search.svg"
import search_active from "../../Assets/Icons/search-active.svg"
import menu from "../../Assets/Icons/menu.svg"

const Navigation = props => {

    //?states
    const [active_icon, set_active_icon] = useState(props.path) //holds the active icon, which changes background colour when activated
    const [overlay_open, set_overlay_open] = useState(false) //Holds the status of the overlay

    return (

        <React.Fragment>

            {/* The hamburger menu icon */}

            <img test_handle="nav_menu_icon" src={menu} alt={"A menu icon"}

                className={[classes.open_icon,
                props.hamburger_animated && props.delay ? classes.animated //if the hamburger is animated with delay - 1st step of tutorial
                    : props.hamburger_animated && classes.animated_no_delay].join(" ")} //if the hamburger is animated with no delay - Other steps of tutorial
                    
                onClick={() => set_overlay_open(!overlay_open)} //onclick, toggle the overlay
                onMouseDown={props.handle_click}
                onTouchStart={props.handle_click}

            />

            {/* The navigation overlay */}

            <div test_handle="nav_overlay" className={[classes.overlay, overlay_open && classes.overlay_open].join(" ")} onClick={() => set_overlay_open(false)}>

                {overlay_open &&

                    <div className={classes.container}>

                        <span className={classes.prompt_message}>Where would you like to go?</span>

                        <div className={classes.icon_container}>

                            <Navlink

                                test_handle="nav_home_icon" alt={"b"} to={"/"} text="Home"
                                src={active_icon === "/" ? home_active : home}

                                handleClick={() => set_active_icon("/")} //used to change the background colour by setting it to the active icon
                                onClick={props.tutorial ? props.handle_step_1_click : props.onClickIcon}//callback on click (handled by parent component)

                                additional_class={props.home_animated && classes.animated_no_delay_small}//additional class applied during tutorial

                            />

                            <Navlink

                                test_handle="nav_add_book_icon" alt={"b"} to={"/add_book"} text="Add Book"
                                src={active_icon === "/add_book" ? add_book_active : add_book}

                                handleClick={() => set_active_icon("/add_book")}//used to change the background colour by setting it to the active icon
                                onClick={props.tutorial ? props.handle_step_2_click : props.onClickIcon}//callback on click (handled by parent component)

                                additional_class={props.add_animated && classes.animated_no_delay_small}//additional class applied during tutorial

                            />

                            <Navlink

                                test_handle="nav_search_icon" alt={"b"} to={"/search"} text="Find Book"
                                src={active_icon === "/search" ? search_active : search}

                                handleClick={() => set_active_icon("/search")}
                                onClick={props.tutorial ? props.handle_step_3_click : props.onClickIcon}//callback on click (handled by parent component)

                                additional_class={props.search_animated && classes.animated_no_delay_small}

                            />

                        </div>

                    </div>}

            </div>

        </React.Fragment>

    )

}

export default Navigation