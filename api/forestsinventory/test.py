from rest_framework import status
from rest_framework.test import APITestCase


class ForestsTestCase(APITestCase):
    def test_get_forests(self):
        response = self.client.get('/forests/')

        expected_response = [
            {'id': 1, 'name': 'Amazon Rainforest',
             'image_url': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Amazonia.jpg',
             'type': 'conservation', 'short_description': 'A really good forest.', },
            {'id': 2, 'name': 'Olympic National Forest',
             'image_url':
             'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mount_Zion_-_west_slope%2C_Olympic_National_Forest.jpg/1920px-Mount_Zion_-_west_slope%2C_Olympic_National_Forest.jpg',
             'type': 'reforestation', 'short_description': 'A swell forest.', },
            {'id': 3, 'name': 'Valdivian Rainforest',
             'image_url':
             'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Valdivian_temperate_rainforest.JPG/1920px-Valdivian_temperate_rainforest.JPG',
             'type': 'conservation', 'short_description': 'Yet another forest.', }, ]
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
