const request=require('request')
const api=require('./../config')


function getLatLong(place,callback){
    let uriMapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=" + api.mapboxKey + "&limit=1";
    request({ url: uriMapbox, json: true }, (err, res) => {
        if (err) {
            callback(err,undefined);
        }
        else if (res.body.error) {
            callback(res.body.error,undefined)
        }
        else if (res.body.features.length > 0) {
            callback(undefined,{
                lat:res.body.features[0].center[1],
                long:res.body.features[0].center[0],
                place:res.body.features[0].place_name
            });
        } else {
            callback("place not found",undefined);
        }
    })
}

module.exports={getLatLong}