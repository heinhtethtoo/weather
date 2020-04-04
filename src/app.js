const express = require('express')
const path = require('path')
const hbs = require('hbs')
const gecode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialPath)

// Setup static directory to serve 
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        name: 'The Weather App',
        nick:  'HHH'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'About Page',
        nick: 'Hein Htet Htoo'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Help Page',
        title: 'World Emotion Helper',
        nick: 'HHH'
    })
})


app.get('/api', (req, res) => {
    res.send({
        name: 'HHH',
        city: 'Kalaw',
        age: 23
    })
})

app.get('/Corona', (req, res) => {
    res.send([{
        person: '<h1>Person1<1>',
        age: 36,
        sex: 'male',
        last_country: 'US',
        hospital: 'Chin hospital',
        hos_date: '21/3/2020',
    },
    {
        person: '<h1>Person2<1>',
        age: 26,
        sex: 'male',
        last_country: 'UK',
        hospital: 'Yangon hospital',
        hos_date: '23/3/2020',
    },
    {
        person: '<h1>Person3<1>',
        age: 36,
        sex: 'male',
        last_country: 'UK',
        hospital: 'Yangon hospital',
        hos_date: '21/3/2020',
    },
    {
        person: '<h1>Person4<1>',
        age: 33,
        sex: 'male',
        last_country: 'US',
        hospital: 'Kandaw Nadi hospital(Mdy)',
        hos_date: '25/3/2020',
    },
    {
        person: '<h1>Person5<1>',
        age: 69,
        sex: 'male',
        last_country: 'Singapore & Austria',
        hospital: 'Yangon hospital',
        hos_date: '21/3/2020',
    },
    {
        person: '<h1>Person6<1>',
        age: 29,
        sex: 'male',
        last_country: 'UK',
        hospital: 'Yangon hospital',
        hos_date: '26/3/2020',
    },
    {
        person: '<h1>Person7<1>',
        age: 58,
        sex: 'female',
        last_country: 'Swift',
        hospital: 'NayPyiTaw',
        hos_date: '26/3/2020',
    },
    {
        person: '<h1>Person8<1>',
        age: 60,
        sex: 'female',
        last_country: 'None',
        hospital: 'Yangon hospital',
        hos_date: '26/3/2020',
    },
    ])
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Your must address for weather forecast'
        })
    }

    gecode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 


})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must a provide search'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: '404',
        nick: 'Revenge Seeker',
        errorMessage: 'Help Artical Not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        name: '404',
        nick: 'Revenge Seeker',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
