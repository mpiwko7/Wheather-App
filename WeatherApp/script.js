const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const date = document.querySelector(".current-date");
const dateNumber = document.querySelector(".current-date-number");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=efc3e050edd4e679d5fa634066b1c6fb";
const API_UNITS = "&units=metric";

const day = new Date();
date.textContent = day.toLocaleDateString("en", { weekday: "long" });
dateNumber.textContent = new Date().toLocaleDateString();

const getWeather = () => {
	const city = input.value || "Cracow";
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			console.log(res.data);
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = status.main;
			warning.textContent = "";
			input.value = "";

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.png");
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute("src", "./img/drizzle.png");
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.png");
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute("src", "./img/ice.png");
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute("src", "./img/fog.png");
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.png");
			} else if (status.id >= 801 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.png");
			} else {
				photo.setAttribute("src", "./img/unknown.png");
			}
		})
		.catch(() => (warning.textContent = "Enter a correct city name!"));
};

input.addEventListener("keyup", (e) => {
	if (e.key === "Enter") getWeather();
});

getWeather();

button.addEventListener("click", getWeather);
