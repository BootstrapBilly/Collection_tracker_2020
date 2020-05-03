import React from 'react'

import classes from "./New_alert.module.css"

import colours from "../../Util/Colours"

import error from "../../Assets/Icons/error.svg"
import info from "../../Assets/Icons/info.svg"
import success from "../../Assets/Icons/success.svg"

const New_alert = (text, type) => {

    //?container
    const container = document.createElement("div")
    container.classList.add(classes.container)
    container.setAttribute("id", "container")

    //-Inner container
    const inner_container = document.createElement("div")
    inner_container.classList.add(classes.inner_container)

    //!icon container
    const icon_container = document.createElement("div")
    icon_container.classList.add(classes.icon_container)

    //*icon
    const icon = document.createElement("img")
    icon.classList.add(classes.icon)

    //_message_container
    const message_container = document.createElement("div")
    message_container.classList.add(classes.message_container)

    //message
    const message = document.createTextNode(text)

    container.appendChild(inner_container)
    inner_container.appendChild(icon_container)
    inner_container.appendChild(message_container)
    icon_container.appendChild(icon)
    message_container.appendChild(message)

    const type_details = set_type_details(type);

    icon_container.style.background=type_details[0]
    icon.src=type_details[1]


    document.getElementById("root").insertBefore(container, document.querySelector(".App"))

    setTimeout(() => {
        document.getElementById("container").remove()
    }, 6000); 

}

const set_type_details = type => {

    if(type === "error") return [colours.red, error]
    if(type === "info") return [colours.orange, info]
    if(type === "success") return [colours.green, success]

}



export default New_alert
