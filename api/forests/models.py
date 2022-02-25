from django.db import models

class Forest(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image_url = models.CharField(max_length=50)
    forest_type = models.CharField(max_length=13)
    short_description = models.CharField(max_length=50)
    long_description = models.CharField(max_length=1024)
    country = models.CharField(max_length=50)
    latitude = models.CharField(max_length=30)
    longitude = models.CharField(max_length=30)
    area_hectares = models.PositiveIntegerField()

class ForestHealth(models.Model):
    forest = models.ForeignKey(Forest, on_delete=models.CASCADE)
    date = models.DateField()
    carbon_stored_tonnes = models.IntegerField()
