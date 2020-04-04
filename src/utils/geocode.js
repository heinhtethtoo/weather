const request = require("request");




const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGVpbmh0ZXRodG9vMjAxNyIsImEiOiJjazdwc3RrdTIwM2o2M3NwcnRna281cHM4In0.bTkCsi-jtoHpZozrRRzWLw&limit=1'

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find loaction. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode