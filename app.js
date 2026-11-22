const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchIcon = document.querySelector("#searchIcon");
const desc = document.querySelector("#desc");
const icon = document.querySelector(".icon");
const temp = document.querySelector("#temp");
const cityName = document.querySelector("#city");
const wind = document.querySelector("#windSpeed");
const humidityper = document.querySelector("#humidityper");
const goHome = document.querySelector(".goBack");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");

startBtn.addEventListener("click", () => {
  mainBox1.classList.add("inactive");
  mainBox2.classList.remove("inactive");
});

function changeIcon(weatherMain) {
  let icons = {
    Clouds: "./cloudy.png",
    Rain: "./rain.png",
    Drizzle: "./drizzle.png",
    Thunderstorm: "./rain.png",
    Mist: "./mist.png",
    Fog: "./mist.png",
    Haze: "./haze.png",
    Snow: "./snow.png",
    Smoke: "./mist.png",
    Dust: "./haze.png",
    Clear: "./clear1.png",
    Sand: "./sand.png",
  };

  icon.src = icons[weatherMain] || "./cloudy.png";
}

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "f5ef2161dcfc0427b4607560a60f7891";

async function getWeatherData(city) {
  let finalUrl = `${url}q=${city}&appid=${apiKey}`;
  let weatherData = await fetch(finalUrl).then((res) => res.json());
  console.log(weatherData);

  if (weatherData.cod == 404) {
    mainBox2.classList.add("inactive");
    mainBox1.classList.add("inactive");
    mainBox3.classList.remove("inactive");
    desc.innerHTML = "description";
    temp.innerHTML = "0°C";
    cityName.innerHTML = "New York";
    wind.innerHTML = "0 km/h";
    humidityper.innerHTML = "0 %";
    search.value = "";
    icon.src = "./clear1.png";
  }

  desc.innerHTML = weatherData.weather[0].description;
  temp.innerHTML = Math.round(weatherData.main.temp - 273.15) + "°C";
  cityName.innerHTML = weatherData.name;
  wind.innerHTML = weatherData.wind.speed + "km/h";
  humidityper.innerHTML = weatherData.main.humidity + "%";

  changeIcon(weatherData.weather[0].main);
}

searchIcon.addEventListener("click", () => {
  getWeatherData(search.value);
});

search.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeatherData(search.value);
  }
});

goHome.addEventListener("click", () => {
  mainBox3.classList.add("inactive");
  mainBox1.classList.remove("inactive");
});

//dark theme
let themeIcon = document.querySelector("#theme");

themeIcon.onclick = () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.src = "./sun.png";
  } else {
    themeIcon.src = "./moon.png";
  }
};
