const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const STORAGE_KEY = "javascript-reference-weather-location";

const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const locationButton = document.querySelector("#locationButton");
const refreshButton = document.querySelector("#refreshButton");

const searchError = document.querySelector("#searchError");
const statusMessage = document.querySelector("#statusMessage");
const weatherSection = document.querySelector("#weatherSection");

const locationName = document.querySelector("#locationName");
const locationDetails = document.querySelector("#locationDetails");

const weatherIcon = document.querySelector("#weatherIcon");
const weatherDescription = document.querySelector("#weatherDescription");
const currentTemperature = document.querySelector("#currentTemperature");
const feelsLike = document.querySelector("#feelsLike");

const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const precipitation = document.querySelector("#precipitation");

const forecastList = document.querySelector("#forecastList");
const forecastUpdated = document.querySelector("#forecastUpdated");

let currentLocation = loadSavedLocation();
let activeController = null;

const weatherDescriptions = {
  0: {
    label: "Clear sky",
    icon: "☀️"
  },
  1: {
    label: "Mainly clear",
    icon: "🌤️"
  },
  2: {
    label: "Partly cloudy",
    icon: "⛅"
  },
  3: {
    label: "Overcast",
    icon: "☁️"
  },
  45: {
    label: "Fog",
    icon: "🌫️"
  },
  48: {
    label: "Rime fog",
    icon: "🌫️"
  },
  51: {
    label: "Light drizzle",
    icon: "🌦️"
  },
  53: {
    label: "Moderate drizzle",
    icon: "🌦️"
  },
  55: {
    label: "Dense drizzle",
    icon: "🌧️"
  },
  56: {
    label: "Light freezing drizzle",
    icon: "🌧️"
  },
  57: {
    label: "Dense freezing drizzle",
    icon: "🌧️"
  },
  61: {
    label: "Slight rain",
    icon: "🌦️"
  },
  63: {
    label: "Moderate rain",
    icon: "🌧️"
  },
  65: {
    label: "Heavy rain",
    icon: "🌧️"
  },
  66: {
    label: "Light freezing rain",
    icon: "🌧️"
  },
  67: {
    label: "Heavy freezing rain",
    icon: "🌧️"
  },
  71: {
    label: "Slight snow",
    icon: "🌨️"
  },
  73: {
    label: "Moderate snow",
    icon: "🌨️"
  },
  75: {
    label: "Heavy snow",
    icon: "❄️"
  },
  77: {
    label: "Snow grains",
    icon: "❄️"
  },
  80: {
    label: "Slight rain showers",
    icon: "🌦️"
  },
  81: {
    label: "Moderate rain showers",
    icon: "🌧️"
  },
  82: {
    label: "Violent rain showers",
    icon: "⛈️"
  },
  85: {
    label: "Slight snow showers",
    icon: "🌨️"
  },
  86: {
    label: "Heavy snow showers",
    icon: "❄️"
  },
  95: {
    label: "Thunderstorm",
    icon: "⛈️"
  },
  96: {
    label: "Thunderstorm with slight hail",
    icon: "⛈️"
  },
  99: {
    label: "Thunderstorm with heavy hail",
    icon: "⛈️"
  }
};

function loadSavedLocation() {
  try {
    const savedLocation = localStorage.getItem(STORAGE_KEY);

    if (!savedLocation) {
      return null;
    }

    return JSON.parse(savedLocation);
  } catch (error) {
    console.error("Failed to load saved location:", error);
    return null;
  }
}

function saveLocation(location) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(location)
    );
  } catch (error) {
    console.error("Failed to save location:", error);
  }
}

function getWeatherDescription(code) {
  return (
    weatherDescriptions[code] || {
      label: "Unknown conditions",
      icon: "🌡️"
    }
  );
}

function formatDate(dateString, options = {}) {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat(
    undefined,
    options
  ).format(date);
}

