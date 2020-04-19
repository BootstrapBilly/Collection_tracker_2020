import React, { useState } from "react"

//css
import classes from "./Book_image.module.css"

//assets
import upload from "../../../../../../Assets/Icons/upload.svg"

//util
import colours from "../../../../../../Util/Colours"
import { production } from "../../../../../../Util/SendRequest"

//external
import { post } from 'axios';


const Book_Image = props => {

    //- config

    //*states
    const [selected_photo, set_selected_photo] = useState(null)

    //_functions
    const handle_photo_upload = () => {

        const url = `${production}upload_photo`

        const formData = new FormData();
        formData.append('file', selected_photo)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        console.log(formData)

        return post(url, formData, config)

    }

    return (
        <div className={classes.container}>

            <div className={classes.icon_container}>

                <img src={upload} alt={"An icon"} className={classes.icon} />

                <input type="file" name="img" id="img" className={classes.input} onChange={(event) => set_selected_photo(event.target.files[0])} style={{ display: "none" }} />

                <label htmlFor="img" className={classes.choose_file_container}>

                    <div className={classes.chosen_photo_container}>

                        {selected_photo ? <span className={classes.chosen_photo}>{selected_photo.name}</span> : <span className={classes.choose_file}>Choose a photo</span>}

                    </div>

                </label>

                <span onClick={() => handle_photo_upload()} className={classes.upload_image} style={{ backgroundColor: colours.blue, boxShadow: `1px 1px 2px 1px ${colours.dark_blue}`, display: selected_photo ? "flex" : "none" }}>Upload Image</span>

            </div>



        </div>
    )

}

export default Book_Image