const path = require('path')
const express = require('express')
const cors = require("cors")
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port);
})