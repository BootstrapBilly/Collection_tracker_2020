import React, { useState } from 'react'

//css
import classes from "./Search_bar.module.css"

//colours
import colours from '../../../../../../Util/Colours'

//assets
import icon from "../../../../../../Assets/Icons/search_bar_icon.svg"
import blue_icon from "../../../../../../Assets/Icons/search_bar_icon_blue.svg"

export const Search_bar = props => {

    const [active, set_active] = useState(false)

    return (

        <div className={classes.container}>

            <input type="text" className={[classes.input, active && classes.active_input].join(" ")} style={{ color: colours.dark_blue }} maxLength="4" onChange={props.handle_filter} value={props.value || ""} onFocus={() => set_active(true)} onBlur={() => set_active(false)} placeholder="Search for a book" name="input" />

  

                <img src={active ? blue_icon : icon} alt="A search icon" className={active ? classes.active_icon : classes.icon} />


        </div>

    )

}

export default Search_bar
