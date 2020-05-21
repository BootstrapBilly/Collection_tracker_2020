export const transition = {

    initial:{
        // scale:0,
        left:"-100vw"
    },

    in:{


        scale:1,
        y:0,
        opacity:1,
        left:0
      
    },

    out:{     
        opacity:0,
        scale:0.5,
        skew:90
    }
}

export const duration = {

    duration:0.7
}