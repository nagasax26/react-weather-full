const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

const url = "https://api.apixu.com/v1/current.json?key=ac91da03c2d944a3b1c70832182007&q=";
mongoose.connect('mongodb://localhost/weather-db', console.log('connected to db!!!'));

const Weather = require('./model/weather');


// middle ware
// body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/weathers', (req, res) => {
    Weather.find({})
        .then(weatherList => res.json(weatherList))
        .catch(err => console.log(err));
})

app.get('/api/weather/:cityName', (req, res) => {
    // res.json({ params: req.params.cityName });
    axios.get(url + req.params.cityName)
        .then(response => {

            let newWeather = new Weather({
                name: response.data.location.name,
                icon: response.data.current.condition.icon,
                feelslike_c: response.data.current.feelslike_c,
                text: response.data.current.condition.text,
                comments: []
            });
            newWeather.save(response.data)
                .then(weather => res.json(weather));
        });
})

app.delete('/api/weather/:id', (req, res) => {
    Weather.findOneAndRemove({ _id: req.params.id })
        .then((result) => res.json({ msg: "weather has been deleted", success: true }));
})

app.post('/api/weather/comments/add/', (req, res) => {
    console.log('comment server', req.body);
    Weather.findOne({ _id: req.body.id })
        .then(weather => {
            let comments = weather.comments.concat();
            comments.push(req.body.comment);
            weather.comments = comments;
            weather.save()
                .then((w) => res.json(w.comments.pop()))
        })
})

app.delete('/api/weather/:weatherId/comments/:commnetId/', (req, res) => {
    Weather.update({ _id: req.params.weatherId }, { $pull: { comments: { _id: req.params.commnetId } } })
        .then(result => res.json({ msg: "comment has been deleted..!", success: true }));
})

const port = process.env.PORT || 3001;
app.listen(port, console.log('Server running on port', port));