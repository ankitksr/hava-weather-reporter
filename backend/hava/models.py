from django.db import models
from django.utils.translation import gettext_lazy as _

from .enums import City


# Mixins
class BaseModel(models.Model):
    """
    The base class containing overhead fields used across all objects
    """

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class WindMetricsMixin(models.Model):
    """Mixin for capturing wind metrics"""

    # Wind speed
    class WindSpeedUnit(models.TextChoices):
        METRE_PER_SEC = "MPS", _("metre/sec")
        MILES_PER_HOUR = "MPH", _("miles/hour")

    wind_speed_unit = models.CharField(
        null=True, blank=True, max_length=3, choices=WindSpeedUnit.choices
    )
    wind_speed = models.FloatField(null=True, blank=True)
    # Wind direction, degrees (meteorological)
    wind_degree = models.IntegerField(null=True, blank=True)

    class Meta:
        abstract = True


class TemperatureMetricsMixin(models.Model):
    """Mixin for capturing temperature metrics"""

    # Temperature
    class TemperatureUnit(models.TextChoices):
        KELVIN = "K", _("Kelvin")
        CELSIUS = "C", _("Celsius")
        FAHRENHEIT = "F", _("Fahrenheit")

    temperature_unit = models.CharField(
        null=True, blank=True, max_length=1, choices=TemperatureUnit.choices
    )
    min_temperature = models.FloatField(null=True, blank=True)
    max_temperature = models.FloatField(null=True, blank=True)

    class Meta:
        abstract = True


class WeatherDescriptionMixin(models.Model):
    """Mixin for capturing textual description of weather"""

    main = models.CharField(null=True, blank=True, max_length=20)
    description = models.CharField(null=True, blank=True, max_length=100)

    class Meta:
        abstract = True


class CityMixin(models.Model):
    """Mixin to add city information"""

    city = models.CharField(max_length=City.MAX_LENGTH, choices=City.CHOICES)

    class Meta:
        abstract = True


# Concrete models
class DailyWeatherData(
    CityMixin,
    WeatherDescriptionMixin,
    TemperatureMetricsMixin,
    WindMetricsMixin,
    BaseModel,
):
    """
    Stores the daily weather data for cities
    """

    forecast_date = models.DateTimeField()

    # Atmospheric pressure on the sea level, hPa
    pressure = models.FloatField(null=True, blank=True)

    # Humidity, %
    humidity = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.city}: {self.forecast_date}"

    class Meta:
        app_label = "hava"
        ordering = ["forecast_date"]
        constraints = [
            models.UniqueConstraint(
                fields=["forecast_date", "city"], name="uq_dailyweather_city_date"
            )
        ]


class CurrentWeatherData(
    CityMixin,
    WeatherDescriptionMixin,
    TemperatureMetricsMixin,
    WindMetricsMixin,
    BaseModel,
):
    """
    Stores the current weather data for cities
    """

    # Override city to make unique
    city = models.CharField(
        unique=True, max_length=City.MAX_LENGTH, choices=City.CHOICES
    )

    # Visibility, meter
    visibility = models.IntegerField(null=True, blank=True)

    # Cloudiness, %
    clouds = models.IntegerField(null=True, blank=True)

    # Temperature fields, in addition to TemperatureMetricsMixin
    avg_temperature = models.FloatField(null=True, blank=True)
    feels_like = models.FloatField(
        null=True, blank=True
    )  # accounts for the human perception of weather

    def __str__(self) -> str:
        return f"{self.city}: {self.date_created}"

    class Meta:
        app_label = "hava"
