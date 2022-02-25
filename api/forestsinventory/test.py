from rest_framework import status
from rest_framework.test import APITestCase


class ForestsTestCase(APITestCase):
    def test_get_forests(self):
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

    def test_get_forest(self):
        response = self.client.get('/forests/1')

        expected_response = {
            'id': 1,
            'name': 'Forest 1',
            'image_url': 'image_url_1',
            'type': 'conservation',
            'short_description': 'A really good forest.',
            'location': {'latitute': 123, 'longitude': 456},
            'area_hectares': 1000,
            'country': 'Brazil',
            'long_description': 'A really good forest but with an even longer description.',
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response)

    def test_get_forest_health(self):
        response = self.client.get('/forests/2/health')

        expected_response = {
            'forest_id': 2,
            'date': 'January 1',
            'metrics': {
                'carbon_stored_tonnes': 100,
                'thirty_day_carbon_change_tonnes': 12,
            },
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response)
