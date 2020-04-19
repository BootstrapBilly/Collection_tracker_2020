import React from "react"

//css
import classes from "./Book_image.module.css"

//assets
import upload from "../../../../../../Assets/Icons/upload.svg"

//util
import colours from "../../../../../../Util/Colours"

const Book_Image = props => {

    return (
        <div className={classes.container}>

            <div className={classes.icon_container} onClick={props.onClickUpload}>

                <img src={upload} alt={"An icon"} className={classes.icon} />
                
                <input type="file" name="file" id="img" className={classes.input} onChange={(event)=> console.log(event.target.files[0])} style={{display:"none"}}/>
                <label for="img" className={classes.choose_file_container}><span className={classes.choose_file}>Choose a file</span></label>

                <span className={classes.upload_image} style={{backgroundColor:colours.grey,boxShadow: `1px 1px 2px 1px ${colours.dark_grey}`}}>Upload Image</span>


            </div>

            

        </div>
    )

}

export default Book_Image