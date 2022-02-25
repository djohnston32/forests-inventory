from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Forest as ForestModel


class Forests(APIView):
    def get(self, request, format=None):
        """
        Return a list of all forests.
        """
        forests = self._get_forests()

        return Response(forests, status=status.HTTP_200_OK)

    def _get_forests(self):
        results = []
        forests = ForestModel.objects.all()

        for forest in forests:
            results.append({
                'id': forest.id,
                'name': forest.name,
                'image_url': forest.image_url,
                'type': forest.forest_type,
                'short_description': forest.short_description,
            })
        return results


class Forest(APIView):
    def get(self, request, format=None, **kwargs):
        """
        Return full details for a single forest.
        """
        id = kwargs.get('id')
        forest = self._get_forest(id)

        return Response(forest, status=status.HTTP_200_OK)

    def _get_forest(self, id):
        try:
            forest = ForestModel.objects.get(id=id)

            return {
                'id': id,
                'name': forest.name,
                'image_url': forest.image_url,
                'type': forest.forest_type,
                'short_description': forest.short_description,
                'long_description': forest.long_description,
                'latitude': forest.latitude,
                'longitude': forest.longitude,
                'area_hectares': forest.area_hectares,
                'country': forest.country,
            }
        except:
            return {}


class ForestHealth(APIView):
    def get(self, request, format=None, **kwargs):
        """
        Return full details for a single forest.
        """
        id = kwargs.get('id')
        forest_health = self._get_health(id)

        return Response(forest_health, status=status.HTTP_200_OK)

    def _get_health(self, id):
        return {
            'forest_id': id,
            'date': 'January 1',
            'metrics': {
                'carbon_stored_tonnes': 100,
                'thirty_day_carbon_change_tonnes': 12,
            },
        }

# Create your views here.
