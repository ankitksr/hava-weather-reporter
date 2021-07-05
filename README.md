# Hava - Weather Reporter

**Hava** is a simple weather reporter displaying weather information for the following cities using [OpenWeather] (https://openweathermap.org/) APIs:
- Bangalore
- Mumbai
- New York
- Dubai
- London
- Mexico City

**Hava** is built using Django REST Framework and ReactJs. It is containerized with Docker and leverages [Ofelia] (https://github.com/mcuadros/ofelia) for job scheduling on Docker environments.


## Local setup
On your terminal, simply do `docker-compose up --build`, and wait for the containers to build. Eventually, you'll be able to see the index page by going to `[http://127.0.0.1:3000/](http://127.0.0.1:3000/)`.


## Deployment
A live instance of this project is deployed [here]().
