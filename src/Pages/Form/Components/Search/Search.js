import React, {useState} from 'react'

import classes from "./Search.module.css"

//components
import Button from "./components/Button"
import BackButton from "../Button/Button"

//assets
import default_image from "../../../../Assets/Img/default_search_image.png"
import del from "../../../../Assets/Icons/delete.svg"
import update from "../../../../Assets/Icons/update.svg"

import cog from "../../../../Assets/Icons/settings.svg"
import spinner from "../../../../Assets/Spinners/Photo_spinner.svg"

//util
import colours from "../../../../Util/Colours"
import { storage } from "../../../../firebase/index"

//redux hooks
import {useDispatch} from "react-redux"

//redux action creators
import { submit_form } from "../../../../Store/Actions/Submit_form_action"

export const Search = props => {

    //-Config
    const dispatch = useDispatch()

    storage.ref("images").child(props.year.toString()).getDownloadURL()
    .then(response => set_image(response))
    .catch(err => set_image(default_image))

    //*states
    const [image, set_image] = useState(spinner)

    const [options_open, set_options_open] = useState(false)

    const handle_colour_assignment = () => {

       if(props.condition === "Poor") return colours.red
       if(props.condition === "Fair") return colours.orange
       if(props.condition === "Mint") return colours.green
       if(props.missing) return colours.grey

    }

    const handle_condition_assignment = () => {

        if(props.missing) return "Missing"

        else return `${props.condition} condition`
    }

    const handle_delete = () => {

        dispatch(submit_form({ year: props.year, condition: props.condition }, "delete_book"))
    
    }

    return (

        <div className={classes.container}>

            <div className={classes.card} test_handle="book_card">

                <div className={classes.image_container} style={{backgroundColor:handle_colour_assignment()}}>

                    {/* <ImageUpload no_style /> */}

                    <img src={image} alt={"book"} className={classes.image} />

                </div>

                <div className={classes.details_container}>

                    <p className={classes.year}>{props.year}</p>
                    <p  test_handle="book_condition" className={classes.condition} style={{color:handle_colour_assignment()}}>{handle_condition_assignment()}</p>
                    <img test_handle="book_options_cog" src={cog} alt={"cog"} className={classes.cog} onClick={()=> set_options_open(!options_open)} style={{display:props.missing ? "none" : "block"}} />

                </div>

                <div className={[classes.button_container, options_open ? classes.nav_open : null].join(" ")}>

                    <Button src={del} text="Delete" handle_click={()=> handle_delete()} test_handle="delete_book"/>
                    <Button src={update} text="Update"/>

                </div>

            </div>

            <BackButton text="Go Back" onClick={props.on_back_click} test_handle="go_back_button"/>

        </div>

    )

}

export default Search
