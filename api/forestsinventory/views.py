from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Forests(APIView):
    def get(self, request, format=None):
        """
        Return a list of all forests.
        """
        forests = self._getForests()

        return Response(forests, status=status.HTTP_200_OK)

    def _getForests(self):
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
