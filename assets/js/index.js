let div = document.createElement("div")
let fiveDay = document.createElement("div")
let five = document.createElement("h3")

async function getCoord(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=5292a74c7ba68dc74baa11767b0900c6`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        const coords = [json[0].lat, json[0].lon]
        callWeatherAPI(coords)
    } catch (error) {
        console.error(error.message)
    }
}

async function callWeatherAPI(coords) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=5292a74c7ba68dc74baa11767b0900c6`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
        populatePage(json)
    } catch (error) {
        console.error(error.message)
    }
}

function populatePage(response) {
    let main = document.querySelector('.main')
    let previousList = document.querySelector('.previous-searches')
    let previousSearch = document.createElement("h5")
    div.setAttribute("class", "city-card d-flex flex-column")
    div.innerHTML = `
                <h1>${response.city.name} ${response.list[0].dt_txt}</h1>
                <p>${response.list[0].weather[0].description}</p>
                <p>Temp: ${response.list[0].main.temp}</p>
                <p>Wind: ${response.list[0].wind.speed} MPH</p>
                <p>Humidity: ${response.list[0].main.humidity}%</p>
    `
        ;
    fiveDay.setAttribute("class", "five-day d-flex flex-row justify-content-between")
    fiveDay.innerHTML = `
                <div class="five-day-card d-flex flex-column">
                    <h4>${response.list[0].dt_txt}</h4>
                    <p>${response.list[0].weather[0].description}</p>
                    <p>Temp: ${response.list[0].main.temp}</p>
                    <p>Wind: ${response.list[0].wind.speed} MPH</p>
                    <p>Humidity: ${response.list[0].main.humidity}%</p>
                </div>
                <div class="five-day-card d-flex flex-column">
                    <h4>${response.list[8].dt_txt}</h4>
                    <p>${response.list[8].weather[0].description}</p>
                    <p>Temp: ${response.list[8].main.temp}</p>
                    <p>Wind: ${response.list[8].wind.speed} MPH</p>
                    <p>Humidity: ${response.list[8].main.humidity}%</p>
                </div>
                <div class="five-day-card d-flex flex-column">
                    <h4>${response.list[16].dt_txt}</h4>
                    <p>${response.list[16].weather[0].description}</p>
                    <p>Temp: ${response.list[16].main.temp}</p>
                    <p>Wind: ${response.list[16].wind.speed} MPH</p>
                    <p>Humidity: ${response.list[16].main.humidity}%</p>
                </div>
                <div class="five-day-card d-flex flex-column">
                    <h4>${response.list[24].dt_txt}</h4>
                    <p>${response.list[24].weather[0].description}</p>
                    <p>Temp: ${response.list[24].main.temp}</p>
                    <p>Wind: ${response.list[24].wind.speed} MPH</p>
                    <p>Humidity: ${response.list[24].main.humidity}%</p>
                </div>
                <div class="five-day-card d-flex flex-column">
                    <h4>${response.list[32].dt_txt}</h4>
                    <p>${response.list[32].weather[0].description}</p>
                    <p>Temp: ${response.list[32].main.temp}</p>
                    <p>Wind: ${response.list[32].wind.speed} MPH</p>
                    <p>Humidity: ${response.list[32].main.humidity}%</p>
                </div>
    `
    five.textContent = 'Five Day Forecast:'
    previousSearch.setAttribute("class", "previous-search")
    previousSearch.textContent = response.city.name
    main.appendChild(div)
    main.appendChild(five)
    main.appendChild(fiveDay)
    previousList.appendChild(previousSearch)
    previousSearch.addEventListener("click", function (e) {
        e.preventDefault();
        const cityName = this.textContent
        console.log(cityName)
        getCoord(cityName)
    });
}






document.querySelector("#search-button").addEventListener("click", function (e) {
    e.preventDefault();
    city = document.getElementById("search-bar").value
    getCoord(city)
});