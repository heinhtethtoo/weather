const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/91168f278f285b3d5559d392fa99c2d0/37.8267,-122.4233'

    request ({ url: url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect the weather service! ', undefinded)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently '+ body.currently.temperature + 'degress out. There is a ' + body.currently.precipProbability + ' % chance of rain')
        }
    })
}

module.exports = forecast