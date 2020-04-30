import React, { useState } from "react"
import classes from "./Options_bar.module.css"

//components
import Option from "./Option/Option"

//assets
import home from "../../Assets/Icons/home.svg"
import home_active from "../../Assets/Icons/home-active.svg"
import add_book from "../../Assets/Icons/add-book.svg"
import add_book_active from "../../Assets/Icons/add-book-active.svg"
import search from "../../Assets/Icons/search.svg"
import search_active from "../../Assets/Icons/search-active.svg"
import worth_it from "../../Assets/Icons/worth-it.svg"
import worth_it_active from "../../Assets/Icons/worth-it-active.svg"
import menu from "../../Assets/Icons/menu.svg"

const Options_bar = props => {

    //?states
    const [active_icon, set_active_icon] = useState(props.path)
    const [overlay_open, set_overlay_open] = useState(false)

    return (

        <React.Fragment>

            <img test_handle="nav_menu_icon" src={menu} alt={"A menu icon"} className={classes.open_icon} onClick={() => set_overlay_open(!overlay_open)}/>

            {overlay_open &&

                <React.Fragment>

                    <div test_handle="nav_overlay" className={classes.overlay} onClick={()=> set_overlay_open(false)}>

                        <div className={classes.container}>

                            <span className={classes.prompt_message}>Where would you like to go?</span>

                            <div className={classes.icon_container}>

                                <Option test_handle="nav_home_icon" src={active_icon === "/" ? home_active : home} alt={"b"} to={"/"} handleClick={() => set_active_icon("/")} text="Home" />
                                <Option test_handle="nav_add_book_icon" src={active_icon === "/add_book" ? add_book_active : add_book} alt={"b"} to={"/add_book"} handleClick={() => set_active_icon("/add_book")} text="Add Book" />
                                <Option test_handle="nav_search_icon" src={active_icon === "/search" ? search_active : search} alt={"b"} to={"/search"} handleClick={() => set_active_icon("/search")} text="Search" />
                                <Option test_handle="nav_worth_icon" src={active_icon === "/worth_it" ? worth_it_active : worth_it} alt={"b"} to={"/worth_it"} handleClick={() => set_active_icon("/worth_it")} text="Worth It" />

                            </div>

                        </div>

                    </div>



                </React.Fragment>

            }

        </React.Fragment>

    )

}

export default Options_bar