from django.db.models import query
from rest_framework import viewsets

from .models import CurrentWeatherData, DailyWeatherData
from .serializers import CurrentWeatherDataSerializer, DailyWeatherDataSerializer


class CurrentWeatherViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing current weather data.
    """

    queryset = CurrentWeatherData.objects.all()
    serializer_class = CurrentWeatherDataSerializer


class DailyWeatherViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing daily weather data.
    """

    queryset = DailyWeatherData.objects.all()
    serializer_class = DailyWeatherDataSerializer
