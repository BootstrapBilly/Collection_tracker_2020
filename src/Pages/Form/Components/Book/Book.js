/* ---------------------------------------IMPORTANT READ ME-------------------------------------------- 
This component works by mapping given books into cards, if no books were given, it means the book is missing
Missing data is set on (line 39) so all data can be mapped properly
*/
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

    let books = props.books || [{ _id: null, condition: "Missing", year: props.year }]//if no books was passed in by props, set the data to a missing book

    //-Config
    const dispatch = useDispatch()//initialse the redux hook

    //*states
    const [options_open, set_options_open] = useState(false)//Hold the status of the popout menu (Triggered by clicking the cog icon)
    const [redirect, set_redirect] = useState(false)//Used to redirect to the add book form (Triggered by clicking the plus icon on a missing book)
    const [image_upload, set_image_upload] = useState(false)//Decides whether to display the image upload component
    const [new_image_uploaded, set_new_image_uploaded] = useState(null)//Listens for a new image upload (used to instantly render it)

    //?Selectors
    const photo_uploaded = useSelector(state => state.upload.last_uploaded_photo)//Listens for a new photo upload

    //_functions
    const handle_colour_assignment = (book) => {//sets the colours based on the condition of the book

        if (book.condition === "Missing") return colours.grey
        if (book.condition === "Poor") return colours.red
        if (book.condition === "Fair") return colours.orange
        if (book.condition === "Mint") return colours.green

    }

    useEffect(() => {

        if (photo_uploaded) { //if a new photo has been uploaded

            set_image_upload(false) //remove the image upload component
            set_new_image_uploaded({ url: photo_uploaded.url, condition: photo_uploaded.condition })//and replace it with the new photo

        }
        // eslint-disable-next-line
    }, [photo_uploaded])
    
    return (

        <div className={classes.container}> {/* Page wrapper/container */}

            <div className={classes.cards_container}> {/* All Cards/Books container */}

                {books.map((book, index) =>

                    <div //single card container

                        className={[classes.card, index === 0 ? animations.slideright : index === 1 ? animations.slideup : animations.slideleft].join(" ")} test_handle="book_card"
                        style={{ animationDuration: `${1 + (index === 0 ? 0 : index === 1 ? 0.5 : 0.8)}s` }}
                        key={index}

                    >

                        <div //Photo container - Replaced by imageupload component on camera icon click

                            className={classes.image_container}
                            style={{ backgroundColor: handle_colour_assignment(book) }}

                        >

                            {image_upload === book.condition ? //If the image upload for the given condition (of this mapping) is active,

                                <ImageUpload no_style year={book.year} condition={book.condition} /> //display the image upload component on that book

                                : //Otherwise,

                                <img alt={"book"} className={classes.image}

                                    src={
                                        //if a new image has been uploaded for the given condition (of this mapping)
                                        // eslint-disable-next-line
                                        new_image_uploaded && new_image_uploaded.condition === book.condition && new_image_uploaded.url//display the new image
                                        // eslint-disable-next-line
                                        || book.image_url //otherwise display the image url pulled from the database                                      
                                        || default_image //if there is no image, display the default image
                                    }

                                />

                            }

                        </div>

                        <div className={classes.details_container}> {/* The bottom section of the card (the white part) */}

                            <p className={classes.year}>{book.year}</p>

                            <p className={classes.condition} style={{ color: handle_colour_assignment(book) }} test_handle="book_condition">{book.condition}</p>

                            {/* The icon, plus for missing books and menu for other books */}
                            <img className={classes.cog} alt={"cog"} test_handle={`book_options_cog_${book.condition}`}

                                src={book.condition === "Missing" ? plus : cog} //if the book is missing, display a plus, otherwise display a menu icon

                                onClick={
                                    book.condition === "Missing" ? () => set_redirect(true) //if the book is missing, redirect the user to add book
                                        :
                                        () => set_options_open(options_open && options_open === book.condition ? null : book.condition)//Otherwise open the options menu
                                }
                            />

                        </div>

                        {/* The menu which slides in and out with the delete and camera icon */}
                        <div className={[classes.button_container, options_open === book.condition ? classes.nav_open : null].join(" ")}>

                            {/*Delete button */}
                            <Button src={del} text="Delete" test_handle={`delete_book_${book.condition}`}
                                handle_click={() => dispatch(submit_form({ year: book.year.toString(), condition: book.condition }, "delete_book"))} /*Dispatch delete request*/
                            />

                            {/*Camera button */}
                            <Button src={camera} text="Photo"
                                handle_click={() => set_image_upload(image_upload && image_upload === book.condition ? null : book.condition)} /* Display the image upload component */
                            />

                        </div>

                    </div>

                )}

            </div>

            {/*Button at the bottom */}
            <BackButton text={props.type === "Search" ? "Go Back" : "Add More"} test_handle="go_back_button" overwrite_class={classes.go_back_button}
                onClick={props.on_go_back_click} />

            {/*Used to redirect - triggered by pressing the plus button on a missing book (line 124)*/}
            {redirect && <Redirect to={{ pathname: '/add_book', state: { redirected_from_book: true, year: props.year } }} />}

        </div>

    )

}

export default Search
