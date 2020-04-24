import React, {useState} from 'react'

import classes from "./Desktop_add.module.css"

//external
import colours from "../../../Util/Colours"

//components
import Button from "./Components/Button/Button"



//components
//import OptionsBar from "../../../Shared Components/Options_bar/Options_bar"

export const Desktop_add = props => {

    //*states 

    const [current_step, set_current_step] = useState("year")
    const [year, set_year] = useState(null)

    const handle_button_click = () => {

        if(current_step === "year") return set_current_step("condition")

    }

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.form_container}>

                <h5 className={classes.title} style={{ color: colours.dark_blue}}>ADD A NEW BOOK</h5>

                    <span className={classes.form_message}>{current_step === "year" ? "What's the year of the book?" : "What condition is it in?"} </span>

                    {current_step === "year" && <input type="text" name="year" className={classes.form_input} 
                    style={{
                        borderColor: colours.dark_blue, color:colours.dark_blue,
                        width: year && "60px"
                    }} 
                    maxLength="4" placeholder={"Enter year"}
                    onChange={event => set_year(event.target.value)}/>}

                    <Button year={year} onClick={()=> handle_button_click()} current_step={current_step}/>


                </div>

            </div>

        </React.Fragment>
    )

}

export default Desktop_add