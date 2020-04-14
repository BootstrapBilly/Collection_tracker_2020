import React, {useState} from "react"

import classes from "./Add_book.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Form from "../../Shared Components/Form/Form"


//assets
import book from "../../Assets/Img/books.svg"

const Add_book = props => {

    //*states
    const [input_focus, set_input_focus] = useState(false)

    return (

        <div className={classes.container}>

            <Form title="Add Book" button_text="Add Book" onFocus={()=> set_input_focus(true)}/>

            <OptionsBar path={props.location.pathname} />

            <div className={classes.image_container} style={{display:input_focus ? "none" : "flex"}}>

                <img src={book} alt="A book" className={classes.image}/>

            </div>

        </div>
    )

}

export default Add_book