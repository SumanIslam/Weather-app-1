const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');


const updateUi = (data) => {

  const cityDets = data.cityDets;
  const weather = data.weather;

  console.log(cityDets, weather);

  // update the ui
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span></span>
      <span>&deg;C</span>
    </div>
  `
}
// upadate city function
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