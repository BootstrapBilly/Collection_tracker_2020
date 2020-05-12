import React, { useEffect, useState } from "react"

import classes from "./Dashboard.module.css"

//components
import OptionsBar from "../../Shared Components/Options_bar/Options_bar"
import Donut from "./Components/Donut/Donut"
import BarChart from "./Components/Bar_chart/Bar_chart"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { fetch_books } from "../../Store/Actions/Fetch_books_action"
import { CLEAR_SUBMISSION_RESULT } from "../../Store/Actions/Submit_form_action"

//assets
import donut from "../../Assets/Icons/donut.svg"
import barchart from "../../Assets/Icons/barchart.svg"
import colours from "../../Util/Colours"

const Dashboard = props => {

    //*states
    const [book_data, set_book_data] = useState({ poor: 0, fair: 0, mint: 0 })
    const [unique_years, set_unique_years] = useState(null)
    const [current_graph, set_current_graph] = useState("donut")

    //-Config
    const dispatch = useDispatch()

    let num_books = { total: 65, poor: book_data.poor, fair: book_data.fair, mint: book_data.mint }//set the amount of books

    const compute_percent = amount => (amount / num_books.total) * 100//work out the percentage weighting of the total collection for each condition

    const poor_percent = compute_percent(num_books.poor)
    const fair_percent = compute_percent(num_books.fair)
    const mint_percent = compute_percent(num_books.mint)

    const total_percent = (poor_percent + fair_percent + mint_percent)//get the percent of all owned books against total books

    //?selectors
    const books = useSelector(state => state.fetch.books)

    const extract_best_conditions = () => {

        const best_conditions = []

        if (books) {

            books.forEach(current_book => {

                const condition_weighting = get_condition_weighting(current_book.condition)

                current_book.condition_weighting = condition_weighting

                insert_if_best_condition(best_conditions, current_book)

                set_unique_years(best_conditions)
            })

        }

        sort_books_into_conditions(best_conditions)

    }

    const get_condition_weighting = condition => {

        if (condition === "Poor") return 1
        if (condition === "Fair") return 2
        if (condition === "Mint") return 3

    }

    const insert_if_best_condition = (best_conditions, current_book) => {

        const book_present = best_conditions.find(book => book.year === current_book.year)

        if (!book_present) { best_conditions.push(current_book) }


        else if (book_present) {

            if (current_book.condition_weighting > book_present.condition_weighting) {

                const current_index = best_conditions.indexOf(book_present)

                best_conditions.splice(current_index, 1, current_book)
            }
        }

    }

    useEffect(() => {

        if (books)
            extract_best_conditions()

    }, [books])

    //_Functions
    const sort_books_into_conditions = books => {

        let poor = 0, fair = 0, mint = 0;

        books.forEach(book => book.condition === "Poor" ? poor += 1 : book.condition === "Fair" ? fair += 1 : mint += 1)

        set_book_data({ poor: poor, fair: fair, mint: mint })
    }

    //!effects
    useEffect(() => {

        dispatch(fetch_books())

        // eslint-disable-next-line
    }, [])


    return (

        <div className={classes.container}>

            <OptionsBar path={props.location.pathname} onClick={() => dispatch(CLEAR_SUBMISSION_RESULT())} />

            <div className={classes.mobile_chart_container}>

                {current_graph === "donut" ?
                    <Donut total_percent={total_percent} poor_percent={poor_percent} fair_percent={fair_percent} mint_percent={mint_percent} book_data={book_data} />
                    : <BarChart books={unique_years} />
                }

            </div>

            <div className={classes.landscape_chart_container}>

           
                    <Donut total_percent={total_percent} poor_percent={poor_percent} fair_percent={fair_percent} mint_percent={mint_percent} book_data={book_data} />
                     <BarChart books={unique_years} />
                

            </div>

            <div className={classes.mobile_chart_selection_container}>

                <img src={donut} alt="Donut icon" className={classes.icon} onClick={()=> set_current_graph("donut")} style={{borderColor: current_graph === "donut" && colours.blue}}/>
                <img src={barchart} alt="Barchart icon" className={classes.icon} onClick={()=> set_current_graph("barchart")} style={{borderColor: current_graph === "barchart" && colours.blue}} />

            </div>


        </div>

    )

}

export default Dashboard