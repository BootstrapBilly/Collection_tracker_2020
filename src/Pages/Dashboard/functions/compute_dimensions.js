const compute_dimensions = (height, width) => {

    let dimensions = { circumference: null, r: null, size: null, c: null };

    const orientation = (window.screen.orientation || {}).type || window.screen.mozOrientation || window.screen.msOrientation;

    if (orientation === "portrait-secondary" || orientation === "portrait-primary") {

    if (height > 0) {
        dimensions.circumference = "628";
        dimensions.r = "100";
        dimensions.size = "250";
        dimensions.c = "127"

    }

    if (height > 650) {
        dimensions.circumference = "735";
        dimensions.r = "117";
        dimensions.size = "270";
        dimensions.c = "135"
    }

    if (height > 780) {
        dimensions.circumference = "954";
        dimensions.r = "152";
        dimensions.size = "351";
        dimensions.c = "176"
    }

} else if (orientation === "landscape-primary" || orientation === "landscape-secondary") {

    if (width > 0) {
        dimensions.circumference = "735";
        dimensions.r = "100";
        dimensions.size = "250";
        dimensions.c = "127"
    }

    if (width > 700) {
        dimensions.circumference = "735";
        dimensions.r = "117";
        dimensions.size = "270";
        dimensions.c = "135"
    }

    if (width > 900) {
        dimensions.circumference = "954";
        dimensions.r = "152";
        dimensions.size = "351";
        dimensions.c = "176"
    }

    //ios
} else {

    if (height > 0) {
        dimensions.circumference = "628";
        dimensions.r = "100";
        dimensions.size = "250";
        dimensions.c = "127"
    }

    if (width || height > 950) {
        dimensions.circumference = "954";
        dimensions.r = "152";
        dimensions.size = "351";
        dimensions.c = "176"
    }

    if ((width > 1200 && height > 950) || (width > 1000 && height > 1200)) {
        dimensions.circumference = "1241";
        dimensions.r = "197.6";
        dimensions.size = "456.3";
        dimensions.c = "228.8"
    }

    console.log("inside the place")

}

    return dimensions

}

export default compute_dimensions