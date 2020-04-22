import {UPLOAD_SUCCESS, UPLOAD_FAILURE} from "../Actions/Photo_upload_handler_action"

const initialState = {//set the initial state
    last_uploaded_photo:null
}

const photo_upload = (state = initialState, action) => {

    switch (action.type) {

        case UPLOAD_SUCCESS:return {...state, last_uploaded_photo: action.payload}

        default:return state;
    }

}

export default photo_upload

