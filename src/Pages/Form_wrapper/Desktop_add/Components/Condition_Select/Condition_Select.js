import React from 'react'

import classes from "./Condition_Select.module.css"
import Condition from './Condition/Condition'

export const Condition_Select = props => {

    return (

        <div className={classes.container}>

            {props.available_conditions.map(condition =>

                <Condition

                    key={condition}
                    type={condition}
                    selected_condition={props.selected_condition}
                    
                    on_select_condition={props.on_select_condition}

                    />

            )}

        </div>
    )

}

export default Condition_Select