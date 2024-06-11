// async function apiTest() {
//     const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9025870b58f55c244123e7bc18ed93ea");
//     const movies = await response.json();
//     console.log(movies);
//     }
 
// apiTest()

// const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9025870b58f55c244123e7bc18ed93ea';

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


// takes the text entered in the search bar and assigns it to a variable when the search button is clicked
  function searchSubmit(event) {
    event.preventDefault();

    const searchInput = $('#search-input').val();
    
    console.log("searched");
    console.log(searchInput);

    // clears the search bar
    $('#search-input').val('');

};
  
// Search button event listener
$('#search-bar').on('submit', searchSubmit);