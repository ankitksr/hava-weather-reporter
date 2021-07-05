# Hava - Weather Reporter

**Hava** is a simple weather reporter displaying weather information for the following cities using [OpenWeather](https://openweathermap.org/) APIs:
- Bangalore
- Mumbai
- New York
- Dubai
- London
- Mexico City

**Hava** is built using Django REST Framework and ReactJs. It is containerized with Docker and leverages [Ofelia](https://github.com/mcuadros/ofelia) for job scheduling on local Docker setups. The **Current Weather API** is scheduled to be called at every 5 minutes interval while the **One Call API** is called every 24 hours by default. This can be customized from the `docker-compose` file.


## Local setup
- Create a `.env` file at the root level with `OPENWEATHER_API_KEY` specified in `VAR=VAL` format. Custom database credentials can also be specified here but are not necessary. This project uses [dj_database_url](https://github.com/kennethreitz/dj-database-url).
- On your terminal, simply do `docker-compose up --build`, and wait for the containers to build. Eventually, you'll be able to see the **Dashboard** page by going to [http://127.0.0.1/](http://127.0.0.1/).
- The jobs for fetching weather details are run when containers are started and thereafter at scheduled intervals.
- To view data in the database, connect to the *postgres* container using:
    ```
    docker-compose exec postgres bash
    psql -U <uname>
    ```

## Demo
A live demo of this project is deployed [here](https://hava-weather-reporter.herokuapp.com/). The demo does not however run scheduled jobs to fetch latest weather data.
