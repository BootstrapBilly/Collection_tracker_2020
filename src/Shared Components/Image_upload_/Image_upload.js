import React, { useState } from "react"

//css
import classes from "./Image_upload.module.css"

//assets
import upload from "../../Assets/Icons/upload.svg"

//external
import spinner from "../../Assets/Spinners/Photo_spinner.svg"

//util
import colours from "../../Util/Colours"
import { storage } from "../../firebase/index"

//redux hooks
import { useDispatch } from "react-redux"

//redux action creators
import { reload_search_result_action, handle_upload_error_action } from "../../Store/Actions/Photo_upload_handler_action"
import { set_url_in_database } from "../../Store/Actions/Photo_upload_handler_action"

export const Image_upload = props => {

    //- config
    const dispatch = useDispatch()

    //*states
    const [preview_selected_image, set_preview_selected_image] = useState(upload)
    const [successful_upload, set_successful_upload] = useState(false)

    //_functions
    const handle_photo_upload = (event) => {

        console.log(event.target.files[0])

        const upload_task = storage.ref(`images/${props.year.toString()}-${props.condition.toString()}`).put(event.target.files[0])

        set_preview_selected_image(spinner)

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
                storage.ref("images").child(props.year.toString() + "-" + props.condition.toString()).getDownloadURL().then(url => {
                    set_preview_selected_image(url)
                    dispatch(reload_search_result_action({url:url, condition:props.condition}))
                    set_successful_upload(true)
                    dispatch(set_url_in_database({url:url, year:props.year, condition:props.condition}))
                })
            });
    }

    return (

// eslint-disable-next-line
        <div test_handle={props.test_handle} className={classes.container} style={{ border: (successful_upload && "none") || props.no_style && "none", margin:props.no_style && "0"}} >

            {successful_upload ?

                <div className={classes.successful_upload_container}>

                    <img src={preview_selected_image} alt={"An icon"} className={classes.uploaded_image}/>

                    <span onClick={() => set_successful_upload(false)} className={classes.revert_button} style={{ border: `1px solid ${colours.grey}`, color:colours.grey }}>Change Photo</span>

                </div>

                :

                <React.Fragment>

                    <img src={upload} alt={"An icon"} className={classes.icon} style={{ display: preview_selected_image === upload ? "block" : "none"}} />

                    <img src={preview_selected_image} alt={"An icon"} className={classes.preview_img} style={{ display: preview_selected_image === upload ? "none" : "block" }} />

                    <input type="file" name="img" id="img" className={classes.input} style={{ display: "none" }} onChange={(event) => handle_photo_upload(event)} />

                    <label test_handle="image_upload_clickable_area" htmlFor="img" className={classes.clickable_area}><span className={classes.choose_photo}>Choose a photo</span></label>

                </React.Fragment>

            }

        </div>

    )

}

export default Image_upload

