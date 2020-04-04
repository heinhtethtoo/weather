console.log('Client side javscript file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg_location = document.querySelector('#location')
const msg_forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msg_location.textContent = 'Loading Result......'
    msg_forecast.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((weatherData) => {
            if(weatherData.error) {
                msg_location.textContent = weatherData.error
            } else {
                msg_location.textContent = weatherData.location
                msg_forecast.textContent = weatherData.forecast
            }
        })
    })
})