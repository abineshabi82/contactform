const path = require('path');
const express = require('express');
const hbs =  require('hbs')

const { getLatLong } = require('./utility/geocodeService');
const { getWeather } = require('./utility/weatherService');

const app = express();
const port=process.env.PORT||3000;

//To set view engine and view path (For dynamic web page)
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
  
//To use static web page
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.get("/", (req, res) => {
    res.render("index",{
        title:"Weather App",
        page:"Home",
        name:"abinesh"
    });
});
app.get("/about", (req, res) => {
    res.render("about",{
        title:"Weather App",
        page:"About",
        name:"abinesh"
    });
});
app.get("/help", (req, res) => {
    res.render("help",{
        title:"Weather App",
        page:"Help",
        name:"abinesh"
    });
});
 
app.get("/weather", (req, res) => {
    let location=req.query.search;
    if(!location){
        return res.status(401).send({error:"provide search data"});
    }

    getLatLong(location, (err, data) => {
        if (err) {
            return res.status(500).send({
                error:err
            })
        } else {
            getWeather(data, (error, {place,msg}={}) => {
                if (error) {
                    return res.status(500).send({
                        error
                    })
                } else {
                    return res.status(200).send({
                        location:req.query.search,
                        place,
                        msg
                    })
                }
            });
        }
    });
});

app.get("/weather/geo", (req, res) => {
    let lat=req.query.lat;
    let long=req.query.long;
    if(!lat || !long){
        return res.status(400).send({
            error:"please provide latitude and longitude"
        })
    }
    let data={long,lat};
    getWeather(data, (error, {msg,place}={}) => {
        if (error) {
            console.log(error);
            return res.status(500).send({
                error
            })
        } else {
            console.log(msg);
            return res.status(200).send({
                msg,
                place
            })
        }
    });

});

app.get("/hi", (req, res) => {
    res.send("hi");
});

app.get("*", (req, res) => {
    res.send("<h2>page not found.</h2>");
});

app.listen(port, () => {
    console.log("server inited on "+port)
})