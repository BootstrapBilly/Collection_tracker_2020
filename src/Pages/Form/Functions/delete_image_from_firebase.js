import {storage} from "../../../firebase/index"

const delete_image_from_firebase = (year, condition) => {

    storage.ref("images")
        .child(year.toString() + "-" + condition.toString())//find the book with the deleted year and condition
        .delete()//and delete it
        .then(a => { return })
        .catch(a => { return })

}

export default delete_image_from_firebase