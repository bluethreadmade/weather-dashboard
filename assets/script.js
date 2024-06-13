// async function apiTest() {
//     const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9025870b58f55c244123e7bc18ed93ea");
//     const movies = await response.json();
//     console.log(movies);
//     }
 
// apiTest()

// const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=`${London}`,uk&APPID=9025870b58f55c244123e7bc18ed93ea';

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('test test test \n----------');
//     console.log(data.name)
//     // for (let i = 0; i < data.length; i++) {
//     //   console.log(data[i].name);
//     // }
//   });
let currentWeather = {};
let oneDay = {};
let fiveDay = [];

// takes the text entered in the search bar and assigns it to a variable when the search button is clicked
function searchSubmit(event) {
  event.preventDefault();

  const searchInput = $('#search-input').val();
  
  console.log("searched");
  console.log(searchInput);

  // clears the search bar
  $('#search-input').val('');

  const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&APPID=9025870b58f55c244123e7bc18ed93ea&units=imperial`;

  fetch(geoApiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error ('Failed to fetch coordinates');
      }
    })
     .then(function (data) {
        // console.log(data.name);
        // console.log(data.coord.lat);
        // console.log(data.coord.lon);
        // console.log(data.main.temp);
        // console.log(data.main.humidity);
        // console.log(data.weather[0].icon);
        // console.log(data.wind.speed);
        // console.log(data.dt);

        const searchLat = data.coord.lat; 
        const searchLon = data.coord.lon;

        const currentCity = data.name;
        const currentTemp = data.main.temp;
        const currentHumidity = data.main.humidity;
        const currentIcon = data.weather[0].icon;
        const currentWind = data.wind.speed;
        const currentTime = data.dt;


        // create array of current data
        const currentWeather = {
          city: currentCity,
          temp: currentTemp,
          humidity: currentHumidity,
          icon: currentIcon,
          wind: currentWind,
          time: currentTime,
        };

        console.log(currentWeather);

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLon}&APPID=9025870b58f55c244123e7bc18ed93ea&units=imperial`
      
        fetch(weatherApiUrl)
          .then(function (weatherResponse) {
            if (weatherResponse.ok) {
              return weatherResponse.json();
            } else {
              throw new Error('Failed to fetch weather data')
            }
          })
          .then(function (weatherData) {
              console.log("forecast",weatherData.list);

              // declare an array

                for(let i=0; i< weatherData.list.length; i+=8) {
                  //console.log(weatherData.list[i].dt_txt);


                  const dayTemp = weatherData.list[i].main.temp;
                  const dayHumidity = weatherData.list[i].main.humidity;
                  const dayIcon = weatherData.list[i].weather[0].icon;
                  const dayWind = weatherData.list[i].wind.speed;
                  const dayDate = weatherData.list[i].dt_txt;
                  
                  const oneDay = {
                    temp: dayTemp,
                    humidity: dayHumidity,
                    icon: dayIcon,
                    wind: dayWind,
                    date: dayDate
                  };
                  
                  console.log("one day", oneDay);

                  // push new object to array
                  fiveDay.push(oneDay);
                  
                  
                  }
                  
                  
                  createCurrentWeatherArticle(currentWeather);
                  // pass array to create day cards
                  createDayCards(fiveDay);
                  console.log("five day", fiveDay);
                
          });

      })
      .catch(function (error) {
          console.error('Error featching geographical coordinated:', error);
      });
    
  };


function createCurrentWeatherArticle(currentWeather) {

  console.log("current weather");

  const formattedDate = dayjs.unix(currentWeather.time).format('MMM D, YYYY');

  const currentWeatherDay = $('<h3>')
    .addClass('container row col-8')
    .text(formattedDate)
    .appendTo("#current-weather");

  const currentWeatherArticle = $('<h2>')
    .addClass('container row col-8')
    .text(currentWeather.city)
    .appendTo("#current-weather");


  const currentTemp = $('<p>')
    .addClass('container row col-8')
    .text('Temperature: ' + currentWeather.temp + 'F')
    .appendTo("#current-weather");

  const currentHumidity = $('<p>')
    .addClass('container row col-8')
    .text('Humidity: ' + currentWeather.humidity + '%')
    .appendTo("#current-weather");

  const currentIcon = $('<p>')
    .addClass('container row col-8')
    .append($('<img>').attr('src', `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`))
    .appendTo("#current-weather");  

  const currentWind = $('<p>')
    .addClass('container row col-8')
    .text('Wind Speed: ' + currentWeather.wind + 'mph')
    .appendTo("#current-weather");

  return currentWeatherArticle;
};

function createDayCards(fiveDay) {

  console.log("5 day")
// loop through 5
for (let i = 0; i < fiveDay.length; i++) {
  const element = fiveDay[i];

    const dayCard = $('<div>')
    .addClass('card')
    //.addStyle('width: 18rem;')   
    .appendTo("#five-day");

    const formattedDate = dayjs(element.date).format('MMM D, YYYY');

    const dayCardDate = $('<div>')
      .addClass('card-header')
      .text(formattedDate)
      .appendTo("#five-day");
      
    const dayCardIcon = $('<li>')
      .addClass('list-group-item')
      .append($('<img>').attr('src', `https://openweathermap.org/img/wn/${element.icon}@2x.png`))
      .appendTo("#five-day");

    const dayCardList = $('<ul>')
      .addClass('list-group list-group-flush')
      .appendTo("#five-day");

    const dayCardTemp = $('<li>')
      .addClass('list-group-item')
      .text('Temperature: ' + element.temp + 'F')
      .appendTo("#five-day");

    const dayCardHumidity = $('<li>')
      .addClass('list-group-item')
      .text('Humidity: ' + element.humidity + '%')
      .appendTo("#five-day");

    const dayCardWind = $('<li>')
      .addClass('list-group-item')
      .text('Wind Speed: ' + element.wind + 'mph')
      .appendTo("#five-day");


};

};

// Search button event listener
$('#search-bar').on('submit', searchSubmit)

