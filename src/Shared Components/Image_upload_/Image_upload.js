import React, { useState } from "react"

//css
import classes from "./Image_upload.module.css"

//assets
import upload from "../../Assets/Icons/upload.svg"

//util
import colours from "../../Util/Colours"
import { storage } from "../../firebase/index"

//redux hooks
import { useDispatch } from "react-redux"

//redux action creators
import { reload_search_result_action, handle_upload_error_action } from "../../Store/Actions/Photo_upload_handler_action"

export const Image_upload = props => {

    //- config
    const dispatch = useDispatch()

    //*states
    const [selected_photo, set_selected_photo] = useState(null)
    const [preview_selected_image, set_preview_selected_image] = useState(upload)
    const [successful_upload, set_successful_upload] = useState(false)

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
                    set_successful_upload(true)
                })
            });
    }


    const handle_select_photo = event => {

        set_selected_photo(event.target.files[0])
        set_preview_selected_image(URL.createObjectURL(event.target.files[0]))

    }


    return (

        <div test_handle={props.test_handle} className={classes.container} style={{ border: successful_upload && "none" }} >

            {successful_upload ?

                <div className={classes.successful_upload_container}>

                    <img src={preview_selected_image} alt={"An icon"} className={classes.uploaded_image} />

                    <span onClick={() => set_successful_upload(false)} className={classes.revert_button} style={{ border: `1px solid ${colours.grey}`, color:colours.grey }}>Change Photo</span>

                </div>
                :

                <React.Fragment>

                    <img src={upload} alt={"An icon"} className={classes.icon} style={{ display: preview_selected_image === upload ? "block" : "none" }} />

                    <img src={preview_selected_image} alt={"An icon"} className={classes.preview_img} style={{ display: preview_selected_image === upload ? "none" : "block" }} />

                    <input type="file" name="img" id="img" className={classes.input} style={{ display: "none" }} onChange={(event) => handle_select_photo(event)} />

                    <label htmlFor="img" className={classes.clickable_area}>{selected_photo ? <span className={classes.chosen_photo_name}>{selected_photo.name}</span> : <span className={classes.choose_photo}>Choose a photo</span>}</label>

                    <div className={classes.button_container} style={{ display: selected_photo ? "flex" : "none" }}>

                        <input type="file" name="change" id="change" className={classes.input} onChange={(event) => handle_select_photo(event)} style={{ display: "none" }} />

                        <label htmlFor="change" className={classes.change_button} style={{ border: `1px solid ${colours.red}`, color: colours.red }}>Change</label>

                        <span onClick={() => handle_photo_upload()} className={classes.upload_button} style={{ backgroundColor: colours.green, border: `1px solid ${colours.green}` }}>Add</span>

                    </div>

                </React.Fragment>

            }

        </div>

    )

}

export default Image_upload

