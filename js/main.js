const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();

const updateUi = (data) => {
  document.querySelector(".result").style.display = "none";
  document.querySelector("#loading").style.display = "block";

  setTimeout(() => {
    document.querySelector("#loading").style.display = "none";
    document.querySelector(".result").style.display = "block";
  }, 2000);

  // getting data using ES6 destructure
  const { cityDetails, weatherDetails } = data;

  // update the weather details part of the UI
  details.innerHTML = `
    <div class="my-2 capitalize">${cityDetails.EnglishName} <b>-</b> ${weatherDetails.WeatherText}</div>
    <div class="display-3 my-3">
      <span>${weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the day/night icon
  const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  icon.className += "bg-light";
  icon.style.borderRadius = "50%";

  // update the day/night image
  if (weatherDetails.IsDayTime) {
    time.setAttribute("src", "img/day.svg");
  } else {
    time.setAttribute("src", "img/night.svg");
  }
}

cityForm.addEventListener('submit', e => {
  // get city name from input field
  const CityName = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city 
  forecast.updateCity(CityName)
    .then(data => updateUi(data))
    .catch(err =>  console.log(err,'Couldn\'t fetch data'));


  e.preventDefault();

  localStorage.setItem('city', CityName);
})

if(localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data)) 
    .catch(err => console.log(err));
}