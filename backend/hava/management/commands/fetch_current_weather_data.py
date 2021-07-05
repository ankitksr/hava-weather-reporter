from typing import Any, Optional
from django.core.management.base import BaseCommand, CommandError

from hava.enums import City
from hava.partners.openweather import OpenWeatherMapAPI
from hava.models import CurrentWeatherData


class Error(CommandError):
    pass


class Command(BaseCommand):
    help = "Fetch current weather data from OpenWeather API"

    def add_arguments(self, parser):
        ...

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        try:
            api = OpenWeatherMapAPI()
            for city, readable_city_name in dict(City.CHOICES).items():
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Fetching current weather data for city: {readable_city_name}"
                    )
                )
                resp = api.get_current_weather(city)
                main = resp.get("main", {})
                wind = resp.get("wind", {})
                defaults_data = {
                    "temperature_unit": CurrentWeatherData.TemperatureUnit.CELSIUS,
                    "min_temperature": main.get("temp_min"),
                    "max_temperature": main.get("temp_max"),
                    "avg_temperature": main.get("temp"),
                    "feels_like": main.get("feels_like"),
                    "wind_speed_unit": CurrentWeatherData.WindSpeedUnit.METRE_PER_SEC,
                    "wind_speed": wind.get("speed"),
                    "wind_degree": wind.get("deg"),
                    "visibility": resp.get("visibility"),
                    "clouds": resp.get("clouds", {}).get("all"),
                }
                weather = resp.get("weather", [])
                if weather and isinstance(weather, list):
                    defaults_data.update(
                        {
                            "main": weather[0].get("main"),
                            "description": weather[0].get("description"),
                        }
                    )
                # Update database
                CurrentWeatherData.objects.update_or_create(
                    city=city, defaults=defaults_data
                )
        except Exception as e:
            raise Error(str(e))
