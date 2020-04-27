import React, { useState, useEffect } from "react"

import classes from "./Search_result.module.css"

//util
import colours from "../../../../Util/Colours"
import { storage } from "../../../../firebase/index"

//assets
import delete_icon from "../../../../Assets/Icons/delete.svg"
import update from "../../../../Assets/Icons/update.svg"
import check from "../../../../Assets/Icons/check.svg"
import add from "../../../../Assets/Icons/add-book.svg"

//components
import Button from "../Button/Button"
import BookImage from "../../../../Shared Components/Image_upload_old/Image_upload"
import Alert from "../../../../Shared Components/Alert/Alert"
import EditPanel from "./components/Edit_panel"

//redux hooks
import { useSelector } from "react-redux"

const Search_result = props => {

    //*states
    const [image, set_image] = useState(null)
    const [image_exists, set_image_exists] = useState(null)
    const [error_feedback, set_error_feedback] = useState([null, "hidden"])
    const [edit_mode, set_edit_mode] = useState(false)

    //?Selectors
    const successful_upload = useSelector(state => state.upload.last_uploaded_photo)
    const failed_upload = useSelector(state => state.upload.error)

    useEffect(() => {

        if (!failed_upload) {

            storage.ref("images").child(props.year.toString()).getDownloadURL()

                .then(url => {
                    set_image_exists(true)
                    set_image(url)
                })

                .catch(error => set_image_exists(false))

        }

        else {set_error_feedback(["Photo upload error, make sure it is a png or jpg image", "error"])}

        // eslint-disable-next-line
    }, [successful_upload, failed_upload])

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.title_container}>
                    <span className={classes.title}></span>
                </div>

                <span className={classes.year} style={{ backgroundColor: props.best_condition === "poor" ? colours.red : props.best_condition === "fair" ? colours.orange : props.best_condition === "mint" ? colours.green : colours.grey }}>{props.year}</span>

                <div className={classes.image_container}>

                    {edit_mode ? 
                    
                    <EditPanel 
                    selected_condition={props.selected_condition}
                    set_selected_condition={props.set_selected_condition}
                    
                    /> 
                    
                    : image_exists ? <img src={image} alt={"yeah"} className={classes.uploaded_image} /> 

                    : 
                    
                    <BookImage year={props.year} onClickUpload={() => console.log("yeah bowieid")} />
                    
                    }

                </div>

                <div className={classes.options_container}>

                    <div className={classes.option}>

                        <img src={edit_mode ? add : delete_icon} alt={"An icon"} className={classes.icon} />
                        <span className={classes.text}>{edit_mode ? "NEW PHOTO" : "DELETE"}</span>

                    </div>

                    <div className={classes.option}>

                        <img src={edit_mode ? check : update} alt={"An icon"} className={classes.icon} onClick={()=> set_edit_mode(!edit_mode)}/>
                        <span className={classes.text}>{edit_mode ? "SAVE" : "EDIT"}</span>

                    </div>

                </div>

            </div>

            <div className={classes.button_container}><Button text="Go Back" handle_submit={() => edit_mode ? set_edit_mode(false) : window.location.reload()} width="120px" /></div>

            {<Alert message={error_feedback[0]} type={error_feedback[1]} />}

        </React.Fragment>
    )

}

export default Search_result