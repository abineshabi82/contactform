const env=require('./env')
const api={
key:env.key,
baseurl:"http://api.weatherstack.com/",
mapboxKey:env.mapboxKey
}
module.exports=api