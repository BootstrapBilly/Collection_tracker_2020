import React, {useState} from 'react'

import classes from "./Search.module.css"

//components
import ImageUpload from "../../../../Shared Components/Image_upload_/Image_upload"
import Button from "./components/Button"

//assets
import book from "../../../../Assets/Img/book_2020.jpg"
import del from "../../../../Assets/Icons/delete.svg"
import update from "../../../../Assets/Icons/update.svg"
import photo from "../../../../Assets/Icons/camera.svg"
import cog from "../../../../Assets/Icons/settings.svg"

//util
import colours from "../../../../Util/Colours"

export const Search = props => {

    const [options_open, set_options_open] = useState(false)

    const handle_colour_assignment = () => {

       // if(props.condition === "poor") return
        return colours.red
    }

    return (

        <div className={classes.container}>

            <div className={classes.card}>

                <div className={classes.image_container}>

                    {/* <ImageUpload no_style /> */}

                    <img src={book} alt={"book"} className={classes.image} />

                </div>

                <div className={classes.details_container}>

                    <p className={classes.year}>2020</p>
                    <p className={classes.condition} style={{color:handle_colour_assignment()}}>Poor condition</p>
                    <img src={cog} alt={"cog"} className={classes.cog} onClick={()=> set_options_open(!options_open)} />

                </div>

                <div className={[classes.button_container, options_open ? classes.nav_open : null].join(" ")}>

                    <Button src={del} text="Delete"/>
                    <Button src={update} text="Update"/>

                </div>

            </div>

        </div>

    )

}

export default Search
