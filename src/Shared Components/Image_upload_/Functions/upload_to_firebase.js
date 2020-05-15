import {storage} from "../../../firebase/index"

import {spinner} from "../../../Assets/Spinners/Photo_spinner.svg"

import {handle_upload_error_action, reload_search_result_action, set_url_in_database} from "../../../Store/Actions/Photo_upload_handler_action"

const upload_to_firebase = (event, year, condition, state, set_state, dispatch) => {

    //upload the given photo, named by year and condition (from props) to firebase
    const upload_task = storage.ref(`images/${year.toString()}-${condition.toString()}`)

        .put(event.target.files[0])

        set_state({...state, preview_selected_image:spinner})

    upload_task.on("state_changed",

        (snapshot) => { },

        (error) => { dispatch(handle_upload_error_action(error)) }, //on error

        () => { //on success

            storage.ref("images").child(year.toString() + "-" + condition.toString())//search for the photo in firebase

                .getDownloadURL()//get the url for it from firebase

                .then(url => {

                    set_state({...state, preview_selected_image:url, successful_upload:true})
   
                    dispatch(reload_search_result_action({ url: url, condition: condition }))//reload the book with the new photo
               
                    dispatch(set_url_in_database({ url: url, year:year, condition: condition }))//Add the new url to the mongodb database to be fetched with future requests

                })

        });
}

export default upload_to_firebase