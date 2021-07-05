import requests

from django.conf import settings

from hava.enums import City


class Error(Exception):
    pass


class ServiceNotEnabledError(Error):
    pass


class ArgumentError(Error, ValueError):
    pass


class OpenWeatherMapAPI:
    def __init__(self, *args, **kwargs):
        if not settings.OPENWEATHER_API_KEY:
            raise ServiceNotEnabledError("OpenWeather API key not found")
        self.api_key = settings.OPENWEATHER_API_KEY

    def _get(self, url, **kwargs):
        kwargs["appid"] = (self.api_key,)
        response = requests.get(url, params=kwargs)
        response.raise_for_status()
        return response.json()

    def get_daily_weather(self, city=None):
        if not city or city not in City.COORD_MAP:
            raise ArgumentError("Missing or bad city value")
        url = settings.OPENWEATHER_ONE_CALL_API_URL
        kwargs = City.COORD_MAP[city]
        kwargs.update({"exclude": "current,minutely,hourly", "units": "metric"})
        response = self._get(url, **kwargs)
        return response

    def get_current_weather(self, city=None):
        if not city or city not in City.OPENWEATHER_ID_MAP:
            raise ArgumentError("Missing or bad city value")
        url = settings.OPENWEATHER_CURRENT_WEATHER_API_URL
        kwargs = {"id": City.OPENWEATHER_ID_MAP[city], "units": "metric"}
        response = self._get(url, **kwargs)
        return response
