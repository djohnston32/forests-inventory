from rest_framework import status
from rest_framework.test import APITestCase
from forests.models import Forest, ForestHealth

import datetime


class ForestsTestCase(APITestCase):
    def setUp(self):
        test_forest_1 = Forest()
        test_forest_1.name = 'test_forest_1'
        test_forest_1.image_url = 'tf1_image'
        test_forest_1.forest_type = 'conservation'
        test_forest_1.short_description = 'tf1_short_desc'
        test_forest_1.long_description = 'tf1_long_desc'
        test_forest_1.country = 'US'
        test_forest_1.latitude = 123
        test_forest_1.longitude = 456
        test_forest_1.area_hectares = 1000
        test_forest_1.save()

        test_forest_2 = Forest()
        test_forest_2.name = 'test_forest_2'
        test_forest_2.image_url = 'tf2_image'
        test_forest_2.forest_type = 'conservation'
        test_forest_2.short_description = 'tf2_short_desc'
        test_forest_2.long_description = 'tf2_long_desc'
        test_forest_2.country = 'US'
        test_forest_2.latitude = 223
        test_forest_2.longitude = 456
        test_forest_2.area_hectares = 2000
        test_forest_2.save()

        test_health_1 = ForestHealth()
        test_health_1.forest = test_forest_1
        test_health_1.date = datetime.date(2022, 1, 1)
        test_health_1.carbon_stored_tonnes = 1000
        test_health_1.save()

        test_health_2 = ForestHealth()
        test_health_2.forest = test_forest_1
        test_health_2.date = datetime.date(2022, 1, 31)
        test_health_2.carbon_stored_tonnes = 1100
        test_health_2.save()

    def test_get_forests(self):
        response = self.client.get('/forests/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)

        test_forest = response.data[0]
        self.assertTrue('name' in test_forest)
        # Ensure we don't have fields that should only be available in /forests/{id}
        self.assertFalse('long_description' in test_forest)

    def test_get_forest(self):
        test_forest_1 = Forest.objects.get(name='test_forest_1')
        response = self.client.get('/forests/%s' % test_forest_1.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEquals(response.data['name'], 'test_forest_1')
        # Ensure we have a field that is only available through /forest/{id}
        self.assertEquals(response.data['long_description'], 'tf1_long_desc')

    def test_get_forest_health(self):
        test_forest_1 = Forest.objects.get(name='test_forest_1')
        response = self.client.get('/forests/%s/health' % test_forest_1.id)

        expected_response = {
            'forest_id': test_forest_1.id,
            'date': datetime.date(2022, 1, 31),
            'metrics': {
                'carbon_stored_tonnes': 1100,
                'thirty_day_carbon_change_tonnes': 100,
            },
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_response)
