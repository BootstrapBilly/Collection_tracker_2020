import React, {useState} from "react"
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

const Options_bar = props => {

      //?states
      const [active_icon, set_active_icon] = useState(props.path)

    return (

        <div className={classes.container} onClick={props.onClick}>


                <Option src={active_icon === "/" ? home_active : home} alt={"b"} to={"/"} handleClick={()=> set_active_icon("/")}/>
                <Option src={active_icon === "/add_book" ? add_book_active : add_book} alt={"b"} to={"/add_book"} handleClick={()=> set_active_icon("/add_book")}/>
                <Option src={active_icon === "/search" ? search_active : search} alt={"b"} to={"/search"} handleClick={()=> set_active_icon("/search")}/>
                <Option src={active_icon === "/worth_it" ? worth_it_active : worth_it} alt={"b"} to={"/worth_it"} handleClick={()=> set_active_icon("/worth_it")} />


        </div>

    )

}

export default Options_bar