import React from 'react'

import classes from "./Uploaded_image.module.css"

//assets
import spinner from "../../../../Assets/Spinners/Photo_spinner.svg"

//util
import colours from "../../../../Util/Colours"

export const Uploaded_image = props => {

    return (

        <div className={classes.successful_upload_container}>

            <img src={props.state.image || spinner} alt={"An icon"} className={classes.uploaded_image} />

            {/* option to upload the photo again*/}
            <span onClick={props.on_change_photo} 
            className={classes.revert_button} style={{ border: `1px solid ${colours.grey}`, color: colours.grey }}>Change Photo</span>

        </div>

    )

}

export default Uploaded_image
