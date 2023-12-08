// map-geolocation.js
const errorText = document.getElementById("geoError");
const mapIframe = document.getElementById("mapIframe");
const streetViewIframe = document.getElementById("streetViewIframe");

function getLocationAndUpdateMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionAndUpdateMap, showError);
    } else { 
        errorText.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPositionAndUpdateMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    updateMapAndView(latitude, longitude);
}

function updateMapAndView(latitude, longitude) {
    // Update the map
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
    mapIframe.src = mapUrl;
  
    // Update the Street View
    const streetViewUrl = `https://www.google.com/maps/embed?pb=!4v1702036816746!6m8!1m7!1s${latitude},${longitude}!2m2!1d${latitude}!2d${longitude}!3f12.969013127142773!4f-7.42692040477003!5f0.7820865974627469`;
    streetViewIframe.src = streetViewUrl;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorText.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            errorText.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            errorText.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            errorText.innerHTML = "An unknown error occurred."
            break;
        default: error
            errorText.innerHTML = "Some random error accourd that wasn't catched"
            break;
    }
}