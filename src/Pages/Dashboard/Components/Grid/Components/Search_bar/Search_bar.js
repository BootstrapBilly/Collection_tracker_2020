import React, {useState} from 'react'

import classes from "./Search_bar.module.css"
import colours from '../../../../../../Util/Colours'

export const Search_bar = props => {

    const [border, set_border] = useState(false)

    return (

        <div className={classes.container}>
            
            <input type="text" className={classes.input} style={{color:colours.dark_blue, border: border && `5px solid ${colours.blue}`}} maxLength="4" onChange={props.handle_filter} value={props.value || ""} onFocus={()=> set_border(true)} onBlur={()=> set_border(false)} />

        </div>

    )

}

export default Search_bar
