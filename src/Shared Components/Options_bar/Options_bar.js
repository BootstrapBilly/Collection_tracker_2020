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
import menu from "../../Assets/Icons/menu.svg"

const Options_bar = props => {

    //?states
    const [active_icon, set_active_icon] = useState(props.path)
    const [overlay_open, set_overlay_open] = useState(false)

    return (

        <React.Fragment>

            <img test_handle="nav_menu_icon" src={menu} alt={"A menu icon"} className={classes.open_icon} onClick={() => set_overlay_open(!overlay_open)}/>

                <React.Fragment>

                    <div test_handle="nav_overlay" className={[classes.overlay, overlay_open && classes.overlay_open].join(" ")} onClick={()=> set_overlay_open(false)}>

                        {overlay_open &&
                        
                        <div className={classes.container}>

                        <span className={classes.prompt_message}>Where would you like to go?</span>

                        <div className={classes.icon_container}>

                            <Option test_handle="nav_home_icon" src={active_icon === "/" ? home_active : home} alt={"b"} to={"/"} handleClick={() => set_active_icon("/")} text="Home" onClick={props.onClickIcon} />
                            <Option test_handle="nav_add_book_icon" src={active_icon === "/add_book" ? add_book_active : add_book} alt={"b"} to={"/add_book"} handleClick={() => set_active_icon("/add_book")} text="Add Book" onClick={props.onClickIcon}/>
                            <Option test_handle="nav_search_icon" src={active_icon === "/search" ? search_active : search} alt={"b"} to={"/search"} handleClick={() => set_active_icon("/search")} text="Find Book" onClick={props.onClickIcon}/>

                        </div>

                    </div>}

                    </div>



                </React.Fragment>

            

        </React.Fragment>

    )

}

export default Options_bar