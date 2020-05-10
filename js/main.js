const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')


const updateUi = (data) => {

  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructure properties
  const {cityDets, weather} = data;

  // update the ui
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the day/night img and icon

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  if(weather.IsDayTime) {
    time.setAttribute('src', 'img/day.svg');
  } else {
    time.setAttribute('src','img/night.svg');
  }

  // remove d-none class if it is present
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}
// update city function
const updateCity = async (CityName) => {

  const cityDets = await getCity(CityName);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
}

cityForm.addEventListener('submit', e => {
  // get city name
  const CityName = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city 
  updateCity(CityName)
    .then(data => updateUi(data))
    .catch(err =>  console.log('Couldn\'t fetch data'));
  e.preventDefault();
})