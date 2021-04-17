class Forecast {
  constructor() {
    this.key = "9FVtfI80Tq0GlmPti4jz4XiMw6y3DSlk";
    this.weatherURL =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURL =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(cityName) {
    const cityDetails = await this.getCity(cityName);
    console.log(cityDetails);
    const weatherDetails = await this.getWeather(cityDetails.Key);
    console.log(weatherDetails);

    return { cityDetails, weatherDetails };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURL + query);
    const data = await response.json();

    return data[0];
  }
}
