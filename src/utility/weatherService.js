const request = require('request');
const api = require('./../config')

function getWeather({ lat, long, place }={}, callback){
    let uri = api.baseurl + "current?access_key=" + api.key + "&query=" + lat + "," + long + "&units=f";
    
    // http://api.weatherstack.com/current?access_key=c37a823d1de773c9278e38b9785c33cb&query=40.7306,-73.9866&units=f

    request({ url: uri, json: true }, (err, res) => {
        if (err)
            callback(err,undefined);
        else if (res.body.error)
            callback(res.body.error,undefined);
        else {
            callback(undefined, {
                place:`${res.body.location.name}, ${res.body.location.region}, ${res.body.location.country}`,
                msg: res.body.current.weather_descriptions[0] + ". It's " + res.body.current.temperature + " degree temperature, but feels like " + res.body.current.feelslike + "."
            });
        }
    });
}

module.exports = { getWeather };