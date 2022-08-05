from django.urls import include, path

from rest_framework.routers import DefaultRouter

from device import views

# router = DefaultRouter()
# router.register("device", views.DeviceViewset)

# app_name = "device"

urlpatterns = [
    path("", views.DeviceView.as_view()),
]
