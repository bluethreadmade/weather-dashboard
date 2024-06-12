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
          console.log(weatherData);

            for(i=0; i< weatherData.list.length; i+=8) {
              console.log(weatherData.list[i].dt_txt);

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
              
              return oneDay;
            }
            
        });

      })
      .catch(function (error) {
          console.error('Error featching geographical coordinated:', error);
      });
    
     createCurrentWeatherArticle(currentWeather);
     createDayCards(oneDay);
  };

    

function createCurrentWeatherArticle(currentWeather) {

  console.log("current weather");

  const currentWeatherArticle = $('<h2>')
    .addClass('container row col-8')
    .text(currentWeather.city)
    .appendTo("#current-weather");

  const currentWeatherDay = $('<h3>')
    .addClass('container row col-8')
    .text(currentWeather.time)
    .appendTo("#current-weather");

  const currentTemp = $('<p>')
    .addClass('container row col-8')
    .text(currentWeather.temp)
    .appendTo("#current-weather");

  const currentHumidity = $('<p>')
    .addClass('container row col-8')
    .text(currentWeather.humidity)
    .appendTo("#current-weather");

  const currentIcon = $('<p>')
    .addClass('container row col-8')
    .text(currentWeather.icon)
    .appendTo("#current-weather");

  return currentWeatherArticle;
};

function createDayCards() {

  console.log("5 day")

  const dayCard = $('<div>')
    .addClass('card')
    //.addStyle('width: 18rem;')   
    .appendTo("#five-day");

  const dayCardList = $('<ul>')
    .addClass('list-group list-group-flush')
    .appendTo("#five-day");

  const dayCardTemp = $('<li>')
    .addClass('list-group-item')
    .text(oneDay.dayTemp)
    .appendTo("#five-day");

  const dayCardHumidity = $('<li>')
    .addClass('list-group-item')
    .text(oneDay.dayHumidity)
    .appendTo("#five-day");

  const dayCardIcon = $('<li>')
    .addClass('list-group-item')
    .text(oneDay.dayIcon)
    .appendTo("#five-day");

  const dayCardWind = $('<li>')
    .addClass('list-group-item')
    .text(oneDay.dayWind)
    .appendTo("#five-day");

  const dayCardDate = $('<li>')
    .addClass('list-group-item')
    .text(oneDay.dayDate)
    .appendTo("#five-day");

  return dayCard;
};



  
// Search button event listener
$('#search-bar').on('submit', searchSubmit)