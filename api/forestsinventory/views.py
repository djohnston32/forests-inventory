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
                'name': 'Amazon Rainforest',
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Amazonia.jpg',
                'type': 'conservation',
                'short_description': 'A really good forest.',
            },
            {
                'id': 2,
                'name': 'Olympic National Forest',
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mount_Zion_-_west_slope%2C_Olympic_National_Forest.jpg/1920px-Mount_Zion_-_west_slope%2C_Olympic_National_Forest.jpg',
                'type': 'reforestation',
                'short_description': 'A swell forest.',
            },
            {
                'id': 3,
                'name': 'Valdivian Rainforest',
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Valdivian_temperate_rainforest.JPG/1920px-Valdivian_temperate_rainforest.JPG',
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
            'name': 'Amazon Rainforest',
            'image_url': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Amazonia.jpg',
            'type': 'conservation',
            'short_description': 'A really good forest.',
            'latitude': 123,
            'longitude': 456,
            'area_hectares': 1000,
            'country': 'Brazil',
            'long_description': 'The Amazon rainforest, alternatively, the Amazon jungle or Amazonia, is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America. (credit Wikipedia)',
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
                'thirty_day_carbon_change_tonnes': 12,
            },
        }
