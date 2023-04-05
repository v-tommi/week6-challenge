// Variables that grab the search bar and submit button.

var searchInfo = document.querySelector(".loc");
var searchButton = document.getElementById("submit");

// Variables that grab the p and img tags that correspond to weather data for a particular day. 

var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");

var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");
var temp5 = document.getElementById("temp5");

var desc1 = document.getElementById("description1");
var desc2 = document.getElementById("description2");
var desc3 = document.getElementById("description3");
var desc4 = document.getElementById("description4");
var desc5 = document.getElementById("description5");

var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');
var image4 = document.getElementById('img4');
var image5 = document.getElementById('img5');

var wind1 = document.getElementById('wind1');
var wind2 = document.getElementById('wind2');
var wind3 = document.getElementById('wind3');
var wind4 = document.getElementById('wind4');
var wind5 = document.getElementById('wind5');

var day1Index = document.getElementById('airpollution1');
var day2Index = document.getElementById('airpollution2');
var day3Index = document.getElementById('airpollution3');
var day4Index = document.getElementById('airpollution4');
var day5Index = document.getElementById('airpollution5');


// Counter for search values for local storage so search items are not overwritten. Variable to grab the empty history div for appending search items with created buttons. 

var searchValue = 1;
var historySearch = document.getElementById("history");


// Stores searches in local storage and creates a button element to represent it on the page in search history. Assigns buttons a class and individual IDs. Appends to empty div for search history.  

function storeSearch() {
  localStorage.setItem("search " + searchValue, searchInfo.value);
  var historyButton = document.createElement("button");
  historyButton.setAttribute("class", "btn");
  historyButton.textContent = localStorage.getItem("search " + searchValue);
  historySearch.appendChild(historyButton);
  searchValue++;
};


// Function to query the API and display the weather on weather cards. 

function getWeatherApi() {

  var urlContent = searchInfo.value.replace(/\s/g, "");
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + urlContent + "&units=imperial&APPID=5b363f0d85d1d8e70ad27ba598ac067c";


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (i = 0; i < data.list.length; i++) {

        var wicon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
        var date = new Date(data.list[i].dt * 1000);

        // Days are set in array of 40 that corresponds to 3 hour intervals per day. the 0 object represents 0300 hours on the first day, the 7 represents 0300 on the second, and so on. This grabs the data from these days and displays it on the weather cards. 

        if (i === 0) {
          day1.textContent = date.toDateString();
          temp1.textContent = "Temp: " + data.list[i].main.temp + "\u00B0 F";
          wind1.textContent = "Wind: " + data.list[i].wind.speed + " mph";
          desc1.textContent = data.list[i].weather[0].description;
          image1.setAttribute("src", wicon);
        }
        if (i === 7) {
          day2.textContent = date.toDateString();
          temp2.textContent = "Temp: " + data.list[i].main.temp + "\u00B0 F";
          wind2.textContent = "Wind: " + data.list[i].wind.speed + " mph";
          desc2.textContent = data.list[i].weather[0].description;
          image2.setAttribute("src", wicon);
        }
        if (i === 14) {
          day3.textContent = date.toDateString();
          temp3.textContent = "Temp: " + data.list[i].main.temp + "\u00B0 F";
          wind3.textContent = "Wind: " + data.list[i].wind.speed + " mph";
          desc3.textContent = data.list[i].weather[0].description;
          image3.setAttribute("src", wicon);
        }
        if (i === 21) {
          day4.textContent = date.toDateString();
          temp4.textContent = "Temp: " + data.list[i].main.temp + "\u00B0 F";
          wind4.textContent = "Wind: " + data.list[i].wind.speed + " mph";
          desc4.textContent = data.list[i].weather[0].description;
          image4.setAttribute("src", wicon);
        }
        if (i === 28) {
          day5.textContent = date.toDateString();
          temp5.textContent = "Temp: " + data.list[i].main.temp + "\u00B0 F";
          wind5.textContent = "Wind: " + data.list[i].wind.speed + " mph";
          desc5.textContent = data.list[i].weather[0].description;
          image5.setAttribute("src", wicon);
        }
      }
      return Promise.resolve(data)
    })

    // Fetch Call for Air Pollution Index
    .then(function (data) {
      var airPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&start=${data.list[0].dt}&end=${data.list[31].dt}&appid=5b363f0d85d1d8e70ad27ba598ac067c`;
      return fetch(airPollutionURL)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (airdata) {

      var lookupAirIndex = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"]

      for (i = 0; i <= 79; i++) {
        if (i === 0) {
          day1Index.textContent = "Air Pollution Index: " + lookupAirIndex[airdata.list[i].main.aqi]
        }
        if (i === 7) {
          day2Index.textContent = "Air Pollution Index: " + lookupAirIndex[airdata.list[i].main.aqi]
        }
        if (i === 31) {
          day3Index.textContent = "Air Pollution Index: " + lookupAirIndex[airdata.list[i].main.aqi]
        }
        if (i === 55) {
          day4Index.textContent = "Air Pollution Index: " + lookupAirIndex[airdata.list[i].main.aqi]
        }
        if (i === 79) {
          day5Index.textContent = "Air Pollution Index: " + lookupAirIndex[airdata.list[i].main.aqi]
        }
      }
    });

  // Stores the user's search in local storage and in the search history menu. 

  storeSearch();
}

// API function runs upon the click on the submit button next to the search menu. 

searchButton.addEventListener('click', getWeatherApi);


// Event listener that runs a function to set the search menu bar's text content to the history item that is clicked, and runs the API function for that history item. Since the API function creates a button for the item that was just searched, this event listener function will also remove the button that was clicked so that there are not duplicates. 

historySearch.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    event.stopImmediatePropagation();
    searchInfo.value = event.target.textContent;
    var removeHistoryButton = event.target;
    getWeatherApi();
    removeHistoryButton.remove();
  }
});