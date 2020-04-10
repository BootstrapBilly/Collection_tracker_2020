import React from "react"
import classes from "./Options_bar.module.css"

//components
import Option from "./Option/Option"

//assets
import home_active from "../../Assets/Icons/home-active.svg"
import add_book from "../../Assets/Icons/add-book.svg"
import add_book_active from "../../Assets/Icons/add-book-active.svg"
import search from "../../Assets/Icons/search.svg"
import search_active from "../../Assets/Icons/search-active.svg"
import worth_it from "../../Assets/Icons/worth-it.svg"
import worth_it_active from "../../Assets/Icons/worth-it-active.svg"

const Options_bar = props => {

    return (

        <div className={classes.container}>


                <Option src={home_active} alt={"b"} />
                <Option src={add_book} alt={"b"} />
                <Option src={search} alt={"b"} />
                <Option src={worth_it} alt={"b"} />


        </div>

    )

}

export default Options_bar