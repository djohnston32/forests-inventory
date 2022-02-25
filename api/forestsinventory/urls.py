from django.contrib import admin
from django.urls import path
from .views import Forests, Forest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('forests/', Forests.as_view()),
    path('forests/<int:id>', Forest.as_view()),
]
