async function apiTest() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9025870b58f55c244123e7bc18ed93ea");
    const movies = await response.json();
    console.log(movies);
    }
 
apiTest()