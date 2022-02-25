from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Forests(APIView):
    def get(self, request, format=None):
        """
        Return a list of all forests.
        """
        forests = self._get_forests()

        return Response(forests, status=status.HTTP_200_OK)

    def _get_forests(self):
        return [
            {
                'id': 1,
                'name': 'Forest 1',
                'image_url': 'image_url_1',
                'type': 'conservation',
                'short_description': 'A really good forest.',
            },
            {
                'id': 2,
                'name': 'Forest 2',
                'image_url': 'image_url_2',
                'type': 'reforestation',
                'short_description': 'A swell forest.',
            },
            {
                'id': 3,
                'name': 'Forest 3',
                'image_url': 'image_url_3',
                'type': 'conservation',
                'short_description': 'Yet another forest.',
            },
        ]


class Forest(APIView):
    def get(self, request, format=None, **kwargs):
        """
        Return full details for a single forest.
        """
        id = kwargs.get('id')
        forest = self._get_forest(id)

        return Response(forest, status=status.HTTP_200_OK)

    def _get_forest(self, id):
        return {
            'id': id,
            'name': 'Forest 1',
            'image_url': 'image_url_1',
            'type': 'conservation',
            'short_description': 'A really good forest.',
            'location': {'latitute': 123, 'longitude': 456},
            'area_hectares': 1000,
            'country': 'Brazil',
            'long_description': 'A really good forest but with an even longer description.',
        }


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
                '30_day_carbon_change_tonnes': 12,
            },
        }