function formatUpdatedTime(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function showStatus(message) {
  statusMessage.textContent = message;
  statusMessage.hidden = false;
}

function hideStatus() {
  statusMessage.textContent = "";
  statusMessage.hidden = true;
}

function showSearchError(message) {
  searchError.textContent = message;
  searchError.hidden = false;
}

function hideSearchError() {
  searchError.textContent = "";
  searchError.hidden = true;
}

function setLoading(isLoading) {
  searchForm.querySelector("button[type='submit']").disabled =
    isLoading;

  locationButton.disabled = isLoading;
  refreshButton.disabled = isLoading;
}

async function fetchJson(url, signal) {
  const response = await fetch(url, {
    signal
  });

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}.`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      data.reason || "The API returned an error."
    );
  }

  return data;
}

async function searchLocation(name, signal) {
  const params = new URLSearchParams({
    name,
    count: "5",
    language: "en",
    format: "json"
  });

  const url = `${GEOCODING_API_URL}?${params}`;

  const data = await fetchJson(url, signal);

  if (!data.results?.length) {
    throw new Error(
      "No location was found. Try another city name."
    );
  }

  return data.results[0];
}

async function fetchWeather(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max"
    ].join(","),
    forecast_days: "5",
    timezone: "auto"
  });

  const url = `${WEATHER_API_URL}?${params}`;

  return fetchJson(url, signal);
}

async function loadWeather(location) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  const { signal } = activeController;

  setLoading(true);
  showStatus("Loading weather...");
  hideSearchError();

  try {
    const weather = await fetchWeather(
      location.latitude,
      location.longitude,
      signal
    );

    currentLocation = location;

    saveLocation(location);
    renderWeather(location, weather);

    weatherSection.hidden = false;
    hideStatus();
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    weatherSection.hidden = true;
    showStatus("Unable to load weather data.");
    showSearchError(error.message);

    console.error("Weather request failed:", error);
  } finally {
    setLoading(false);
  }
}

function renderWeather(location, weather) {
  const current = weather.current;
  const currentWeather = getWeatherDescription(
    current.weather_code
  );

  locationName.textContent = location.name;

  const details = [
    location.admin1,
    location.country
  ].filter(Boolean);

  locationDetails.textContent = details.join(", ");

  weatherIcon.textContent = currentWeather.icon;
  weatherDescription.textContent = currentWeather.label;

  currentTemperature.textContent = Math.round(
    current.temperature_2m
  );

  feelsLike.textContent =
    `Feels like ${Math.round(current.apparent_temperature)}°C`;

  humidity.textContent =
    `${Math.round(current.relative_humidity_2m)}%`;

  windSpeed.textContent =
    `${Math.round(current.wind_speed_10m)} km/h`;

  precipitation.textContent =
    `${current.precipitation} mm`;

  forecastUpdated.textContent =
    `Updated ${formatUpdatedTime(current.time)}`;

  renderForecast(weather.daily);
}

function renderForecast(daily) {
  forecastList.replaceChildren();

  const fragment = document.createDocumentFragment();

  daily.time.forEach((date, index) => {
    const weather = getWeatherDescription(
      daily.weather_code[index]
    );

    const card = document.createElement("article");
    card.className = "forecast-card";

    const day = document.createElement("p");
    day.className = "forecast-day";

    day.textContent =
      index === 0
        ? "Today"
        : formatDate(date, {
            weekday: "short"
          });

    const icon = document.createElement("span");
    icon.className = "forecast-icon";
    icon.textContent = weather.icon;
    icon.setAttribute("aria-hidden", "true");

    const description = document.createElement("p");
    description.className = "forecast-description";
    description.textContent = weather.label;

    const temperatures = document.createElement("div");
    temperatures.className = "forecast-temperature";

    const high = document.createElement("span");
    high.className = "forecast-high";
    high.textContent =
      `${Math.round(daily.temperature_2m_max[index])}°`;

    const low = document.createElement("span");
    low.className = "forecast-low";
    low.textContent =
      `${Math.round(daily.temperature_2m_min[index])}°`;

    temperatures.append(high, low);

    const rain = document.createElement("p");
    rain.className = "forecast-rain";

    rain.textContent =
      `${daily.precipitation_probability_max[index]}% rain`;

    card.append(
      day,
      icon,
      description,
      temperatures,
      rain
    );

    fragment.appendChild(card);
  });

  forecastList.appendChild(fragment);
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Geolocation is not supported by this browser."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  });
}

async function handleSearch(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  hideSearchError();

  if (!city) {
    showSearchError(
      "Please enter a city name."
    );

    cityInput.focus();

    return;
  }

  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  setLoading(true);
  showStatus("Searching for location...");

  try {
    const location = await searchLocation(
      city,
      activeController.signal
    );

    await loadWeather(location);

    cityInput.value = location.name;
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    hideStatus();
    showSearchError(error.message);

    console.error("Location search failed:", error);
  } finally {
    setLoading(false);
  }
}

async function handleGeolocation() {
  hideSearchError();

  setLoading(true);
  showStatus("Getting your location...");

  try {
    const position = await getCurrentPosition();

    const location = {
      name: "Current Location",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      admin1: "",
      country: ""
    };

    await loadWeather(location);
  } catch (error) {
    hideStatus();

    if (error.code === 1) {
      showSearchError(
        "Location permission was denied."
      );
    } else if (error.code === 2) {
      showSearchError(
        "Your location could not be determined."
      );
    } else if (error.code === 3) {
      showSearchError(
        "Location request timed out."
      );
    } else {
      showSearchError(error.message);
    }

    console.error("Geolocation failed:", error);
  } finally {
    setLoading(false);
  }
}

async function handleRefresh() {
  if (!currentLocation) {
    return;
  }

  await loadWeather(currentLocation);
}

searchForm.addEventListener(
  "submit",
  handleSearch
);

locationButton.addEventListener(
  "click",
  handleGeolocation
);

refreshButton.addEventListener(
  "click",
  handleRefresh
);

if (currentLocation) {
  cityInput.value = currentLocation.name === "Current Location"
    ? ""
    : currentLocation.name;

  loadWeather(currentLocation);
}