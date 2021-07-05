from rest_framework import serializers
from .models import CurrentWeatherData, DailyWeatherData


class DailyWeatherDataSerializer(serializers.ModelSerializer):
    city = serializers.CharField(source="get_city_display")
    temperature_unit = serializers.CharField(source="get_temperature_unit_display")
    forecast_date = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = DailyWeatherData
        fields = "__all__"


class CurrentWeatherDataSerializer(serializers.ModelSerializer):
    city = serializers.CharField(source="get_city_display")
    temperature_unit = serializers.CharField(source="get_temperature_unit_display")

    class Meta:
        model = CurrentWeatherData
        fields = "__all__"
