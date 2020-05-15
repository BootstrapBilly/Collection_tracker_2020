import React, { useState } from "react"

//css
import classes from "./Image_upload.module.css"

//assets
import upload from "../../Assets/Icons/upload.svg"

//external
import spinner from "../../Assets/Spinners/Photo_spinner.svg"

//redux hooks
import { useDispatch } from "react-redux"

//components
import Uploader from "./Components/Uploader/Uploader"
import UploadedImage from "./Components/Uploaded_image/Uploaded_image"

//functions
import upload_to_firebase from "./Functions/upload_to_firebase"

export const Image_upload = props => {

    //- config
    const dispatch = useDispatch()

    //*states
    const [state, set_state] = useState({
        preview_selected_image: upload,
        successful_upload: false
    })

    return (

        <div test_handle={props.test_handle} className={classes.container}

            style={{
                // eslint-disable-next-line
                border: (state.successful_upload && "none") || props.no_style && "none",
                margin: props.no_style && "0"
            }}

        >

            {state.successful_upload ? //If an image was uploaded successfully

                <UploadedImage state={state} on_change_photo={() => set_state({ ...state, successful_upload: false })} />


                ://Otherwise, if a photo has not been uploaded

                <Uploader image={state.preview_selected_image || spinner} handle_upload={(event) => upload_to_firebase(event, props.year, props.condition, state, set_state, dispatch)} />

            }

        </div>

    )

}

export default Image_upload

