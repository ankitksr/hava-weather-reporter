import pytz
from datetime import datetime
from typing import Any, Optional
from django.core.management.base import BaseCommand, CommandError

from hava.enums import City
from hava.partners.openweather import OpenWeatherMapAPI
from hava.models import DailyWeatherData


class Error(CommandError):
    pass


class Command(BaseCommand):
    help = "Fetch daily weather data from OpenWeather API"

    def add_arguments(self, parser):
        ...

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        try:
            api = OpenWeatherMapAPI()
            for city, readable_city_name in dict(City.CHOICES).items():
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Fetching daily weather data for city: {readable_city_name}"
                    )
                )
                resp = api.get_daily_weather(city)
                for day in resp.get("daily", []):
                    dt = day.get("dt")
                    forecast_date = datetime.fromtimestamp(dt).replace(tzinfo=pytz.UTC)
                    defaults_data = {
                        "wind_speed": day.get("wind_speed"),
                        "wind_speed_unit": DailyWeatherData.WindSpeedUnit.METRE_PER_SEC,
                        "wind_degree": day.get("wind_deg"),
                        "temperature_unit": DailyWeatherData.TemperatureUnit.CELSIUS,
                        "min_temperature": day.get("temp", {}).get("min"),
                        "max_temperature": day.get("temp", {}).get("max"),
                        "pressure": day.get("pressure"),
                        "humidity": day.get("humidity"),
                    }
                    weather = day.get("weather", [])
                    if weather and isinstance(weather, list):
                        defaults_data.update(
                            {
                                "main": weather[0].get("main"),
                                "description": weather[0].get("description"),
                            }
                        )
                    # Update database
                    DailyWeatherData.objects.update_or_create(
                        city=city,
                        forecast_date=forecast_date,
                        defaults=defaults_data,
                    )
        except Exception as e:
            raise Error(str(e))
