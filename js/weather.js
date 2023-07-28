// Здобуваємо потрібні дані про погоду

import env from './key.env.js'
const apiKey = env.env.apiKey
const kyivCard = document.querySelector('.weather__kyiv')
const odesaCard = document.querySelector('.weather__odesa')
const kharkivCard = document.querySelector('.weather__kharkiv')

async function getWeatherData(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},ua&APPID=${apiKey}`)
        return await response.json()
    } catch (error) {
        return console.error(`Помилка при отриманні даних для міста ${city}:`, error)
    }
}

const kyivWeather = getWeatherData('Kyiv')
const odesaWeather = getWeatherData('Odesa')
const kharkivWeather = getWeatherData('Kharkiv')

function renderWeatherHTML(data) {
    let weather
    if (data.weather[0]['main'] === 'Light rain' || data.weather[0].main === 'Rain') weather = 'rainy'
    if (data.weather[0]['main'] === 'Clouds') weather = 'cloudy'
    if (data.weather[0]['main'] === 'Clear') weather = 'sunny'

    const source = `../../icons/${weather}.png`

    return `
        <h4>${data.name}</h4>
        <img src='${source}'><img>
        <p>${Math.round(data.main.temp - 273) + '&deg;'}</p>
        <span>${data.weather[0].description}</span>
    `
}

Promise.all([kyivWeather, odesaWeather, kharkivWeather])
    .then(data => {
        const [kyivData, odesaData, kharkivData] = data
        odesaCard.innerHTML = renderWeatherHTML(odesaData)
        kyivCard.innerHTML = renderWeatherHTML(kyivData)
        kharkivCard.innerHTML = renderWeatherHTML(kharkivData)
    })
