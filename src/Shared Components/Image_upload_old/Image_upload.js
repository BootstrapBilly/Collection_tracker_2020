import React, { useState } from "react"

//css
import classes from "./Image_upload.module.css"

//assets
import upload from "../../Assets/Icons/upload.svg"

//util
import colours from "../../Util/Colours"
import {storage} from "../../firebase/index"

//redux hooks
import {useDispatch} from "react-redux"

//redux action creators
import {reload_search_result_action, handle_upload_error_action} from "../../Store/Actions/Photo_upload_handler_action"


const File_upload = props => {

    //- config
    const dispatch = useDispatch()

    //*states
    const [selected_photo, set_selected_photo] = useState(null)
    const [preview_selected_image, set_preview_selected_image] = useState(upload)

    //_functions
    const handle_photo_upload = () => {

        const upload_task = storage.ref(`images/${props.year.toString()}`).put(selected_photo)

        upload_task.on("state_changed", 

        (snapshot) => {
            //progress function

        }, 

        (error) => {
            //error function
            dispatch(handle_upload_error_action(error))
        }, 
        
        () => {
            //complete function
            storage.ref("images").child(props.year.toString()).getDownloadURL().then(url => {
                dispatch(reload_search_result_action(url))
            })
        });
    }


    const handle_select_photo = event => {

        set_selected_photo(event.target.files[0])
        set_preview_selected_image(URL.createObjectURL(event.target.files[0]))

    }

    return (

        <div className={classes.container} style={props.style}>

            <div className={classes.icon_container}>

                <img src={preview_selected_image} alt={"An icon"} className={classes.icon} style={{display: preview_selected_image === upload ? "block" : "none"}}/>

                <img src={preview_selected_image} alt={"An icon"} className={classes.preview_img} style={{display: preview_selected_image === upload ? "none" : "block"}}/>

                <input type="file" name="img" id="img" className={classes.input} onChange={(event) => handle_select_photo(event)} style={{ display: "none" }} />

                <label htmlFor="img" className={classes.choose_file_container}>

                    <div className={classes.chosen_photo_container}>

                        {selected_photo ? <span className={classes.chosen_photo_name}>{selected_photo.name}</span> : <span className={classes.choose_file}>Choose a photo</span>}

                    </div>

                </label>

            </div>

            <div className={classes.button_container} style={{ display: selected_photo ? "flex" : "none" }}>

                <input type="file" name="change" id="change" className={classes.input} onChange={(event) => handle_select_photo(event)} style={{ display: "none" }} />

                <label htmlFor="change" className={classes.upload_button} style={{ backgroundColor: colours.red}}>Change</label>

                <span onClick={() => handle_photo_upload()} className={classes.upload_button} style={{ backgroundColor: colours.green}}>Add</span>

            </div>

        </div>
    )

}


export default File_upload