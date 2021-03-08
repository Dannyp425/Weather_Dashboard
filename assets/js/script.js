var searchHistory = [];
var cityListEl = $("#cities");
var cityInfoEl = $("#gen-info");
var forecastEl = $("#forecast");
var tempEl = $("#temp");
var humidityEl = $("#humidity");
var windEl = $("#wind");
var uvEl = $("#uv");
var cityHeaderEl = $("#city-name");

var getDate = function () {
    var month = moment().month();
    var day = moment().date();
    var year = moment().year();
    var fullDate = month + "/" + day + "/" + year
    return fullDate;
};

$("#search").click(function () {
    var search = document.getElementById("input").value;
    searchHistory.push(search);
    saveCity(search);
    searchCity(search);
});

var searchCity = function (search) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=ac6279f0ba09e51b8f624b4a70b296a4&units=imperial";
    fetch(apiUrl)
        .then(response => response.json())
        .then(function (data) {
            var cityData = {
                name: data.name,
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                uvLat: data.coord.lat,
                uvLon: data.coord.lon,
                icon: data.weather[0].icon
            }
            // apiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityData.uvLat + "&lon=" + cityData.uvLon + "&appid=ac6279f0ba09e51b8f624b4a70b296a4";
            // fetch(apiUrl)
            //     .then(response => response.json())
            //     .then(console.log(data))
            cityHeaderEl.empty();
            tempEl.empty();
            humidityEl.empty();
            windEl.empty();
            cityHeaderEl.append(search + " (" + getDate() + ")");
            tempEl.append("Temperature: " + cityData.temp + "°F");
            humidityEl.append("Humidity: " + cityData.humidity + "%");
            windEl.append("Wind speed: " + cityData.wind + " MPH");
        });
}

var saveCity = function (city) {
    localStorage.setItem("city-list", JSON.stringify(searchHistory));
}

var loadCities = function () {
    var arr = JSON.parse(localStorage.getItem("city-list"));
    $.each(arr, function () {
        var i = 0;
        var divEl = $("<div>")
            .addClass("card");
        var btnEl = $("<button>")
            .attr("id", "pastCity")
            .text(arr[i]);
        divEl.append(btnEl);
        cityListEl.append(divEl);
        i++;
    })

    $("#pastCity").click(function () {
        var btnText = JSON.parse(localStorage.getItem("city-list"));
        searchCity(btnText);
    });
};

loadCities();
getDate();