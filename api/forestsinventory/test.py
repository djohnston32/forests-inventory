from rest_framework import status
from rest_framework.test import APITestCase


class ForestsTestCase(APITestCase):
    def testGetForests(self):
        response = self.client.get('/forests/')

        expected_response = [
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
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response)
