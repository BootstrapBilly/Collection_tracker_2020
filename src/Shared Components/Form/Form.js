import React from "react"

import classes from "./Form.module.css"

//components
import Input from "./Components/Input_box/Input_box"
import ConditionCircle from "./Components/Condition_circle/Condition_circle"
import Button from "./Components/Button/Button"

//util
import colours from "../../Util/Colours"

const Form = props => {

    return (

        <div className={classes.form}>

            <div className={classes.input_container}>

                <Input title="Year of book" onFocus={props.onFocus}/>

                <div className={classes.circle_title} style={{color:colours.blue}}>Condition of book :</div>
                
                <div className={classes.circle_container}>

                    <ConditionCircle colour={colours.red} text="Poor"/>
                    <ConditionCircle colour={colours.orange} text="Fair"/>
                    <ConditionCircle colour={colours.green} text="Mint"/>

                </div>

                <div className={classes.button_container}>

                <Button text={props.button_text}/>

                </div>

            </div>

        </div>

    )

}

export default Form