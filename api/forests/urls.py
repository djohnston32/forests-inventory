from django.urls import path
from .views import Forests, Forest, ForestHealth

urlpatterns = [
    path('', Forests.as_view()),
    path('<int:id>', Forest.as_view()),
    path('<int:id>/health', ForestHealth.as_view()),
]
