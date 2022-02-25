from django.contrib import admin
from django.urls import path
from .views import Forests

urlpatterns = [
    path('admin/', admin.site.urls),
    path('forests/', Forests.as_view()),
]
