import React, { useState, useEffect } from 'react'

//css
import classes from "./Book.module.css"
import animations from "../../../../Util/Animations.module.css"

//components
import Button from "./components/Button"
import ImageUpload from "../../../../Shared Components/Image_upload_/Image_upload"
import BackButton from "../Button/Button"

//assets
import default_image from "../../../../Assets/Img/default_search_image.png"
import del from "../../../../Assets/Icons/delete.svg"
import cog from "../../../../Assets/Icons/settings.svg"
import plus from "../../../../Assets/Icons/plus.svg"
import camera from "../../../../Assets/Icons/camera.svg"

//external
import { Redirect } from 'react-router'

//util
import colours from "../../../../Util/Colours"

//redux hooks
import { useDispatch, useSelector } from "react-redux"

//redux action creators
import { submit_form } from "../../../../Store/Actions/Submit_form_action"

export const Search = props => {

    let books = props.books || [{ _id: null, condition: "Missing", year: props.year }]

    //-Config
    const dispatch = useDispatch()//initialse the redux hook

    //*states
    const [options_open, set_options_open] = useState(false)
    const [redirect, set_redirect] = useState(false)
    const [image_upload, set_image_upload] = useState(false)
    const [new_image_uploaded, set_new_image_uploaded] = useState(null)

    //_functions
    const handle_colour_assignment = (book) => {

        if (book.condition === "Missing") return colours.grey
        if (book.condition === "Poor") return colours.red
        if (book.condition === "Fair") return colours.orange
        if (book.condition === "Mint") return colours.green

    }

    //?Selectors
    const photo_uploaded = useSelector(state => state.upload.last_uploaded_photo)


    const handle_condition_assignment = book => {

        if (book.condition === "Missing") return "Missing"
        else return `${book.condition} condition`

    }

    useEffect(() => {

        if (photo_uploaded) {

            set_image_upload(false)
            set_new_image_uploaded({url:photo_uploaded.url, condition:photo_uploaded.condition})

        }
        // eslint-disable-next-line
    }, [photo_uploaded])

    return (

        <div className={classes.container} >

            <div className={classes.card_container}>

                {books.map((book, index) => {

                    return <div className={[classes.card, index === 0 ? animations.slideright : index === 1 ? animations.slideup : animations.slideleft].join(" ")} test_handle="book_card" style={{ animationDuration: `${1 + (index === 0 ? 0 : index === 1 ? 0.5 : 0.8)}s` }} key={index}>

                        <div className={classes.image_container} style={{ backgroundColor: handle_colour_assignment(book) }}>

                            {image_upload === book.condition ? <ImageUpload no_style year={book.year} condition={book.condition} /> :

                                <img src={book.condition === "Missing" ? default_image : new_image_uploaded && new_image_uploaded.condition === book.condition && new_image_uploaded.url || book.image_url ||  default_image} alt={"book"} className={classes.image} />

                            }

                        </div>

                        <div className={classes.details_container}>

                            <p className={classes.year}>{book.year}</p>
                            <p test_handle="book_condition" className={classes.condition} style={{ color: handle_colour_assignment(book) }}>{handle_condition_assignment(book)}</p>
                            <img test_handle={`book_options_cog_${book.condition}`} src={book.condition === "Missing" ? plus : cog} alt={"cog"} className={classes.cog} onClick={book.condition === "Missing" ? () => set_redirect(true) : () => set_options_open(options_open && options_open === book.condition ? null : book.condition)} />

                        </div>

                        <div className={[classes.button_container, options_open === book.condition ? classes.nav_open : null].join(" ")}>

                            <Button src={del} text="Delete" handle_click={() => dispatch(submit_form({ year: book.year.toString(), condition: book.condition }, "delete_book"))} test_handle={`delete_book_${book.condition}`} />
                            <Button src={camera} text="Photo" handle_click={() => set_image_upload(image_upload && image_upload === book.condition ? null : book.condition)} />

                        </div>

                    </div>

                })}

            </div>

            <BackButton text={props.type === "search" ? "Go Back" : "Add More"} onClick={props.on_go_back_click} test_handle="go_back_button" overwrite_class={classes.go_back_button} />

            {redirect && <Redirect to={{ pathname: '/add_book', state: { redirected_from_book: true, year: props.year } }} />}

        </div>

    )

}

export default Search
