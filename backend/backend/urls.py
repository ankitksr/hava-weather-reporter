from contrib.views import char_count
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from hava.views import CurrentWeatherViewSet, DailyWeatherViewSet
from users.views import UserCreateViewSet, UserViewSet


router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"users", UserCreateViewSet)
router.register(r"currentweather", CurrentWeatherViewSet)
router.register(r"dailyweather", DailyWeatherViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    # path("char_count", char_count, name="char_count"),
    # re_path(".*", TemplateView.as_view(template_name="index.html")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
