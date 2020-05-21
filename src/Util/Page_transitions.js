export const transition = {

    initial:{
        left:"-100vw",
        scale:0,
        y:"0vh"
    },

    in:{
        left:"0vw",
        scale:1,
        y:0
      
    },

    out:{
        left:"100vw",
        scale:0,
        y:"-100vh"
    }
}

export const duration = {
    type:"tween",
    ease:"easeIn",
    duration:0.7
}