import React from "react"

import classes from "./Search_result.module.css"

//util
import colours from "../../../../Util/Colours"

//assets
import delete_icon from "../../../../Assets/Icons/delete.svg"
import update from "../../../../Assets/Icons/update.svg"

//components
import Button from "../Button/Button"
import BookImage from "../../../../Shared Components/Image_upload/Image_upload"

const Search_result = props => {

    return (

        <React.Fragment>

            <div className={classes.container}>

                <div className={classes.title_container}>
                    <span className={classes.title}></span>
                </div>

                <span className={classes.year} style={{ backgroundColor: props.best_condition === "poor" ? colours.red : props.best_condition === "fair" ? colours.orange : props.best_condition === "mint" ? colours.green : colours.grey }}>{props.year}</span>

                <div className={classes.image_container}>
                    
                    <BookImage year={props.year} onClickUpload={()=> console.log("yeah bowieid")}/>
                    
                </div>

                <div className={classes.options_container}>

                    <div className={classes.option}>

                        <img src={delete_icon} alt={"An icon"} className={classes.icon} />
                        <span className={classes.text}>DELETE</span>

                    </div>

                    <div className={classes.option}>

                        <img src={update} alt={"An icon"} className={classes.icon} />
                        <span className={classes.text}>UPDATE</span>

                    </div>

                </div>

            </div>

            <div className={classes.button_container}><Button text="Go Back" /></div>

        </React.Fragment>
    )

}

export default Search_result