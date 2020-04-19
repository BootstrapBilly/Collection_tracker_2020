import React, { useEffect, useState } from "react"

import classes from "./Dashboard.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import BooksOwned from "./Components/Small_donut/Small_donut"
import ConditionCard from "./Components/Condition_card/Condition_card"

//util
import colours from "../../Util/Colours"
import compute_dimensions from "./functions/compute_dimensions"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import {clear_feedback } from "../../Store/Actions/Submit_form_action"

const Dashboard = props => {

    //*states
    const [book_data, set_book_data] = useState({ poor: 0, fair: 0, mint: 0 })

    //-Config
    const dispatch = useDispatch()
    const { innerHeight: height } = window;//get the dimensions of the window

    const circumference = { mobile: "628", long_mobile: "735", small_tablet: "954", large: "1241" }//set the circumference of the circle based on screen height
    let num_books = { total: 65, poor: book_data.poor, fair: book_data.fair, mint: book_data.mint }//set the amount of books

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

    //?selectors
    const books = useSelector(state => state.fetch.books)

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

    const sort_books_into_conditions = () => {

        let poor = 0,  fair = 0,  mint = 0;

        books.forEach(book => book.condition === "Poor" ? poor += 1 : book.condition === "Fair" ? fair += 1 : mint += 1)

        set_book_data({poor:poor, fair:fair, mint:mint})
    }

    //!effects
    useEffect(() => {

        dispatch(fetch_books())

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if (books) sort_books_into_conditions()
        
        // eslint-disable-next-line
    }, [books])

    return (

        <div className={classes.container}>

            <OptionsBar path={props.location.pathname} onClick={()=> dispatch(clear_feedback())} />

            <BooksOwned

                offsets={["0", compute_offset(mint_offset), compute_offset(fair_offset), compute_offset(poor_offset)]}

                circumference={compute_dimensions().circumference}
                r={compute_dimensions().r}
                size={compute_dimensions().size}
                c={compute_dimensions().c}

                total_percent={total_percent}

            />

            <div className={classes.card_container}>

                <ConditionCard title="Poor" colour={colours.red} number={book_data.poor} />
                <ConditionCard title="Fair" colour={colours.orange} number={book_data.fair} />
                <ConditionCard title="Mint" colour={colours.green} number={book_data.mint} />

            </div>

        </div>

    )

}

export default Dashboard