import React from "react"

import classes from "./Dashboard.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import BooksOwned from "./Donuts/Small_donut/Small_donut"
import ConditionCard from "./Condition_card/Condition_card"

//util
import colours from "../../Util/Colours"

const Dashboard = props => {

    const { innerWidth: width, innerHeight: height } = window;

    const circumference = { mobile: "628", long_mobile: "816" }

    const total_books = 40;
    const poor_books = 10;
    const fair_books = 17;
    const mint_books = 6;

    const poor_percent = (poor_books/total_books) * 100
    const fair_percent = (fair_books/total_books) * 100
    const mint_percent = (mint_books/total_books) * 100


    const poor_offset = 100 - poor_percent
    const fair_offset = 100 - (poor_percent + fair_percent)
    const mint_offset = 100 - (poor_percent + fair_percent + mint_percent)

  

    return (

        <div className={classes.container}>

            <OptionsBar />

            <BooksOwned

                offsets={[
                    "0",

                    height > 650 ? (circumference.long_mobile / 100) * mint_offset : (circumference.mobile / 100) * mint_offset,
                    height > 650 ? (circumference.long_mobile / 100) * fair_offset : (circumference.mobile / 100) * fair_offset,
                    height > 650 ? (circumference.long_mobile / 100) * poor_offset : (circumference.mobile / 100) * poor_offset
                    
                    
                ]}

                circumference={height > 650 ? circumference.long_mobile : circumference.mobile}
                r={height > 650 ? "130" : "100"}
                size={height > 650 ? "300" : "250"}
                cx={height > 650 ? "150" : "127"}
                cy={height > 650 ? "150" : "127"}

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