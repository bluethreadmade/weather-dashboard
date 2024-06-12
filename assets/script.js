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
          console.log(data.name);
          console.log(data.coord.lat);
          console.log(data.coord.lon);
          console.log(data.main.temp);
          console.log(data.main.humidity);
          console.log(data.weather[0].icon);
          console.log(data.wind.speed);
          console.log(data.dt);

          const searchLat = data.coord.lat; 
          const searchLon = data.coord.lon;

          const currentCity = data.name;
          console.log(data.coord.lat);
          console.log(data.coord.lon);
          console.log(data.main.temp);
          console.log(data.main.humidity);
          console.log(data.weather[0].icon);
          console.log(data.wind.speed);
          console.log(data.dt);


          // create array of current data
          const currentWeather = {
            city: currentCity,
            temp: data.main.temp,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
            wind: data.wind.speed,
            time: data.dt,
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
          console.log(weatherData.list.main);
      })
      .catch(function (error) {
          console.error('Error featching geographical coordinated:', error);
      });
    
     createCurrentWeatherArticle(currentWeather);
    })
}

function createCurrentWeatherArticle(currentWeather) {
          console.log("hi");
        const currentWeatherArticle = $('<h2>')
          .addClass('container row col-8')
          .text(currentWeather.city)
          .appendTo("#current-weather");

  return currentWeatherArticle;
}



  
// Search button event listener
$('#search-bar').on('submit', searchSubmit)