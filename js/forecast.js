class Forecast {
  constructor() {
    this.key = '9FVtfI80Tq0GlmPti4jz4XiMw6y3DSlk';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }

  async updateCity(cityName) {
    const cityDets = await this.getCity(cityName);
    const weather = await this.getWeather(cityDets.Key);

    return { cityDets, weather };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURI + query);
    const data = await response.json();

    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query);
    const data = await response.json();

    return data[0];
  }
}

