import React from 'react'

import classes from "./Search_bar.module.css"
import colours from '../../../../../../Util/Colours'

export const Search_bar = props => {

    return (

        <div className={classes.container}>
            
            <input type="text" className={classes.input} style={{color:colours.dark_blue}} maxLength="4" onChange={props.handle_filter} value={props.value || ""}/>

        </div>

    )

}

export default Search_bar
