# Hava - Weather Reporter

**Hava** is a simple weather reporter displaying weather information for the following cities using [OpenWeather] (https://openweathermap.org/) APIs:
- Bangalore
- Mumbai
- New York
- Dubai
- London
- Mexico City

**Hava** is built using Django REST Framework and ReactJs. It is containerized with Docker and leverages [Ofelia] (https://github.com/mcuadros/ofelia) for job scheduling on local Docker setups. The **Current Weather API** is scheduled to be called at every 5 minutes interval while the **One Call API** is called every 24 hours by default. This can be customized from the `docker-compose` file.


## Local setup
- Create a `.env` file at the root level with `OPENWEATHER_API_KEY` specified in `VAR=VAL` format.
- On your terminal, simply do `docker-compose up --build`, and wait for the containers to build. Eventually, you'll be able to see the index page by going to `[http://127.0.0.1/](http://127.0.0.1/)`.


## Deployment
A live demo of this project is deployed [here](https://hava-weather-reporter.herokuapp.com/). The demo does not however run scheduled jobs to fetch latest weather data.

