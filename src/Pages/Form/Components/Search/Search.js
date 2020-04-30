import React, {useState} from 'react'

import classes from "./Search.module.css"

//components
import ImageUpload from "../../../../Shared Components/Image_upload_/Image_upload"
import Button from "./components/Button"
import BackButton from "../Button/Button"

//assets
import default_image from "../../../../Assets/Img/default_search_image.png"
import del from "../../../../Assets/Icons/delete.svg"
import update from "../../../../Assets/Icons/update.svg"
import photo from "../../../../Assets/Icons/camera.svg"
import cog from "../../../../Assets/Icons/settings.svg"
import spinner from "../../../../Assets/Spinners/Photo_spinner.svg"

//util
import colours from "../../../../Util/Colours"
import { storage } from "../../../../firebase/index"

export const Search = props => {

    const [image, set_image] = useState(spinner)

    storage.ref("images").child(props.year.toString()).getDownloadURL()
    .then(response => set_image(response))
    .catch(err => set_image(default_image))

    const [options_open, set_options_open] = useState(false)

    const handle_colour_assignment = () => {

       if(props.condition === "Poor") return colours.red
       if(props.condition === "Fair") return colours.orange
       if(props.condition === "Mint") return colours.green

    }

    return (

        <div className={classes.container}>

            <div className={classes.card}>

                <div className={classes.image_container} style={{backgroundColor:handle_colour_assignment()}}>

                    {/* <ImageUpload no_style /> */}

                    <img src={image} alt={"book"} className={classes.image} />

                </div>

                <div className={classes.details_container}>

                    <p className={classes.year}>{props.year}</p>
                    <p className={classes.condition} style={{color:handle_colour_assignment()}}>{props.condition} condition</p>
                    <img src={cog} alt={"cog"} className={classes.cog} onClick={()=> set_options_open(!options_open)} />

                </div>

                <div className={[classes.button_container, options_open ? classes.nav_open : null].join(" ")}>

                    <Button src={del} text="Delete"/>
                    <Button src={update} text="Update"/>

                </div>

            </div>

            <BackButton text="Go Back" onClick={props.on_back_click}/>

        </div>

    )

}

export default Search
