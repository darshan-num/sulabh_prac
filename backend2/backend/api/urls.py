from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, ItemsViewSet
#from .views import UserUpdate
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('jobs', ItemsViewSet)
#router.register('patch', UserUpdate)


urlpatterns = [
    path('', include(router.urls)),
]