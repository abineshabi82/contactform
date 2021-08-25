console.log("connected");

function currentLocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        fetch(`http://localhost:3000/weather/geo?lat=${location.coords.latitude}&long=${location.coords.longitude}`)
            .then(res => res.json())
            .then(data => {
                console.log("current", data);
                if(data.place&&data.msg)
                document.querySelector("#current").innerHTML=`<h4>Your Current Location</h4><p>${data.place}</p><p>${data.msg}</p>`;
                else
                document.querySelector("#current").innerHTML=`<h4>Your Current Location</h4><p>${data.error}</p>`;
            }).catch(error=>{
                document.querySelector("#current").innerHTML=`<h4>Your Current Location</h4><p>${error}</p>`;
            });
    });
}
currentLocation();


document.querySelector('[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();

    let loc = document.querySelector("#search").value;
    if (!loc)
        return alert("enter location");

    fetch(`/weather?search=${loc}`)
        .then(res => { return res.json(); })
        .then(data => {
            console.log(data);
            if (!data.error)
                document.querySelector('#response').innerHTML = `<h2>Your Search Result</h2><p>${data.place}</p><p>${data.msg}</p>`;
            else
                document.querySelector('#response').innerHTML = `<h2>Your Search Result</h2><p>${data.error}</p>`;
        })
        .catch(err => {
            console.log(err);
        });
})

