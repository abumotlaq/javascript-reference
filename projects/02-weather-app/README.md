# Weather App

A weather application built with HTML, CSS, and vanilla JavaScript.

The application searches for locations, retrieves current weather conditions, displays a multi-day forecast, and can use the browser's geolocation API to load weather for the user's current position.

## Features

- Search for cities and locations
- Display current weather conditions
- Display a multi-day forecast
- Show temperature and apparent temperature
- Show humidity and wind speed
- Show precipitation probability
- Use the browser's geolocation API
- Handle API and network errors
- Cancel outdated requests
- Display loading states
- Responsive layout
- Restore the last searched location

## APIs Used

The project uses:

- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- Browser Geolocation API
- Fetch API
- AbortController
- URLSearchParams

## Concepts Demonstrated

- Variables and constants
- Functions
- Arrays and objects
- Destructuring
- Async functions
- `fetch()`
- `async/await`
- `try/catch/finally`
- `AbortController`
- `URLSearchParams`
- DOM manipulation
- Event handling
- Dynamic rendering
- Browser APIs
- Local Storage
- Error handling

## Project Structure

```text
02-weather-app/
├── README.md
├── index.html
├── style.css
└── app.js