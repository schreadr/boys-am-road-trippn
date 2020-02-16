const OFFSET_MAP = 1;

window.addEventListener("DOMContentLoaded", () => {
    getLocations()
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then(locations => {
                        let bounds;
                        let locationsForLine = [];
                        let markers = [];

                        for (let i = 0; i < locations.length; i++) {
                            bounds = evaluateNewBounds(bounds, locations[i]);
                            locationsForLine.push([locations[i].longitude, locations[i].latitude]);
                            markers.push(createMarker(locations[i], i + 1));
                        }

                        bounds = [[bounds[0][0] - OFFSET_MAP, bounds[0][1] - OFFSET_MAP], [bounds[1][0] + OFFSET_MAP, bounds[1][1] + OFFSET_MAP]];

                        tt.setProductInfo('boys-am-road-trippn', '2.0.0');
                        let map = tt.map({
                            key: getTomTomApiKey(),
                            container: 'map',
                            style: 'tomtom://vector/1/basic-main',
                            dragPan: !isMobileOrTablet(),
                            bounds: bounds
                        });
                        map.addControl(new tt.FullscreenControl());
                        map.addControl(new tt.NavigationControl());

                        map.on('load', function () {
                            map.addLayer(createTomTomLine(locationsForLine));
                            markers.forEach(marker => marker.addTo(map));
                        });
                    });
            } else {
                alert('Date hend nid chöne glade werde.');
            }
        });
});

function getLocations() {
    return fetch('/getLocation', {
        method: 'GET'
    });
};

function evaluateNewBounds(currentBounds, newLocation) {
    let wereBoundsNull = !currentBounds;

    if (wereBoundsNull) {
        currentBounds = [[0, 0], [0, 0]];
    }

    //west bound
    if (currentBounds[0][0] > newLocation.longitude || wereBoundsNull) {
        currentBounds[0][0] = newLocation.longitude;
    }
    //south bound
    if (currentBounds[0][1] > newLocation.latitude || wereBoundsNull) {
        currentBounds[0][1] = newLocation.latitude;
    }
    //east bound
    if (currentBounds[1][0] < newLocation.longitude || wereBoundsNull) {
        currentBounds[1][0] = newLocation.longitude;
    }
    //south bound
    if (currentBounds[1][1] < newLocation.latitude || wereBoundsNull) {
        currentBounds[1][1] = newLocation.latitude;
    }

    return currentBounds;
}

/**
 * @param {*} locations structure:
 *  [[8.616971, 47.361122],
 *   [7.532066, 46.948360],
 *   [6.532066, 45.948360]]
 */
function createTomTomLine(locations) {
    return {
        'id': '1234',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'properties': {},
                            'coordinates': locations
                        }
                    }
                ]
            }
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#ff0000',
            'line-width': 1
        }
    };
}

/**
 * 
 * @param {*} location structure
 * {
 *  altitude: Number
 *  longitude: Number
 *  time: Date
 * }
 */
function createMarker(location, numberOfMarker) {
    var popup = new tt.Popup()
        .setHTML("<p> Station: " + numberOfMarker + "<br>" + location.time.replace(/T/, ' ').replace(/\..+/, '') + "</p>");
    return new tt.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup);
}

function getTomTomApiKey() {
    return (window.SERVER_DATA || {}).TOMTOM_API_KEY;
}