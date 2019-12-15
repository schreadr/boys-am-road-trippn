
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('SEND_LOCATION_ID').onclick = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            let currentLocation = {
                location: {
                    time: new Date(),
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            };

            sendLocation(currentLocation)
                .then((resp) => {
                    if(resp.status === 200){
                        alert('Successfully sent position');
                    }else{
                        saveLocationToLocalStorage(currentLocation);
                        alert("Couldn't send location. Stored locations:\n " + JSON.stringify(locations));
                    }
                })
                .catch((error) => {
                    let locations = saveLocationToLocalStorage(currentLocation);
                    alert("Couldn't send location: " + error+'. Stored locations:\n ' + JSON.stringify(locations));
                });
        }, (error) => alert("Couldn't access location: " + error), {
            enableHighAccuracy: true,
            timeout: 5000
        });
    };

    document.getElementById('SEND_STORED_LOCATION_ID').onclick = () => {
        let locations = JSON.parse(localStorage.getItem('locations')) || [];
        let promises = [];
        for(let i = 0; i < locations.length; i++){
            promises.push(sendLocation({
                location: locations[i]
            }));
        }
        Promise.all(promises)
        .then((resps) => {
            for(let i = 0; i < resps.length; i++){
                if(resps[i].status !== 200){
                    alert("Couldn't resend locations");
                    return;
                }
            }
            localStorage.setItem('locations', null);
            alert('Successfully sent positions');
        })
        .catch((error) => {
            alert("Couldn't send locations: "+ error);
        });
    };
    
}, false);

function sendLocation(location){
    let authenticationKeyId = 'AUTHENTICATION_KEY';
    let authenticationKey = document.getElementById(authenticationKeyId).value;
    return fetch('/postLocation', {
        method: 'POST',
        headers: {
            'Authorization': authenticationKeyId + ' ' + authenticationKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    });
};

function saveLocationToLocalStorage(location){
    let locations = JSON.parse(localStorage.getItem('locations')) || [];
    locations.push(location.location);
    localStorage.setItem('locations', JSON.stringify(locations));
    return locations;
}