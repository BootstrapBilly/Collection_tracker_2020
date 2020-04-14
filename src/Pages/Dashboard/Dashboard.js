import React from "react"

import classes from "./Dashboard.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import BooksOwned from "./Components/Small_donut/Small_donut"
import ConditionCard from "./Components/Condition_card/Condition_card"

//util
import colours from "../../Util/Colours"
import compute_dimensions from "./functions/compute_dimensions"

const Dashboard = props => {

    //-Config

    const { innerWidth: width, innerHeight: height } = window;//get the dimensions of the window

    
    console.log(height)
    console.log(width)

    const circumference = { mobile: "628", long_mobile: "735", small_tablet: "954", large: "1241" }//set the circumference of the circle based on screen height
    const num_books = { total: 40, poor: 15, fair: 10, mint: 13 }//set the amount of books

    const compute_percent = amount => (amount / num_books.total) * 100//work out the percentage weighting of the total collection for each condition

    const poor_percent = compute_percent(num_books.poor)
    const fair_percent = compute_percent(num_books.fair)
    const mint_percent = compute_percent(num_books.mint)

    const total_percent = (poor_percent + fair_percent + mint_percent)//get the percent of all owned books against total books

    //get the offset from the end of the circle, for example 100-30 = 70
    //Which means the circle should end 70% from the end of the circle (anti clockwise)

    //each circle displays on top of the next Poor > Fair > Mint
    const poor_offset = 100 - poor_percent
    const fair_offset = 100 - (poor_percent + fair_percent)//the offset of the next circle, in addition to the old one
    const mint_offset = 100 - (poor_percent + fair_percent + mint_percent)

    //_Functions
    //work out how much the circle should be offset e.g. circumference = 628
    //628/100 - 6.28
    //6.28 * 70 = 439.6
    //The circle will start from 0 and end at 439.6 out of 628
    const compute_offset = offset =>
    height > 1200 ? (circumference.large / 100) * offset :
        height > 780 ? (circumference.small_tablet / 100) * offset :
            height > 650 ? (circumference.long_mobile / 100) * offset :
                (circumference.mobile / 100) * offset

    return (

        <div className={classes.container}>

            <OptionsBar path={props.location.pathname} />

            <BooksOwned

                offsets={["0", compute_offset(mint_offset), compute_offset(fair_offset), compute_offset(poor_offset)]}

                circumference={compute_dimensions().circumference}
                r={compute_dimensions().r}
                size={compute_dimensions().size}
                c={compute_dimensions().c}

                total_percent={total_percent}

            />

            <div className={classes.card_container}>

                <ConditionCard title="Poor" colour={colours.red} number="10" />
                <ConditionCard title="Fair" colour={colours.orange} number="17" />
                <ConditionCard title="Mint" colour={colours.green} number="6" />

            </div>

        </div>

    )

}

export default Dashboard